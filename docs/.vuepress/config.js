module.exports = {
  title: 'UED分享',
  description: '一个用来学习的UI框架',
  themeConfig: {
    sidebar: [
      ['/install/', '安装'],
      {
        title: '业务组件',
        collapsable: false,
        children: ['/components/smsCode', '/components/contract'],
      },
      {
        title: '组件',
        collapsable: false,
        children: [
          '/components/icon',
          '/components/button',
          '/components/popover',
          '/components/slide',
          '/components/toast',
        ],
      },
    ],
  },
}
