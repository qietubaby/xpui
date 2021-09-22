<template>
  <div>
    <g-popover @close="closeback" @open="openback" position="top">
      <template slot="content" slot-scope="{ close }">
        张恒心中轻笑，王家再富也只是商贾，自己却是清贵的进士，看来交结可以，却不该由自己先开口。
        <g-button @click="close">关闭</g-button>
      </template>
      <g-button>点我TOP</g-button>
    </g-popover>
    <br /><br />
    <g-popover position="bottom" trigger="hover">
      <template slot="content"
        >张恒心中轻笑，王家再富也只是商贾，自己却是清贵的进士，看来交结可以，却不该由自己先开口。</template
      >
      <g-button>鼠标移入BOTTOM</g-button>
    </g-popover>
    <br /><br />
    <g-popover position="left">
      <template slot="content"
        >如此想着，他面上却故作讶然：“那就是王珍的三弟了？我只听说他有个二弟颇通商事，却未听说他还有个三弟。”</template
      >
      <g-button>点我LEFT</g-button>
    </g-popover>
    <br /><br />
    <g-popover position="right">
      <template slot="content"
        >邓景荣是老胥吏，如何听不出来张恒话中那丝若有若无的自矜，恭维道：“大人年轻就高中进士，又人品俊秀，定然前程似锦。”</template
      >
      <g-button>点我RIGHT</g-button>
    </g-popover>
    <pre>
    <code>
      {{ content }}
    </code>
  </pre>
  </div>
</template>
<script>
import Popover from '../../../src/components/popover/popover'
import Button from '../../../src/components/button/button'
export default {
  data() {
    return {
      content: ` <g-popover @close="closeback" @open="openback" position="top">
      <template slot="content" slot-scope="{ close }">
        张恒心中轻笑，王家再富也只是商贾，自己却是清贵的进士，看来交结可以，却不该由自己先开口。
        <g-button @click="close">关闭</g-button>
      </template>
      <g-button>点我TOP</g-button>
    </g-popover>

    <g-popover position="bottom" trigger="hover">
      <template slot="content">张恒心中轻笑，王家再富也只是商贾，自己却是清贵的进士，看来交结可以，却不该由自己先开口。</template>
      <g-button>鼠标移入BOTTOM</g-button>
    </g-popover>

    <g-popover position="left">
      <template slot="content">如此想着，他面上却故作讶然：“那就是王珍的三弟了？我只听说他有个二弟颇通商事，却未听说他还有个三弟。”</template>
      <g-button>点我LEFT</g-button>
    </g-popover>

    <g-popover position="right">
      <template slot="content">邓景荣是老胥吏，如何听不出来张恒话中那丝若有若无的自矜，恭维道：“大人年轻就高中进士，又人品俊秀，定然前程似锦。”</template>
      <g-button>点我RIGHT</g-button>
    </g-popover>`,
    }
  },
  components: {
    gPopover: Popover,
    gButton: Button,
  },
  methods: {
    openback() {
      //console.log('弹出了')
    },
    closeback() {
      //console.log('关闭了')
    },
  },
}
</script>
