<template>
  <div>
    <tabs :selected.sync="selectedTab" direction="vertical">
      <tabs-head>
        <tabs-item name="woman">美女</tabs-item>
        <tabs-item name="finance" disabled>财经</tabs-item>
        <tabs-item name="sports">体育</tabs-item>
      </tabs-head>
      <tabs-body>
        <tabs-pane name="woman">美女资讯</tabs-pane>
        <tabs-pane name="finance">财经资讯</tabs-pane>
        <tabs-pane name="sports">体育资讯</tabs-pane>
      </tabs-body>
    </tabs>
    <pre>
    <code>
      {{ content }}
    </code>
  </pre>
  </div>
</template>
<script>
//tabs 组件
import Tabs from '../../../src/components/tabs/tabs.vue'
import TabsHead from '../../../src/components/tabs/tabs-head.vue'
import TabsItem from '../../../src/components/tabs/tabs-item.vue'
import TabsBody from '../../../src/components/tabs/tabs-body.vue'
import TabsPane from '../../../src/components/tabs/tabs-pane.vue'
export default {
  name: 'tab-demos',
  data() {
    return {
      selectedTab: 'woman',
      doc: {
        title: '小明',
      },
      content: `
          <template>
            <tabs :selected.sync="selectedTab" direction="vertical">
            <tabs-head>
              <tabs-item name="woman">美女</tabs-item>
              <tabs-item name="finance" disabled>财经</tabs-item>
              <tabs-item name="sports">体育</tabs-item>
            </tabs-head>
            <tabs-body>
              <tabs-pane name="woman">美女资讯</tabs-pane>
              <tabs-pane name="finance">财经资讯</tabs-pane>
              <tabs-pane name="sports">体育资讯</tabs-pane>
            </tabs-body>
          </tabs>
        </template>
        <script>
          data() {
            return {
              selectedTab: 'woman',
            }
          }
        <\/script>`,
    }
  },
  components: {
    Tabs,
    TabsHead,
    TabsItem,
    TabsBody,
    TabsPane,
  },
}
</script>
