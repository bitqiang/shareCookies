/**
 * @desc
 * @Author: bitqiang<bitqiang@outlook.net>
 * @date  2019/5/30 23:02
 */


// 向background 进程请求数据
window.onload = function () {
  chrome.runtime.sendMessage({ type: 'getData' })
  
  // setInputValue('.sourceURL', [12, 456])
  // setInputValue('.sourceURL', [12, 456])
}


chrome.runtime.onMessage.addListener(data => {
  switch (data.type) {
    case 'setData':
      console.log('getData', data)
      let temp = {
        source: '.sourceURL',
        target: '.destinationURL'
      }
      Object.keys(data.value).forEach(key => {
        setsourceValue(temp[key], data.value[key])
      })
      break
  }
})

let setsourceValue = (query, value) => {
  let sourceDom = document.querySelectorAll(query)
  return [...sourceDom].forEach((item, index) => item.value = value[index])
}

let getsourceValue = query => {
  let sourceDom = document.querySelectorAll(query)
  return [...sourceDom].map(i => i.value)
}

document.getElementById('btn-save').addEventListener('click', () => {
  let source = getsourceValue('.sourceURL')
  let target = getsourceValue('.destinationURL')
  chrome.runtime.sendMessage({ type: 'update', value: { source, target } })
})


// document.getElementById('add-source').addEventListener('click', () => {
//   console.log('添加')
// })
//
//


