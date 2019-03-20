// vue.config.js
const path = require('path')

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        includePaths: [path.resolve(__dirname,'node_modules')],
      },
    },
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'development') {
      config
        .output
        .filename('[name].[hash].js') 
        .end() 
    }  
  },
  devServer: {
    proxy: 'http://localhost:3000'
  }
}