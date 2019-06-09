/**
 * @desc
 * @Author: bitqiang<bitqiang@outlook.net>
 * @date  2019/6/9 22:19
 */


module.exports = {
  title: '前端开发工具',
  description: '前端开发使用的cookies共享以及跨域插件',
  base: '.',
  configureWebpack: {
    resolve: {
      alias: {
        '@alias': './assets/'
      }
    }
  },
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'cors', link: '/cors/' },
      { text: 'cookies', link: '/cookies/' },
      { text: 'Github', link: 'https://github.com/bitqiang' },
    ]
  }
}
