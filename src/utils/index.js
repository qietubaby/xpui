/*
  存储sessionstorage
 */
export function setStorage(name, obj) {
  let str = JSON.stringify(obj)
  sessionStorage[name] = str
}
/*
  获取sessionstorage
 */
export function getStorage(name) {
  if (sessionStorage[name]) {
    return JSON.parse(sessionStorage[name])
  } else {
    return false
  }
}
/*
/*
  获取sessionstorage，并清除
 */
export function getStorageOnce(name) {
  if (sessionStorage[name]) {
    let val = sessionStorage[name]
    removeStorage(name)
    return JSON.parse(val)
  } else {
    return false
  }
}
/*
  清除sessionstorage
 */
export function removeStorage(name) {
  sessionStorage.removeItem(name)
}

// 节流
export function throttle(fn, wait = 0) {
  var timer
  return function(...args) {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null
      }, wait)
      return fn.apply(this, args)
    }
  }
}

// 防抖
export function debounce(fn, delay = 300) {
  var timer
  return function() {
    var context = this
    var args = arguments
    clearTimeout(timer)
    timer = setTimeout(function() {
      fn.apply(context, args)
    }, delay)
  }
}
