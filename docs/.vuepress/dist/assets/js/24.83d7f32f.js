(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{365:function(e,t,n){},411:function(e,t,n){"use strict";n(365)},435:function(e,t,n){"use strict";n.r(t);n(69);var s={name:"GuluCollapseItem",props:{title:{type:String,required:!0},name:{type:String,required:!0},single:{type:Boolean}},data:function(){return{open:!1}},inject:["eventBus"],mounted:function(){var e=this;this.eventBus&&this.eventBus.$on("update:selected",(function(t){e.single?t.indexOf(e.name)>=0?e.open=!0:e.open=!1:(console.log(t),t.indexOf(e.name)>=0&&(e.open?e.open=!1:e.open=!0))}))},methods:{toggle:function(){this.open?this.eventBus&&this.eventBus.$emit("update:removeSelected",this.name):this.eventBus&&this.eventBus.$emit("update:addSelected",this.name)}}},i=(n(411),n(41)),o=Object(i.a)(s,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"collapseItem"},[n("div",{staticClass:"title",attrs:{"data-name":e.name},on:{click:e.toggle}},[e._v(e._s(e.title))]),e._v(" "),e.open?n("div",{ref:"content",staticClass:"content"},[e._t("default")],2):e._e()])}),[],!1,null,"102f7702",null);t.default=o.exports}}]);