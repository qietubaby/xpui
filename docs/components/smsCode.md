---
title: SmsCode 短信验证码
sidebarDepth: 2
---

# SmsCode 短信验证码

使用方法

- 调用完请求发送验证码的接口后，请一定记得调用组件的回调函数
- 发送完后默认60s后可以再次点击发送，这个时间可以自定义
- 倒计时会缓存到sessionStorage，刷新浏览器会继续读秒
- 将包含：短信验证码|合同弹窗|悬浮选择器|列表排列|消息条|

<code-demos></code-demos>
