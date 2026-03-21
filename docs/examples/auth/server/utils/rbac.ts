import { Kysely } from 'kysely'

import type { AuthContext } from '~/server/utils/auth'
import type { Database } from '~/types/db/Database'

/**
 * Verify if the user has access to a given resource path.
 * Admin users are granted full access. Other users are checked
 * against an access_control table with regex path matching.
 *
 * @param context - The authenticated user context
 * @param route - The resource route path to check
 * @param method - The HTTP method (GET, POST, etc.)
 */
export default async function verifyAccess(
  context: AuthContext,
  route: string,
  method: string
): Promise<boolean> {
  try {
    if (context.permission === 'admin') {
      return true
    }

    // TODO: initialize your Kysely instance with your dialect
    const db = new Kysely<Database>({ dialect: undefined as any })

    const accessControl = await db
      .selectFrom('access_control')
      .select(['method', 'path'])
      .where('user_id', '=', context.id)
      .execute()

    for (const ac of accessControl) {
      const regex = new RegExp(ac.path)

      if (ac.method === method && regex.test(route)) {
        return true
      }
    }

    return false
  } catch (err) {
    return false
  }
}
