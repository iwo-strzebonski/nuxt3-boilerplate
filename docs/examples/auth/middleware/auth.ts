import { useUserStore } from '~/store/user.store'

import type { RouteLocationNormalized } from '#vue-router'

/**
 * Route middleware that protects authenticated routes.
 * Redirects to the login page if the user is not authenticated.
 *
 * Usage in a page:
 *   definePageMeta({ middleware: 'auth' })
 */
export default defineNuxtRouteMiddleware(async (to) => {
  const userStore = useUserStore()

  if (!(userStore.tokenType && userStore.accessToken)) {
    return navigateTo({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }

  try {
    await useFetch('/v1/auth/me', {
      headers: {
        Authorization: `${userStore.tokenType} ${userStore.accessToken}`
      }
    })
  } catch (error) {
    userStore.logout()

    return navigateTo({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }
})
