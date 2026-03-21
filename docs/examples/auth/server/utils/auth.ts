import { Kysely } from 'kysely'

import * as jwt from '~/server/utils/jwt'
import verifyAccess from '~/server/utils/rbac'

import type { H3Event } from 'h3'
import type { Database } from '~/types/db/Database'
import type UserPayload from '~/types/UserPayload'

export interface AuthContext {
  id: string
  email: string
  permission: string
}

/**
 * Verify the requesting user's identity from the Authorization header.
 * Adapt the database query to match your schema.
 *
 * @param event - The H3 event object
 */
export async function user(event: H3Event): Promise<AuthContext> {
  // TODO: initialize your Kysely instance with your dialect
  const db = new Kysely<Database>({ dialect: undefined as any })
  const header = getHeader(event, 'Authorization')
  const query = getQuery(event)

  if (!header) throw createError({ statusCode: 401, message: 'Unauthorized' })

  const [type, token] = header.split(' ')

  let data: UserPayload | Error

  switch (type) {
    case 'Bearer':
      data = await jwt.decrypt<UserPayload>(token)
      break
    default:
      throw createError({ statusCode: 401, message: 'Invalid token type' })
  }

  if (data instanceof Error) {
    throw createError({ statusCode: 401, message: 'Invalid token' })
  }

  const usr = await db
    .selectFrom('users')
    .innerJoin('permissions', 'users.permission_id', 'permissions.id')
    .select(['users.id', 'users.email', 'permissions.name as permission'])
    .where('email', '=', data.email)
    .where('permissions.name', '!=', 'blocked')
    .executeTakeFirst()

  if (!usr) {
    throw createError({ statusCode: 401, message: 'Invalid token' })
  }

  if (usr.permission === 'unverified') {
    throw createError({ statusCode: 401, message: 'Please verify your account' })
  }

  if (query.resource) {
    const hasAccess = await verifyAccess(
      { id: usr.id, email: usr.email, permission: usr.permission },
      query.resource as string,
      (query.resourceMethod as string | undefined) || 'GET'
    )

    if (!hasAccess) {
      throw createError({ statusCode: 403, message: 'Forbidden' })
    }
  }

  return { id: usr.id, email: usr.email, permission: usr.permission }
}

/**
 * Verify the requesting user is an admin.
 *
 * @param event - The H3 event object
 */
export async function admin(event: H3Event): Promise<AuthContext> {
  const context = await user(event)

  if (context.permission !== 'admin') {
    throw createError({ statusCode: 403, message: 'Permission denied' })
  }

  return context
}
