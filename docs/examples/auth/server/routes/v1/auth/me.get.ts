import * as auth from '~/server/utils/auth'

import type { AuthContext } from '~/server/utils/auth'

/**
 * GET /v1/auth/me
 *
 * Returns the authenticated user's context (id, email, permission).
 */
export default defineEventHandler(async (event) => {
  const context = await auth.user(event)

  return {
    statusCode: 200,
    results: context as AuthContext
  }
})
