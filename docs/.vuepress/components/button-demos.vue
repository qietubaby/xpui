<template>
  <div>
    <g-button>按钮组件</g-button>
    <g-button :loading="true">按钮组件</g-button>
    <pre>
    <code>
      {{ content }}
    </code>
  </pre>
  </div>
</template>
<script>
import Button from "../../../src/components/button/button";
export default {
  data() {
    return {
      content: `<g-button>按钮组件</g-button>
    <g-button :loading="true">按钮组件</g-button>`,
    };
  },
  components: {
    gButton: Button,
  },
};
</script>
