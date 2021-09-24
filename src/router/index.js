import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'

//按钮组件展示
import ButtonDemo from '../views/ButtonDemo.vue'

//popover
import PopoverDemo from '../views/PopoverDemo.vue'

//icon
import IconDemo from '../views/IconDemo.vue'

//input
import InputDemo from '../views/InputDemo.vue'

// Tab
import TabDemo from '../views/TabDemo.vue'

// 折叠面板
import CollapseDemo from '../views/collapseDemo.vue'
// 级联选择器
import CascaderDemo from '../views/CascaderDemo.vue'
import CascaderAjaxDemo from '../views/CascaderAjaxDemo.vue'
// Table组件
import TableDemo from '../views/TableDemo.vue'

// 滚动组件
import ScrollDemo from '../views/ScrollDemo.vue'

// 时间选择组件
import DatePickerDemo from '../views/datePickerDemo.vue'

// Toast
import ToastDemo from '../views/ToastDemo.vue'

// Upload
import UploadDemo from '../views/uploaderTest.vue'

import StickyDemo from '../views/sticky.vue'

import PagerDemo from '../views/pagerdemo.vue'

import UserCenter from '../views/UserCenter.vue'

import SlideDemo from '../views/SlideDemo.vue'

// 业务组件
import SmsCodeDemo from '../views/SmsCodeDemo.vue'
import ContractDemo from '../views/ContractDemo.vue'
import stickyBarDemo from '../views/stickyBarDemo.vue'
// import navdemo from './views/navdemo.vue'
// import griddemo from './views/griddemo.vue'
//  import uploaderTest from './views/uploaderTest.vue'
//  import Sticky from './views/sticky.vue'

//import dateDemo from './views/datePickerDemo.vue'
Vue.use(Router)

// message的二级导航
export var messageChild = [
  {
    path: 'pinglun',
    name: 'Pinglun',
    title: '评论',
    component: StickyDemo,
  },
]

export default new Router({
  linkExactActiveClass: 'current',
  mode: 'hash',
  base: process.env.BASE_URL,

  routes: [
    {
      path: '/',
      name: 'demo',
      component: Home,
      meta: { isLogin: true },
      children: [...messageChild],
    },
    {
      path: '/button',
      name: 'Buttondemo',
      component: ButtonDemo,
    },
    {
      path: '/popover',
      name: 'Popoverdemo',
      component: PopoverDemo,
    },
    {
      path: '/icon',
      name: 'IconDemo',
      component: IconDemo,
    },
    {
      path: '/input',
      name: 'InputDemo',
      component: InputDemo,
    },
    {
      path: '/tab',
      name: 'TabDemo',
      component: TabDemo,
    },
    {
      path: '/collapse',
      name: 'CollapseDemo',
      component: CollapseDemo,
    },
    {
      path: '/cascader',
      name: 'CascaderDemo',
      component: CascaderDemo,
    },
    {
      path: '/ajaxcascader',
      name: 'CascaderAjaxDemo',
      component: CascaderAjaxDemo,
    },
    {
      path: '/table',
      name: 'TableDemo',
      component: TableDemo,
    },
    {
      path: '/scroll',
      name: 'ScrollDemo',
      component: ScrollDemo,
    },
    {
      path: '/datePicker',
      name: 'DatePickerDemo',
      component: DatePickerDemo,
    },
    {
      path: '/toast',
      name: 'ToastDemo',
      component: ToastDemo,
    },
    {
      path: '/upload',
      name: 'UploadDemo',
      component: UploadDemo,
    },
    {
      path: '/sticky',
      name: 'StickyDemo',
      component: StickyDemo,
    },
    {
      path: '/pager',
      name: 'pagerDemo',
      component: PagerDemo,
    },
    {
      path: '/usercenter',
      name: 'userCenter',
      component: UserCenter,
    },
    {
      path: '/SlideDemo',
      name: 'SlideDemo',
      component: SlideDemo,
    },
    {
      path: '/smsCode',
      name: 'SmsCodeDemo',
      component: SmsCodeDemo,
    },
    {
      path: '/contract',
      name: 'ContractDemo',
      component: ContractDemo,
    },
    {
      path: '/stickybar',
      name: 'stickyBarDemo',
      component: stickyBarDemo,
    },
  ],
})
