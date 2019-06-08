/**
 * @desc
 * @Author: bitqiang<bitqiang@outlook.net>
 * @date  2019/6/7 7:48
 */
const path = require('path')
const resolveFile = pathName => path.join(__dirname, pathName)
module.exports = {
  outputDir: resolveFile('./shareCookie/dist'),
  assetsDir: '.',
  publicPath: './',
  configureWebpack: {
    resolve: {
      alias: {
        components: resolveFile('src/components'),
        views: resolveFile('src/views'),
      },
    },
  },
  
  devServer: {
    proxy: 'http://localhost:4000',
    writeToDisk: file => {
      return true
    }
  }
}

