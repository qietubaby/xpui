<template>
  <div class="content">
    <h2>Icon 图标</h2>
    <h3>组件用法</h3>
    <div>
      <p>①从iconfont上搞的图标，用来学习。</p>
    </div>
    <div style="height: 50px;"></div>
    <ul class="icon-list">
      <li>
        <g-icon name="download"></g-icon>
        <span class="icon-name">download</span>
      </li>
      <li>
        <g-icon name="thumbs-up"></g-icon
        ><span class="icon-name">thumbs-up</span>
      </li>
      <li><g-icon name="left"></g-icon><span class="icon-name">left</span></li>
      <li>
        <g-icon name="settings"></g-icon><span class="icon-name">settings</span>
      </li>
      <li><g-icon name="down"></g-icon><span class="icon-name">down</span></li>
      <li style="border-right:none;">
        <g-icon name="loading"></g-icon><span class="icon-name">down</span>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
.icon-list {
  overflow: hidden;
  list-style: none;
  padding: 0 !important;
  border: 1px solid #eaeefb;
  border-radius: 4px;
  li {
    float: left;
    width: 16.66%;
    text-align: center;
    height: 120px;
    color: #666;
    font-size: 13px;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    margin-right: -1px;
    margin-bottom: -1px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    .icon-name {
      display: inline-block;
      height: 1em;
      color: #99a9bf;
    }
    .g-icon {
      font-size: 40px;
      fill: #666;
    }
    &:hover {
      .g-icon {
        fill: #409eff;
      }
      .icon-name {
        color: #409eff;
      }
    }
  }
}
</style>
