/**
 * @desc
 * @Author: bitqiang<bitqiang@outlook.net>
 * @date  2019/5/30 23:10
 */


// 全局变量存储配置
let userCookiesConfig
let userCorsConfig

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


// 监听cookies的变化
chrome.cookies.onChanged.addListener(async ({ removed, cookie }) => {
  
  //  是否为删除cookie出发，删除cookie的时候不需要执行以下
  if (removed) {
    return
  }
  
  if (!userCookiesConfig) {
    userCookiesConfig = await getStorageData('cookies')
  }
  
  let enableUserCookiesConfig = userCookiesConfig.filter(i => i.status)
  enableUserCookiesConfig.forEach(item => {
    let sourceString = item.source.join(',')
    let targetString = item.target.join(',')
    if (sourceString && targetString && sourceString.includes(cookie.domain)) {
      setCookies(item.source, item.target)
    }
  })
})


// 根据key获取 storage数据
const getStorageData = key => {
  return new Promise(resolve => {
    console.time(`读取${key}配置`)
    chrome.storage.sync.get(null, data => {
      console.timeEnd(`读取${key}配置`)
      resolve(JSON.parse(data[key]))
    });
  })
}

// 通信
chrome.runtime.onMessage.addListener(data => {
  switch (data.type) {
    case 'update':
      userCookiesConfig = data.value.cookiesArray
      userCorsConfig = data.value.form
      onHeadersReceivedHandler()
      break
    case '1':
  }
})


const init = async () => {
  // 获取配置信息
  userCorsConfig = await getStorageData('cors')
  userCookiesConfig = getStorageData('cookies')
  onHeadersReceivedHandler()
}

init()

let onHeadersReceivedHandler = () => {
  let urls = userCorsConfig.filter(i => !!i).map(domin => `*://${domin}/*`)
  console.table({ urls })
  let listener = chrome.webRequest.onHeadersReceived.addListener(receivedListener, {
      urls
    },
    ["blocking", "responseHeaders"]
  );
  console.log('listener', listener)
}

// 跨域设置请求头
function receivedListener (details) {
  var flag = false,
    rule = {
      "name": "Access-Control-Allow-Origin",
      "value": "*"
    };
  for (var i = 0; i < details.responseHeaders.length; ++i) {
    if (details.responseHeaders[i].name.toLowerCase() === rule.name.toLowerCase()) {
      flag = true;
      details.responseHeaders[i].value = rule.value;
      break;
    }
  }
  if (!flag) {
    details.responseHeaders.push(rule);
  }
  // console.log(details.responseHeaders)
  return { responseHeaders: details.responseHeaders };
}

