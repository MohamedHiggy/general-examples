export default {
  ssr: false,
  head: {
    title: 'general-examples',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: ["~/assets/scss/main.scss"],

  plugins: [
    "~/plugins/v-calendar.js"
  ],

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  buildModules: [
    '@nuxtjs/tailwindcss',
  ],

  modules: [
    '@nuxtjs/axios',
  ],

  axios: {
    baseURL: '/',
  },

  build: {
  },

  router: {
    prefetchLinks: false,
  },
}
