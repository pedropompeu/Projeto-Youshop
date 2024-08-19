const path = require('path');

module.exports = {
  devServer: {
    port: 3000,
    proxy: {
      ':offer_code': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/offer_code': '',
        },
      },
    },
  },

  transpileDependencies: [
    'vuetify',
  ],

  pluginOptions: {
    vuetify: {
    },
  },

  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  },
};
