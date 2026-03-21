import * as jwt from '~/server/utils/jwt'
import hash from '~/server/utils/hash'

import type UserPayload from '~/types/UserPayload'

export interface ILoginRequestBody {
  email: string
  password: string
}

export interface ILoginResponseBody {
  accessToken: string
  tokenType: string
}

/**
 * POST /v1/auth/login
 *
 * Authenticates a user by email/password, returns a Bearer token.
 * Reuses an existing valid token if available, otherwise creates a new one.
 *
 * Adapt the database queries to your schema.
 */
export default defineEventHandler(async (event): Promise<ILoginResponseBody> => {
  // TODO: initialize your Kysely instance
  // const db = new Kysely<Database>({ dialect: yourDialect })

  const { email, password } = await readBody<ILoginRequestBody>(event)

  if (!email || !password) {
    throw createError({ statusCode: 400, message: 'Email and password are required' })
  }

  // Example: verify user credentials
  // const user = await db
  //   .selectFrom('users')
  //   .innerJoin('permissions', 'users.permission_id', 'permissions.id')
  //   .select(['users.id', 'users.email', 'permissions.name as permission'])
  //   .where('email', '=', email)
  //   .where('password', '=', await hash(password))
  //   .where('permissions.name', '!=', 'blocked')
  //   .executeTakeFirst()

  // if (!user) {
  //   throw createError({ statusCode: 401, message: 'Invalid email or password' })
  // }

  // Example: check for existing valid token
  // const lastToken = await db
  //   .selectFrom('access_tokens')
  //   .select('token')
  //   .where('user_id', '=', user.id)
  //   .where('expires_at', '>', new Date())
  //   .orderBy('expires_at', 'desc')
  //   .executeTakeFirst()

  // if (lastToken) {
  //   const data = await jwt.decrypt<UserPayload>(lastToken.token)
  //   if (!(data instanceof Error)) {
  //     return { accessToken: lastToken.token, tokenType: 'Bearer' }
  //   }
  // }

  // Example: create new token
  // const token = await jwt.encrypt<UserPayload>({ email })
  // await db.insertInto('access_tokens').values({
  //   token,
  //   user_id: user.id,
  //   expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  // }).execute()

  // return { accessToken: token, tokenType: 'Bearer' }

  throw createError({ statusCode: 501, message: 'Not implemented — see docs/examples/auth/README.md' })
})
