// 点击document隐藏cascader下拉框，并且解决重复监听的问题

let onClickDocument = (e) => {
  let {target} = e
  callbacks.forEach((item)=>{
    if(target === item.el || item.el.contains(target)){
      return 
    } else {
      item.callback()
    }
  })
}

document.addEventListener('click',onClickDocument)
let callbacks = []

// binding.value 就是绑定的回调函数

export default {
  bind: function (el, binding) { //vnode
    callbacks.push({el, callback: binding.value})
  }
}