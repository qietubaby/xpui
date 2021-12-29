<template>
  <div>
    <component v-if="collapse" :is="collapse" :single="true" :selected="abc">
      <component
        v-if="collapseItem"
        :is="collapseItem"
        :single="true"
        title="This is panel header 1"
        name="1"
      >
        <div class="color">
          A dog is a type of domesticated animal. Known for its loyalty and
          faithfulness, it can be found as a welcome guest in many households
          across the world.
        </div>
      </component>
      <component
        v-if="collapseItem"
        :is="collapseItem"
        :single="true"
        title="This is panel header 2"
        name="2"
      >
        <div class="color">
          A dog is a type of domesticated animal. Known for its loyalty and
          faithfulness, it can be found as a welcome guest in many households
          across the world.
        </div>
      </component>
      <component
        v-if="collapseItem"
        :is="collapseItem"
        :single="true"
        title="This is panel header 3"
        name="3"
      >
        <div class="color">
          A dog is a type of domesticated animal. Known for its loyalty and
          faithfulness, it can be found as a welcome guest in many households
          across the world.
        </div>
      </component>
    </component>

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
      collapse: null,
      collapseItem: null,
      abc: ['1'],
      content: `
        <collapse :single="true" :selected="abc">
          <collapseItem :single="true" title="This is panel header 1" name="1">
            <div class="color">
              A dog is a type of domesticated animal. Known for its loyalty and
              faithfulness, it can be found as a welcome guest in many households
              across the world.
            </div>
          </collapseItem>
          <collapseItem :single="true" title="This is panel header 2" name="2">
            <div class="color">
              A dog is a type of domesticated animal. Known for its loyalty and
              faithfulness, it can be found as a welcome guest in many households
              across the world.
            </div>
          </collapseItem>
          <collapseItem :single="true" title="This is panel header 3" name="3">
            <div class="color">
              A dog is a type of domesticated animal. Known for its loyalty and
              faithfulness, it can be found as a welcome guest in many households
              across the world.
            </div>
          </collapseItem>
        </collapse>
      `,
    }
  },

  mounted() {
    import('../../../src/components/collapse/collapse').then(module => {
      this.collapse = module.default
    })
    import('../../../src/components/collapse/collapse-item').then(module => {
      this.collapseItem = module.default
    })
  },
}
</script>

<style lang="scss" scoped>
.color {
  color: rgba(0, 0, 0, 0.65);
  line-height: 1.5715;
}
</style>
