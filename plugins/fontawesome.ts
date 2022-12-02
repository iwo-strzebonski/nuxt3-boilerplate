import { library, config } from '@fortawesome/fontawesome-svg-core'
import { faSquareFacebook, faSquareTwitter, faMedium, faDiscord } from '@fortawesome/free-brands-svg-icons'
import { faSun } from '@fortawesome/free-regular-svg-icons'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
// eslint-disable-next-line import/named
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// This is important, we are going to let Nuxt.js worry about the CSS
config.autoAddCss = false

library.add(faSquareFacebook, faSquareTwitter, faMedium, faDiscord, faSun, faMoon)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('fa-icon', FontAwesomeIcon)
})
