<template>
  <div class="navs">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "GuluNav",
  provide(){
    return {
      root: this
    }
  },
  props: {
    selected: {
      type: Array,
      default: () => []
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      items: [],
      namePath: []
    }
  },
  mounted() {
    this.updateChild()
    this.listenToChildren()
  },
  updated() {
    this.updateChild()
  },
  computed: {
    // 用依赖注入就不用就算了
    // items() {
    //   return this.$children.filter(vm => vm.$options.name === "NavItem");
    // }
  },
  methods: {
    addItem(vm) {
      this.items.push(vm)
    },
    updateChild() {
      this.items.forEach(vm => {
      if (this.selected.indexOf(vm.name) >= 0) {
        vm.selected = true;
      } else {
        vm.selected = false;
      }
    });
    },
    listenToChildren() {
      this.items.forEach(vm => {
        vm.$on("add:selected", name => {
          if (this.multiple) {
            if (this.selected.indexOf(name) < 0) {
              let copy = JSON.parse(JSON.stringify(this.selected));
              copy.push(name);
              this.$emit("update:selected", copy);
            }
          } else {
            this.$emit('update:selected',[name])
          }
        });
      });
    }
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/var.scss";
.navs {
  display: flex;
  border-bottom: 1px solid $gray;
  cursor: default;
  user-select: none;
}
</style>
