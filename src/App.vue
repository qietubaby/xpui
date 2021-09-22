<template>
  <div id="app">
    <header class="header">
      <router-link to="/">
        <img class="logo" src="@/assets/images/logo.png" alt="" />
      </router-link>
      <div class="navs">
        <router-link to="/">首页</router-link>
        <a href="https://github.com/qietubaby">Github</a>
      </div>
    </header>

    <div class="container">
      <ul class="side-bar">
        <li class="big-title">组件</li>
        <li>
          <router-link to="/smsCode">SmsCode 短信验证码</router-link>
        </li>
        <li>
          <router-link to="/contract">Contract 合同弹窗</router-link>
        </li>
        <li>
          <router-link to="/icon">Icon 图标</router-link>
        </li>
        <li>
          <router-link to="/input">Input 输入框</router-link>
        </li>
        <li>
          <router-link to="/button">Button 按钮</router-link>
        </li>
        <li>
          <router-link to="/popover">Popover 弹窗</router-link>
        </li>
        <li>
          <router-link to="/SlideDemo">Slide 无缝轮播组件</router-link>
        </li>
        <li>
          <router-link to="/toast">Toast 组件</router-link>
        </li>
        <li>
          <router-link to="/tab">Tab 选项卡</router-link>
        </li>
        <li>
          <router-link to="/collapse">Collapse 折叠面板</router-link>
        </li>
        <li>
          <router-link to="/cascader">Cascader 级联选择器</router-link>
        </li>
        <li>
          <router-link to="/ajaxcascader"
            >Cascader Ajax版本级联选择器</router-link
          >
        </li>
        <li>
          <router-link to="/table">Table 表格组件</router-link>
        </li>
        <li>
          <router-link to="/scroll">Scroll 滚动组件</router-link>
        </li>
        <li>
          <router-link to="/datepicker">DatePicker 日期选择框</router-link>
        </li>
        <li>
          <router-link to="/sticky">Sticky 固钉组件</router-link>
        </li>
        <li>
          <router-link to="/upload">Upload上传组件</router-link>
        </li>
        <li>
          <router-link to="/pager">Pagination 分页</router-link>
        </li>
        <li>
          <router-link to="/usercenter">个人中心</router-link>
        </li>
      </ul>
      <div class="component-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  width: 1110px;
  margin: 0 auto;
  height: 80px;
  border-bottom: 1px solid #dcdfe6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    margin-top: 19px;
  }
  .navs a {
    color: #1989fa;
    font-size: 16px;
    margin-left: 10px;
    cursor: pointer;
    text-decoration: none;
  }
}
.container {
  overflow: hidden;
  width: 1110px;
  margin: 40px auto 40px auto;
  .side-bar {
    width: 240px;
    float: left;
  }
  .component-content {
    width: 830px;
    float: right;
  }
}
.side-bar {
  margin-right: 40px;
  .big-title {
    font-weight: bold;
  }
  li {
    height: 40px;
    line-height: 40px;
  }
  li a {
    color: #444;

    text-decoration: none;
    &:hover {
      color: #409eff;
    }
  }
  li a.current {
    color: #409eff;
  }
}
</style>
