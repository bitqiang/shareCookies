/**
 * @desc
 * @Author: bitqiang<bitqiang@outlook.net>
 * @date  2019/6/7 7:48
 */
const path = require('path')
module.exports = {
  outputDir: path.join(__dirname, './shareCookie/dist'),
  assetsDir: '.',
  publicPath: './',
  devServer: {
    proxy: 'http://localhost:4000',
    writeToDisk: file => {
      return true
    }
  }
}
