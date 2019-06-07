/**
 * @desc
 * @Author: bitqiang<bitqiang@outlook.net>
 * @date  2019/5/30 23:10
 */


// 设置cookie
let setCookies = (source = [], target = []) => {
  // console.log('source %o, target%o', source, target)
  let sourceCookies = []
  source.forEach(url => {
    chrome.cookies.getAll({ url }, function (cookie) {
      sourceCookies.push(...cookie)
      
      // 循环赋值
      target.forEach(url => {
        sourceCookies.forEach((c, index) => {
          chrome.cookies.set(Object.assign({ value: c.value, name: c.name }, {
            url
          }), (res) => {
            // console.log('res', res)
          })
        })
      })
    });
  })
}

chrome.cookies.onChanged.addListener(({ removed, cookie }) => {
  if (removed) {
    return
  }
  
  chrome.storage.sync.get(null, data => {
    let value = {
      source: [],
      target: []
    }
    try {
      value = JSON.parse(data.value)
      let sourceString = value.source.join(',')
      if (sourceString && sourceString.includes(cookie.domain)) {
        setCookies(value.source, value.target)
      } else {
      }
    } catch (e) {
      console.log('e', e)
    }
  })
  
  
})

chrome.runtime.onMessage.addListener(data => {
  switch (data.type) {
    case 'update':
      update(data.value)
      break
    case 'getData':
      getData()
  }
})

let getData = () => {
  chrome.storage.sync.get(null, data => {
    let value = {
      input: [],
      output: []
    }
    try {
      value = JSON.parse(data.value)
    } catch (e) {
      console.log('e', e)
    } finally {
      // console.log('返回小窗口的数据', value)
      chrome.runtime.sendMessage({ type: 'setData', value })
    }
  })
}


let update = value => {
  setCookies(value.input, value.output)
  chrome.storage.sync.set({ key: 'data', value: JSON.stringify(value) }, res => {
    // console.log('res', value)
  })
}
