import * as auth from '~/server/utils/auth'

import type { AuthContext } from '~/server/utils/auth'

/**
 * POST /v1/auth/logout
 *
 * Invalidates the current access token by setting its expiration to now.
 *
 * Adapt the database queries to your schema.
 */
export default defineEventHandler(async (event) => {
  // TODO: initialize your Kysely instance
  // const db = new Kysely<Database>({ dialect: yourDialect })

  const header = getHeader(event, 'Authorization')

  if (!header) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }

  const token = header.split(' ')[1]
  const context = await auth.user(event)
  const { id: userId } = context as AuthContext

  // Example: invalidate the token
  // await db
  //   .updateTable('access_tokens')
  //   .set({ expires_at: new Date() })
  //   .where('user_id', '=', userId)
  //   .where('token', '=', token)
  //   .execute()

  return {
    statusCode: 200,
    body: { message: 'Logged out' }
  }
})
