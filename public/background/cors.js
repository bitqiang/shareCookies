/**
 * @desc
 * @Author: bitqiang<bitqiang@outlook.net>
 * @date  2019/6/9 19:07
 */

const cors = (function () {
  // 全局变量存储配置
  let userCorsConfig
  
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
  
  const init = async () => {
    // 获取配置信息
    userCorsConfig = await getStorageData('cors')
    onHeadersReceivedHandler()
  }
  
  const updateData = value => {
    userCorsConfig = value.form
    onHeadersReceivedHandler()
  }
  
  return {
    init,
    updateData,
    onHeadersReceivedHandler
  }
})()

cors.init()


