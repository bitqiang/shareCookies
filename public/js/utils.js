/**
 * @desc
 * @Author: bitqiang<bitqiang@outlook.net>
 * @date  2019/6/9 19:06
 */



// 根据key获取 storage数据
const getStorageData = key => {
  return new Promise(resolve => {
    console.time(`读取${key}耗时`)
    chrome.storage.sync.get(null, data => {
      console.timeEnd(`读取${key}耗时`)
      console.log(`读取${key}配置,值为 %o`, data[key])
      resolve(JSON.parse(data[key]))
    });
  })
}



