### cookies使用说明

#### 功能
1. 支持自动从特定网页同步cookie
2. 支持关闭自动同步cookie，改为手动同步(建议手动同步cookie，使用页面上的同步cookie按钮，
由于cookies变化是频繁的，其他网页变化也导致后台自动执行同步，而大多数情况下是无益的，有可能会影响性能)
3. 支持同步多组cookie，分组互不影响

#### 使用说明
![](./img/2.png)
1. 点击`添加`可以给cookies添加分组
2. 点击分组卡片可以展开下面配置功能
3. 表单中第一个input移动上去可以显示添加icon，其余则为删除


#### 例子

![](./img/one.png)
![](./img/qq.png)
> 以上会将Domain中为.qq.com的cookie复制至localhose:8080，而不会复制`.www.qq.com``.captcha.qq.com`之类的cookie
