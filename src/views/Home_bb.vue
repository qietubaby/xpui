<template>
  <div class="home">

    <div class="box">
      <p>级联选择组件</p>
      <!-- <p>{{selected}}</p> -->
      <g-cascader
       :source.sync="source"
       popoverHeight="200px"
       :selected.sync="selected"
      >
      <!-- 
        如果数据是动态的需要传这个函数
        :load-data="loadData" 
      -->
      

      <!--
      :selected="selected"
       @update:selected="selected = $event"
       上面这两行可以简写为 :selected.sync="selected"
      -->
      </g-cascader>
    </div>
    <div class="box">
      <p>父子组件双向绑定</p>
      <father></father>
    </div>
    <div class="box">
      <p>④这是Tabs组件</p>
      <g-tabs :selected.sync="selectedTab" direction="vertical">
        <!-- 
        这行代码和上面等价
        <g-tabs selected="selectedTab" @update:selected="selectedTab = $event">
        -->
        <g-tabs-head>
          <template slot="actions">
            <button>设置</button>
          </template>
          <g-tabs-item name="woman">美女</g-tabs-item>
          <g-tabs-item name="finance" disabled>财经</g-tabs-item>
          <g-tabs-item name="sports">体育</g-tabs-item>
        </g-tabs-head>
        <g-tabs-body>
          <g-tabs-pane name="woman">美女资讯</g-tabs-pane>
          <g-tabs-pane name="finance">财经资讯</g-tabs-pane>
          <g-tabs-pane name="sports">体育资讯</g-tabs-pane>
        </g-tabs-body>
      </g-tabs>
    </div>
    
    <div class="box">
      <p>⑤这是popover组件</p>

      <g-popover position="top">
        <template slot="content" slot-scope="{close}">这是什么呀content
          <g-button @click="close">关闭</g-button>
        </template>
        <g-button>点我TOP</g-button>
      </g-popover>
      <g-popover position="bottom" trigger="hover">
        <template slot="content">这是什么呀content</template>
        <g-button>点我BOTTOM</g-button>
      </g-popover>

      <g-popover position="left">
        <template slot="content">这是什么呀content</template>
        <g-button>点我LEFT</g-button>
      </g-popover>
      <g-popover position="right">
        <template slot="content">这是什么呀content</template>
        <g-button>点我RIGHT</g-button>
      </g-popover>
    </div>
    <div class="box">
      <p>①这是按钮组件</p>
      <g-button @click="loading1 = !loading1" :loading="loading1">我爱JS</g-button>
      <g-button
        @click="loading2 = !loading2"
        icon="settings"
        icon-position="left"
        :loading="loading2"
      >按钮</g-button>
      <g-button icon="settings" icon-position="right">按钮</g-button>
      <g-button-group>
        <g-button icon="left">上一页</g-button>
        <g-button>当前</g-button>
        <g-button icon="right" icon-position="right">下一页</g-button>
      </g-button-group>
    </div>

    <!--输入框组件-->
    <div class="box box2">
      <p>②这是输入框组件</p>
      <g-input value="张三"></g-input>
      <g-input disabled value="李四"></g-input>

      <div>
        <g-input value="王" error="姓名不能少于两个字"></g-input>
      </div>
      <div>
        <g-input value="王五" @blur="inputChange"></g-input>
      </div>
      <div>
        <g-input value="王五" v-model="message"></g-input>
        <p>{{message}}</p>
      </div>
    </div>

    <!--toast组件-->
    <div class="box">
      <p>③这是Toast组件</p>
      <g-button @click="showToast">点我触发toast组件</g-button>
    </div>

    
  </div>
</template>

<script>
// @ is an alias to /src
import Father from "@/components/fatherAndSon/father.vue";

// 省市区数据
import db from './db.json'
function ajax (parentId = 0) {
  return new Promise((success) => {
    setTimeout( () => {
      let result = db.filter((item) => item.parent_id == parentId)

      /**这部分工作其实是后台做的，用来判断有没有children */
      result.forEach(node => {
        if(db.filter(item => item.parent_id === node.id).length > 0) {
          node.isLeaf = false
        } else {
          node.isLeaf = true
        }
      })
     
      success(result)
    },500)
    
  })
}

export default {
  name: "home",
  data() {
    return {
      loading1: false,
      loading2: true,
      message: "",
      selectedTab: "woman",
      
      // cascader组件数据
      selected:[],
      source: [],
      
     
    };

   
  },
  created () {


    // 省市区动态数据
    // ajax(0).then(result => {
    //   this.source = result
    // })


    // 省市区静态数据
    this.source = [
      {
        name:"河北省",
        children:[{
          name:"邯郸",
          children:[
            {name:'涉县'},
            {name:'肥乡'},
            {name:'磁县'}
          ]
        },{
          name:"石家庄"
        }]
      }
    ]

    
  },
  methods: {
    loadData(node, updateSource){
      let {id } = node
      ajax(id).then(result => {
        updateSource(result)
      })
    },
    xxx() {
      ajax(this.selected[0].id).then(result => {
        let lastLevelSelectd = this.source.filter(item => item.id === this.selected[0].id)[0]
        this.$set(lastLevelSelectd,'children',result)
        console.log(lastLevelSelectd);
        
      })
    },
    inputChange(e) {
      console.log(e.target.value);
    },
    showToast() {
      this.$toast("<p>我是message</p>", {
        position: "top",
        enableHtml: true,
        closeButton: {
          text: "知道了",
          callback(toast) {
            toast.log();
            console.log("这里是回调");
          }
        }
      });
    },
    x(){
      console.log(this)
    }
  },
  components: {
    Father
  }
};
</script>
<style lang="scss">
.home {
  .box {
    padding: 30px 0;
    border-bottom: 1px solid #ccc;
    min-height: 200px;
  }
  .box2 .wrapper {
    margin: 10px;
  }
  .g-button-group {
    margin-left: 30px;
  }
  p {
    margin: 20px 0;
  }
}
.container {
  width: 500px;
  display: flex;
  border: 2px solid #000;
  margin: 20px;
}
.g-button {
  margin-right: 10px;
}
.g-button-group .g-button {
  margin-right: 0;
}

</style>