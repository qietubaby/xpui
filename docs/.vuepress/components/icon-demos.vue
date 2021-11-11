<template>
  <div>
    <ul class="icon-list">
      <li>
        <component :is="dynamicComponent" name="download"></component>
        <span class="icon-name">download</span>
      </li>
      <li>
        <component :is="dynamicComponent" name="thumbs-up"></component
        ><span class="icon-name">thumbs-up</span>
      </li>
      <li>
        <component :is="dynamicComponent" name="left"></component
        ><span class="icon-name">left</span>
      </li>
      <li>
        <component :is="dynamicComponent" name="settings"></component
        ><span class="icon-name">settings</span>
      </li>
      <li>
        <component :is="dynamicComponent" name="down"></component
        ><span class="icon-name">down</span>
      </li>
      <li style="border-right:none;">
        <component :is="dynamicComponent" name="loading"></component
        ><span class="icon-name">down</span>
      </li>
    </ul>
    <pre>
    <code>
      {{ content }}
    </code>
  </pre>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dynamicComponent: null,
      content: `<g-icon name="download"></g-icon>
      <g-icon name="loading"></g-icon>`,
    }
  },
  mounted() {
    import('../../../src/components/icon/icon').then(module => {
      this.dynamicComponent = module.default
    })
  },
}
</script>
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
