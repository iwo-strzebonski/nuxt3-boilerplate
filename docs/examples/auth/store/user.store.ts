import { defineStore } from 'pinia'

/**
 * User authentication store.
 * Persists the access token across page reloads using pinia-plugin-persistedstate.
 *
 * Copy this to store/user.store.ts and adapt the API paths to your project.
 */
export const useUserStore = defineStore({
  id: 'user-store',
  persist: true,
  state: () => ({
    accessToken: '',
    tokenType: ''
  }),
  actions: {
    async logout() {
      const { error } = await useFetch<{ message: string }>('/v1/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${this.tokenType} ${this.accessToken}`
        }
      })

      this.accessToken = ''
      this.tokenType = ''

      if (error.value?.statusCode === 401) {
        return navigateTo('/login')
      }

      return navigateTo('/login')
    },
    async login(email: string, password: string) {
      const { data, error } = await useFetch<{ accessToken: string; tokenType: string }>('/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: { email, password }
      })

      if (error.value) throw error

      if (!data.value) throw new Error('No response data')

      this.accessToken = data.value.accessToken
      this.tokenType = data.value.tokenType
    }
  }
})
