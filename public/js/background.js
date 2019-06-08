/**
 * @desc
 * @Author: bitqiang<bitqiang@outlook.net>
 * @date  2019/5/30 23:10
 */


chrome.cookies.getAll({ url: 'http://www.baidu.com' }, function (cookie) {
  console.log('www.baidu.com', cookie)
});

chrome.cookies.getAll({ url: 'http://www.baidu.com' }, function (cookie) {
  console.log('baidu.com', cookie)
});


// 全局变量存储配置
let userCookiesConfig


// 设置cookie
let setCookies = (source = [], target = []) => {
  console.log('source %o, target%o', source, target)
  source = source.filter(i => !!i)
  target = target.filter(i => !!i)
  let sourceCookies = []
  source.forEach(url => {
    let sourceUrl = `http://${url}`
    chrome.cookies.getAll({ sourceUrl }, function (cookie) {
      console.log('当前输入url %o，查出的cookie是 %o', sourceUrl, cookie)
      sourceCookies.push(...cookie)
      
      // 循环赋值
      target.forEach(url => {
        let targetUrl = `http://${url}`
        
        sourceCookies.forEach((c, index) => {
          chrome.cookies.set(Object.assign({ value: c.value, name: c.name }, {
            targetUrl
          }), (res) => {
            // console.log('res', res)
          })
        })
      })
    });
  })
}

chrome.cookies.onChanged.addListener(({ removed, cookie }) => {
  
  //  是否为删除cookie出发，删除cookie的时候不需要执行以下
  if (removed) {
    return
  }
  
  if (!userCookiesConfig) {
    console.time('读取cookies配置')
    chrome.storage.sync.get(null, data => {
      userCookiesConfig = JSON.parse(data.cookies)
      console.timeEnd('读取cookies配置')
    });
  }
  
  let enableUserCookiesConfig = userCookiesConfig.filter(i => i.status)
  enableUserCookiesConfig.forEach(item => {
    let sourceString = item.source.join(',')
    let targetString = item.target.join(',')
    // console.log('sourceString', sourceString)
    // console.log('cookie.domain', cookie.domain)
    if (sourceString && targetString && sourceString.includes(cookie.domain)) {
      setCookies(item.source, item.target)
    }
  })
})

