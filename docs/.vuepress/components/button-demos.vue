<template>
  <div>
    <component v-if="dynamicComponent" :is="dynamicComponent"
      >按钮组件</component
    >
    <component v-if="dynamicComponent" :is="dynamicComponent" :loading="true"
      >按钮组件</component
    >
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
      content: `<g-button>按钮组件</g-button>
    <g-button :loading="true">按钮组件</g-button>`,
    }
  },
  mounted() {
    import('../../../src/components/button/button').then(module => {
      this.dynamicComponent = module.default
    })
  },
}
</script>
