// vue.config.js
const path = require('path')

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        webpackImporter: false,
        sassOptions: {
          includePaths: [path.resolve(__dirname, 'node_modules')]
        }
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'node_module_overrides/')
      }
    }
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'development') {
      config
        .output
        .filename('[name].[hash].js')
        .end()
    }
  },
  publicPath: '/client/',
  devServer: {
    proxy: 'http://localhost:3000'
  }
}
