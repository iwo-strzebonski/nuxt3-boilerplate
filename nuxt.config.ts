import tailwindcss from '@tailwindcss/vite'
import { APP_TITLE, APP_TITLE_SHORT, APP_URL } from './settings/constants'

// https://nuxt.com/docs/api/configuration/nuxt-config
const properties = [
  {
    hid: 'og:locale',
    property: 'og:locale',
    content: 'pl_PL'
  },
  {
    hid: 'og:type',
    property: 'og:type',
    content: 'website'
  },
  {
    hid: 'og:title',
    property: 'og:title',
    content: APP_TITLE_SHORT
  },
  {
    hid: 'og:description',
    property: 'og:description',
    content: ''
  },
  {
    hid: 'og:url',
    property: 'og:url',
    content: APP_URL
  },
  {
    hid: 'og:site_name',
    property: 'og:site_name',
    content: APP_TITLE
  },
  {
    hid: 'og:image',
    property: 'og:image',
    content: `${APP_URL}/icon.png`
  }
]

const twitterProperties = [
  {
    hid: 'twitter:card',
    name: 'twitter:card',
    content: `${APP_URL}/icon.png`
  },
  {
    hid: 'twitter:title',
    name: 'twitter:title',
    content: APP_TITLE
  },
  {
    hid: 'twitter:description',
    name: 'twitter:description',
    content: ''
  },
  {
    hid: 'twitter:image',
    name: 'twitter:image',
    content: `${APP_URL}/icon.png`
  },
  {
    hid: 'twitter:site',
    name: 'twitter:site',
    content: APP_URL
  },
  {
    hid: 'twitter:creator',
    name: 'twitter:creator',
    content: ''
  }
]

const icons = [
  {
    rel: 'icon',
    type: 'image/x-icon',
    href: '/favicon.ico'
  },
  {
    rel: 'icon',
    type: 'image/png',
    href: '/icons/favicon-16x16.png',
    sizes: '16x16'
  },
  {
    rel: 'icon',
    type: 'image/png',
    href: '/icons/favicon-32x32.png',
    sizes: '32x32'
  },
  {
    rel: 'icon',
    type: 'image/png',
    href: '/icons/android-chrome-192x192.png',
    sizes: '192x192'
  },
  {
    rel: 'icon',
    type: 'image/png',
    href: '/icons/android-chrome-384x384.png',
    sizes: '384x384'
  },
  {
    rel: 'apple-touch-icon',
    type: 'image/png',
    href: '/icons/apple-touch-icon.png',
    sizes: '180x180'
  },
  {
    rel: 'mask-icon',
    href: '/icons/safari-pinned-tab.svg',
    color: '#5bbad5'
  }
]

const manifest = {
  name: APP_TITLE,
  short_name: APP_TITLE_SHORT,
  theme_color: '#ffffff',
  icons: icons.map((icon) => ({
    ...icon,
    src: icon.href
  }))
}

export default defineNuxtConfig({
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    },
    layoutTransition: {
      name: 'slide',
      mode: 'out-in'
    },
    head: {
      title: APP_TITLE,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        {
          hid: 'description',
          name: 'description',
          content: ''
        },
        {
          name: 'msapplication-TileImage',
          content: '/icons/mstile-150x150.png'
        },
        ...properties,
        ...twitterProperties
      ],
      link: [...icons],
      htmlAttrs: {
        lang: 'pl'
      }
    }
  },

  routeRules: {
    '/v1/**': {
      cors: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Expose-Headers': '*'
      }
    }
  },

  css: [
    '@/assets/css/main.css',
    '@/assets/css/tailwind.css',
    '@/assets/css/flowbite.css',
    '@/assets/css/content.css',
    '@/assets/css/admin.css',
    '@/assets/css/markdown.css',
    'vue3-treeview/dist/style.css',
    '@/assets/css/treeview.css'
  ],

  components: true,

  colorMode: {
    preference: 'dark',
    fallback: 'dark'
  },

  pwa: {
    devOptions: { enabled: true },
    registerType: 'autoUpdate',
    manifest
  },

  modules: [
    '@nuxt/eslint',
    '@nuxtjs/robots',
    'nuxt-content-assets',
    '@nuxt/content',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxt/image',
    '@vite-pwa/nuxt'
  ],

  vite: {
    plugins: [tailwindcss()]
  },

  build: {
    transpile: [
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/free-regular-svg-icons',
      '@fortawesome/free-brands-svg-icons'
    ]
  },

  runtimeConfig: {
    public: {
      APP_URL,
      APP_TITLE,
      APP_TITLE_SHORT
    }
  },

  devtools: {
    enabled: true
  },

  compatibilityDate: '2026-03-21'
})
