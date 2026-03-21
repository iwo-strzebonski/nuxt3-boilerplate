import { useUserStore } from '~/store/user.store'

/**
 * Route middleware that redirects already-authenticated users away from
 * public pages like login/register.
 *
 * Usage in a page:
 *   definePageMeta({ middleware: 'no-auth' })
 */
export default defineNuxtRouteMiddleware(async (to) => {
  const userStore = useUserStore()

  if (userStore.tokenType && userStore.accessToken) {
    try {
      await useFetch('/v1/auth/me', {
        headers: {
          Authorization: `${userStore.tokenType} ${userStore.accessToken}`
        }
      })

      return navigateTo((to.query.redirect as string | undefined) || '/')
    } catch (error) {
      userStore.logout()
    }
  }
})
