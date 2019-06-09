/**
 * @desc
 * @Author: bitqiang<bitqiang@outlook.net>
 * @date  2019/6/9 20:24
 */

// 通信
chrome.runtime.onMessage.addListener(data => {
  switch (data.type) {
    case 'update':
      cookies.updateData(data.value)
      cors.updateData(data.value)
      break
    case '1':
  }
})
