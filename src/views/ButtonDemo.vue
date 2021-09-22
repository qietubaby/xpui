<template>
  <div class="content">
    <h2>Button 按钮</h2>
    <h3>组件用法</h3>
    <div>
      <p>①可以给按钮添加图标，选择图标位置。</p>
   
    </div>
    <div style="height: 50px;"></div>
    <div class="demoitem">
      <g-button>按钮组件</g-button>
    </div>

    <div class="demoitem">
      <g-button icon="settings" icon-position="right">按钮</g-button>
    </div>

    <div class="demoitem">
      <g-button icon="settings" icon-position="left">设置</g-button>
    </div>

    <div class="demoitem">
      <g-button icon="loading" icon-position="right" loading>加载</g-button>
    </div>
  </div>
</template>
<script>
export default {}
</script>
