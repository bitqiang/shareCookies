/**
 * @desc
 * @Author: bitqiang<bitqiang@outlook.net>
 * @date  2019/6/7 16:56
 */

// @ts-ignore
chrome.storage.onChanged.addListener(function(changes: any, namespace: any) {
    for (const key in changes) {
        const storageChange = changes[key];
        console.log('存储键“%s”（位于“%s”命名空间中）已更改。' +
            '原来的值为“%s”，新的值为“%s”。',
            key,
            namespace,
            storageChange.oldValue,
            storageChange.newValue);
    }
});
