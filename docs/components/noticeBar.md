---
title: NoticeBar 消息通知
sidebarDepth: 2
---

# NoticeBar 消息通知

### 使用方法

- 此业务组件是根据slide基础组件构成
- 传入需要展示的消息列表就可以展示，消息的具体类型详见noticeItem


### 案例
<noticeBar-demos></noticeBar-demos>

### Props

参数	| 说明	| 类型	| 可选值	| 默认值
:--- | :---| :--- | :--- | :---
noticeList	| 消息列表  | `noticeItem[]`	| -	| -

### Events

名称	| 说明	| 回调参数
:--- | :---| :---
viewClick	| 查看消息回调（非直接跳转：`isLink:false` 时）  | `noticeItem`

### noticeItem数据结构

```js
const noticeItem = {
  // 消息标识（必传）
  id: String,
  // 消息内容（必传）
  message: String,
  // 是否为链接跳转方式（可选）
  isLink: Boolean,
  // 跳转链接，isLink为true时必传
  href: String,
  // 是否新页面跳转，isLink为true时必传
  openNew: Boolean,
  // 消息类型（可选），可选值：info/backlog/urgent, 默认值 info
  type: String,
  // 处理按钮文案（可选），默认值：查看详情
  handleText: String
}
```
