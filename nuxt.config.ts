import { resolve } from 'path'

import { APP_TITLE } from './settings/constants'

// https://nuxt.com/docs/api/configuration/nuxt-config
const properties = [
  {
    hid: 'og:locale',
    property: 'og:locale',
    content: ''
  },
  {
    hid: 'og:type',
    property: 'og:type',
    content: ''
  },
  {
    hid: 'og:title',
    property: 'og:title',
    content: ''
  },
  {
    hid: 'og:description',
    property: 'og:description',
    content: ''
  },
  {
    hid: 'og:url',
    property: 'og:url',
    content: ''
  },
  {
    hid: 'og:site_name',
    property: 'og:site_name',
    content: ''
  },
  {
    hid: 'og:image',
    property: 'og:image',
    content: ''
  }
]

const twitterProperties = [
  {
    hid: 'twitter:card',
    name: 'twitter:card',
    content: ''
  },
  {
    hid: 'twitter:description',
    name: 'twitter:description',
    content: ''
  },
  {
    hid: 'twitter:title',
    name: 'twitter:title',
    content: ''
  },
  {
    hid: 'twitter:image',
    name: 'twitter:image',
    content: ''
  },
  {
    hid: 'twitter:site',
    name: 'twitter:site',
    content: ''
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
    type: 'image/png',
    href: '',
    sizes: '32x32'
  },
  {
    rel: 'icon',
    type: 'image/png',
    href: '',
    sizes: '192x192'
  },
  {
    rel: 'apple-touch-icon',
    type: 'image/png',
    href: '',
    sizes: '192x192'
  }
]

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
          content: ''
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

  nitro: {
    prerender: {
      routes: ['/sitemap.xml']
    }
  },

  css: [
    '@/assets/css/content.css',
    '@/assets/css/flowbite.css',
    '@/assets/css/tailwind.css',
    '@/assets/css/main.css',
    '@/assets/css/markdown.css',
    '@/assets/css/treeview.css',
    'vue3-treeview/dist/style.css'
  ],

  components: true,

  colorMode: {
    preference: 'dark',
    fallback: 'dark'
  },

  content: {
    documentDriven: true,
    ignores: ['README.md', 'LICENSE.md', 'CHANGELOG.md', 'CONTRIBUTING.md', 'CODE_OF_CONDUCT.md', 'SECURITY.md']
  },

  pwa: {
    devOptions: { enabled: true },
    registerType: 'autoUpdate',
    manifest: {
      name: 'D',
      short_name: 'D',
      theme_color: '#ffffff',
      icons: icons.map((icon) => ({
        ...icon,
        src: icon.href
      }))
    }
  },

  modules: [
    '@nuxt/content',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxt/image',
    '@vite-pwa/nuxt',
    '@nuxtjs/tailwindcss'
  ],

  build: {
    transpile: [
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/free-regular-svg-icons',
      '@fortawesome/free-brands-svg-icons'
    ]
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  runtimeConfig: {
    secretKey: process.env.SECRET_KEY
  }
})
