
module.exports = {
  mode: 'universal',
  server: {
    port: 3003
  },
  router: {
    middleware: 'auth'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/request'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/pwa',
    '@nuxtjs/eslint-module'
  ],
  proxy: [
    [
      '/capricom', {
        // target: 'http://localhost:9000',
        target: 'https://fancy-test.4009515151.com/',
        changeOrigin: true,
        pathRewrite: { '^/capricom': '/' }
      }
    ]
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
    // sass
    // extend(config, { isDev, isClient }) {
    //   const vueLoader = config.module.rules.find((rule) => rule.loader === 'vue-loader');
    //   vueLoader.options.loaders.sass = 'vue-style-loader!css-loader!sass-loader';
    // },
    // // post-css
    // postcss: [
    //   require('postcss-nested')(),
    //   require('postcss-responsive-type')(),
    //   require('postcss-hexrgba')()
    // ]
  }
}
