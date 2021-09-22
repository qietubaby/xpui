# Vue components

## 介绍

这是一个使用Vue开发 UI 的组件库，目的在于学习如何使用Vue开发组件。**此UI库功能并不完善且存在一些bug尚未解决，不推荐在开发中使用**。源码中提供了大量的注释，可以帮助新人学习如何自己动手开发组件库，例如在工作中如果其他组件库无法满足需求时，可以自己开发组件。

## 安装、运行、打包
```
npm install
npm run serve
npm run build
```

## 文档
See [Documents](https://qietubaby.github.io/components/#/).

## Tab 组件

该组件共分为5个小组件，分别是tabs\tabs-head\tab-item\tab-body\tab-pane。tabs-head包裹tab-item，tab-body包裹tab-pane。

当我们做切换的时候，也就是点击tab-item的时候，需要通知自己的兄弟组件自己当前是active状态，让兄弟组件把自己的active状态去掉（如果存在active状态的话），同时也需要告诉tab-pane当前选中的是哪一个，让tab-pane展示出对应的内容。还需要告诉顶级组件目前选择的是哪一个。

Vue兄弟组件传递数据，如果使用emit一级一级触发会显的十分繁琐，所以大多数人会选择Vuex插件，但是如果是开发组件项目，用Vuex显然是不合适的。如果只使用Vue开发的话，只能使用EventBus概念，这个Vue官网有提到过。使用new Vue()创建一个EventBus，使用EventBus.$on监听事件，使用EventBus.$emit触发事件。

事实上需要注意的是，监听事件总要写在触发前面的，所以监听、触发这两个行为写在组件的哪个状态一定要搞清楚。通过调试也可以发现父组件的created会先触发，而子组件的mounted则会先触发。

```
// tabs组件提供EventBus
data() {
    return {
      eventBus: new Vue()
    }
  },
  provide() {
    return {
      eventBus: this.eventBus
    }
}


// 子组件需要注入
inject: ['eventBus'],
```


## Cascader 级联选择器实现原理

该组件可以展示多层级数据，如果数据存在children数据，则可以无限展示。最典型的应用的是省、市、区的选择。

多层显示很明显可以使用递归来实现，所以在Vue中可以组件引用自身组件来对数据进行渲染，也就是所谓的递归组件。如果在vue单文件中使用了跟该组件name一样的标签，那么就是调用自己。

```
<template>
  <cascaer-item></cascaer-item>
</template>
<script>
  export default {
    name: "CascaderItem"
  }
</script>
````


如何判断数据还有下一层？设置一个当前选中数据，比如当前选择了“北京市”，那么当前选中的就要把北京市这条数据记录下来，不仅是“北京市”这个名称而已，包括北京市下面的区域。这样就可以判断这条数据下有没有children从而进行判断是否继续进行渲染。


## Pagination 分页器组件实现原理

首先分页组件有几个按钮是必须显示的。
比如：第一页、最后一页、当前页、当前页+n页、当前页-n页、前一页、后一页

首先要确定你设计的组件需要什么功能，从而才能确定必须要传哪些数据给父组件。current(当前页数)、totalPage（总页数）这两个是必须存在的，这是构成分页器的必备条件。当然还需要点击事件，用来进行分页跳转。

其次就需要根据自己的设计来丰富你的组件库。比如从使用这个组件的人考虑：他是否想让数据只有一页的情况下隐藏分页器？他是否需要加上显示总页码的功能？又或者是否可以输入页码跳转到某一页等等。

这里只分析核心功能，读者需要额外功能可以自己添加，说不定可以创造出别的组件库都没有确又让使用者眼前一亮的功能，这都在于自己的设计。


[第一页,最后一页(也就是totalPage),currentPage,currentPage-1,currentPage-2,currentPage+1,currentPage+2]，首先需要对数组进行排序，如果当前页是第一页，那么就会出现两个“第一页”，所以还需要对数组进行去重处理。如果当前页是第一页还会出现0页和-1页，所以注意要过滤掉。

遍历数组，如果两个数组之间的差>1，那么就在中间加省略号，就是我们平常看到的分页中出现的省略号。

点击按钮触发点击事件
```
// 父组件监听
:current_page.sync = currnetPage

// 子组件触发
this.$emit("update:currentPage",n)
```

还有一点需要注意的是：关于展示页码的数据需要放在computed里面，根据父组件传过来的值进行对应渲染。





## 单元测试

- chai 断言  Should Expect Assert www.chailjs.com

- BDD  Behavior(行为) Driven（驱动） Development（开发） 
- TDD（测试驱动开发）Test Driven Dev
- Assert 断言 我主观认为  console.assert(1===1) console.assert('1').is.a('string')

- npm i -D chai
- npm i -D chai-spies // 间谍函数


- 自动化测试
- 持续继承
- 重写所有代码
- 发布npm包
- 完善 README

## 使用Karma + Mocha 做单元测试
- Karma 是一个测试运行器，它可以呼起浏览器，加载测试脚本，然后运行测试用例

- Mocha 是一个单元测试框架/库，它可以用来写测试用例
- Sinon 是一个spy/stub / mock库，用以辅助测试（使用后才能理解）

- 安装各种工具  npm i -D karma karma-chrome-launcher karma-mocha karma-sinon-chai mocha sinon sinon-chai karma-chai karma-chai-spies

- touch karma.conf.js
