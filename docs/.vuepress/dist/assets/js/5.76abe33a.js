(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{319:function(e,t,n){},320:function(e,t,n){},325:function(e,t,n){"use strict";n(319)},326:function(e,t,n){"use strict";n(320)},327:function(e,t,n){"use strict";n(70),n(69),n(31),n(95);var i={props:{selected:{type:String},autoPlay:{type:Boolean,default:!0},direction:{type:String,default:"x"},showNav:{type:Boolean,default:!0}},data:function(){return{childrenLength:0,lastSelectedIndex:void 0,startTouch:{}}},mounted:function(){this.updateChildren(),this.playAutomatically(),this.childrenLength=this.items.length},updated:function(){this.updateChildren()},computed:{selectedIndex:function(){var e=this.names.indexOf(this.selected);return-1===e?0:e},names:function(){return this.items.map((function(e){return e.name}))},items:function(){return this.$children.filter((function(e){return"GuluSlideItem"===e.$options.name}))}},methods:{onMouseEnter:function(){this.pause()},onMouseLeave:function(){this.playAutomatically()},pause:function(){window.clearTimeout(this.timerId),this.timerId=void 0},onTouchStart:function(e){this.pause(),e.touches.length>1||(this.startTouch=e.touches[0])},onTouchEnd:function(e){var t=this,n=e.changedTouches[0],i=this.startTouch,s=i.clientX,a=i.clientY,c=n.clientX,o=n.clientY;Math.sqrt(Math.pow(c-s,2)+Math.pow(o-a,2))/Math.abs(o-a)>2&&(c>s?this.select(this.selectedIndex-1):this.select(this.selectedIndex+1)),this.$nextTick((function(){t.playAutomatically()}))},playAutomatically:function(){var e=this;if(!this.timerId){this.timerId=setTimeout((function t(){var n=e.names.indexOf(e.getSelected())+1;e.select(e.names[n]),e.timerId=setTimeout(t,3e3)}),3e3)}},getSelected:function(){var e=this.$children[0];return this.selected||e.name},updateChildren:function(){var e=this,t=this.getSelected();this.$children.forEach((function(n){var i=!(e.selectedIndex>e.lastSelectedIndex);e.timerId&&(e.lastSelectedIndex===e.$children.length-1&&0===e.selectedIndex&&(i=!1),0===e.lastSelectedIndex&&e.selectedIndex===e.$children.length-1&&(i=!0)),n.reverse=i,e.$nextTick((function(){n.selected=t}))}))},select:function(e){this.lastSelectedIndex=this.selectedIndex,-1===e&&(e=this.names.length-1),e===this.names.length&&(e=0),this.$emit("update:selected",this.names[e])}}},s=(n(325),n(41)),a=Object(s.a)(i,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"g-slides",on:{mouseenter:e.onMouseEnter,mouseleave:e.onMouseLeave,touchstart:e.onTouchStart,touchend:e.onTouchEnd}},[n("div",{ref:"window",staticClass:"g-slides-window"},[n("div",{staticClass:"g-slides-wrapper"},[e._t("default")],2),e._v(" "),e.showNav?n("ul",{staticClass:"g-slides-dots"},e._l(e.childrenLength,(function(t){return n("li",{key:t,class:{active:e.selectedIndex===t-1},on:{click:function(n){return e.select(t-1)}}},[n("span")])})),0):e._e()])])}),[],!1,null,"88b8c63a",null);t.a=a.exports},328:function(e,t,n){"use strict";n(69);var i={name:"GuluSlideItem",props:{name:{type:String,required:!0}},data:function(){return{selected:void 0,reverse:!0}},computed:{visible:function(){return this.selected===this.name},directionName:function(){return"x"===this.$parent.direction?"slide":"slidey"}}},s=(n(326),n(41)),a=Object(s.a)(i,(function(){var e=this.$createElement,t=this._self._c||e;return t("transition",{attrs:{name:this.directionName}},[this.visible?t("div",{staticClass:"g-slides-item",class:{reverse:this.reverse}},[this._t("default")],2):this._e()])}),[],!1,null,"fa6de804",null);t.a=a.exports},351:function(e,t,n){},352:function(e,t,n){},353:function(e,t,n){},397:function(e,t,n){"use strict";n(351)},398:function(e,t,n){"use strict";n(352)},399:function(e,t,n){"use strict";n(353)},418:function(e,t,n){"use strict";n.r(t);var i=n(327),s=n(328),a={props:{type:{type:String,default:""}}},c=(n(397),n(41)),o=Object(c.a)(a,(function(){var e=this.$createElement;return(this._self._c||e)("span",{class:"gtag gtag-"+this.type},[this._t("default")],2)}),[],!1,null,"638a58c9",null).exports,l={info:{name:"通知",type:""},backlog:{name:"待办",type:"warning"},urgent:{name:"紧急",type:"danger"}},r={name:"noticeBar",components:{gSlides:i.a,gSlidesItem:s.a,gTag:o},props:{noticeList:{type:Array}},data:function(){return{selected:"",tagType:l}},watch:{noticeList:function(e){this.selected=e[0].id}}},u=(n(398),{name:"noticeBar-demos",components:{noticeBar:Object(c.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"notice-bar"},[n("g-slides",{attrs:{selected:e.selected,direction:"y",showNav:!1},on:{"update:selected":function(t){e.selected=t}}},[e._l(e.noticeList,(function(t){return[n("g-slides-item",{key:t.name,staticStyle:{height:"48px"},attrs:{name:t.name}},[n("div",{staticClass:"notice-bar__item"},[n("g-tag",{attrs:{type:e.tagType[t.type].type}},[e._v(e._s(e.tagType[t.type].name))]),e._v(" "),n("div",{staticClass:"notice-bar__item-content",class:"notice-bar__item-content-"+e.tagType[t.type||"info"].type},[e._v("\n              "+e._s(t.message)+"\n            ")]),e._v(" "),t.isLink?[n("a",{staticClass:"notice-bar__item-btn",attrs:{href:t.href,target:t.openNew?"_blank":"_self"}},[n("span",[e._v(e._s(t.handleText||"查看详情"))])])]:[n("a",{staticClass:"notice-bar__item-btn",attrs:{href:"javascript:;"},on:{click:function(n){return e.$emit("viewClick",t)}}},[n("span",[e._v(e._s(t.handleText||"查看详情"))])])]],2)])]}))],2)],1)])}),[],!1,null,"e39dd684",null).exports},data:function(){return{noticeList:[{name:"0",message:"1月27日工商银行关于待还款管控利率问题调查通知",isLink:!0,href:"https://www.baidu.com",openNew:!1,type:"backlog",handleText:"查看详情"},{name:"1",message:"1月27日工商银行关于待还款管控利率问题调查通知",isLink:!1,href:"https://www.baidu.com",openNew:!0,type:"info"},{name:"2",message:"1月27日工商银行关于待还款管控利率问题调查通知,1月27日工商银行关于待还款管控利率问题调查通知,1月27日工商银行关于待还款管控利率问题调查通知（可选）",isLink:!1,href:"https://www.baidu.com",openNew:!0,type:"urgent",handleText:"立即处理"}]}},methods:{viewClickHandle:function(e){console.log(e)}}}),d=(n(399),Object(c.a)(u,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"demo"},[n("notice-bar",{attrs:{noticeList:e.noticeList,selected:e.noticeList[0].name},on:{"update:selected":function(t){return e.$set(e.noticeList[0],"name",t)},viewClick:e.viewClickHandle}})],1)}),[],!1,null,"862962ae",null));t.default=d.exports}}]);