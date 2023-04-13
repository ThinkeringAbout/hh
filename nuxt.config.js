export default {
  server: {
    port: 8000, 
    host: '0.0.0.0' 
  },
  publicRuntimeConfig: {
    baseUrl: process.env.BASE_URL,
    userToken: process.env.USER_TOKEN,
    apiToken: process.env.API_TOKEN
  },
  css: [
    'sass',
    '@/assets/styles/v-tooltip.scss'
  ],
  plugins: ['~/plugins/vue-tooltip.js'],
  modules: [
    'nuxt-vue-select',
    '@nuxtjs/axios'
  ],
  build: {
    postcss: false,
    extend (config, ctx) {
      config.node = {
          fs: "empty"
      };
    },
    loaders: {
      sass: {
        implementation: require('sass'),
      },
      scss: {
        implementation: require('sass'),
      },
    },
  }
}