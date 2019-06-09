/**
 * @desc
 * @Author: bitqiang<bitqiang@outlook.net>
 * @date  2019/6/9 19:03
 */


const cookies = (function () {
  // 全局变量存储配置
  let userCookiesConfig   //cookie配置
  let cookiesTimer = null   //定时器
  let listenerCookies = false //是否监听cookie的变化，可能有性能问题，默认关闭
  
  // 设置cookie
  let setCookies = (source = [], target = []) => {
    console.log('source %o, target%o', source, target)
    source = source.filter(i => !!i)
    target = target.filter(i => !!i)
    let sourceCookies = []
    source.forEach(url => {
      let sourceUrl = `http://${url}`
      chrome.cookies.getAll({ url: sourceUrl }, function (cookie) {
        // console.log('当前输入url %o，查出的cookie是 %o', sourceUrl, cookie)
        sourceCookies.push(...cookie)
        
        // 循环赋值
        target.forEach(url => {
          let targetUrl = `http://${url}`
          
          sourceCookies.forEach((c, index) => {
            chrome.cookies.set(Object.assign({ value: c.value, name: c.name }, {
              url: targetUrl
            }), (res) => {
              // console.log('res', res)
            })
          })
        })
      });
    })
  }


// 监听cookies的变化
  chrome.cookies.onChanged.addListener(async ({ removed, cookie }) => {
    
    //  是否为删除cookie出发，删除cookie的时候不需要执行以下
    if (removed) {
      return
    }
    
    // 是否监听cookie变化
    if (!listenerCookies) {
      return
    }
    
    
    clearTimeout(cookiesTimer)
    cookiesTimer = setTimeout(() => {
      syncCookie()
    }, 5 * 1000)
  })
  
  
  const syncCookie = async () => {
    if (!userCookiesConfig) {
      userCookiesConfig = await getStorageData('cookies')
    }
    
    let enableUserCookiesConfig = userCookiesConfig.filter(i => i.status)
    enableUserCookiesConfig.forEach(item => {
      let sourceString = item.source.join(',')
      let targetString = item.target.join(',')
      if (sourceString && targetString) {
        setCookies(item.source, item.target)
      }
    })
  }

// 通信
  chrome.runtime.onMessage.addListener(data => {
    switch (data.type) {
      case 'update':
        userCookiesConfig = data.value.cookiesArray
        break
      case '1':
    }
  })
  
  const init = async () => {
    // 获取配置信息
    userCookiesConfig = await getStorageData('cookies')
    listenerCookies = await getStorageData('listenerCookies')
  }
  
  const updateData = value => {
    userCookiesConfig = value.cookiesArray
  }
  
  const updateIsSyncCookies = value => {
    listenerCookies = value
  }
  return {
    init,
    updateIsSyncCookies,
    updateData,
    syncCookie
  }
})()

cookies.init()
