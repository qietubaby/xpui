// 终极版本：使用面向对象
// 为什么要使用面向对象？因为允许用户自定义规则，如果不使用面向对象，很有可能破坏别人的代码。使用面向对象可以让用户新建自己的实例

class Validator {
  constructor() {}

  // 静态方法
  static add(name, fn) {
    console.log('this-----------', this)
    Validator.prototype[name] = fn
  }

  // add (name,fn) {
  //   Validator.prototype[name] = fn
  // }

  validate(data, rules) {
    let errors = {}
    rules.forEach(rule => {
      let value = data[rule.key]
      if (rule.required) {
        let error = this.required(value)
        if (error) {
          ensureObject(errors, rule.key)
          errors[rule.key].required = error
        }
      }

      // 把required和key两个过滤掉
      let validators = Object.keys(rule).filter(
        key => key !== 'key' && key !== 'required',
      )

      // 遍历validators并调用对应的函数
      validators.forEach(validatorKey => {
        // validatorKey is pattern / minLength / maxLength...
        if (this[validatorKey]) {
          let error =
            this[validatorKey] && this[validatorKey](value, rule[validatorKey])
          if (error) {
            ensureObject(errors, rule.key)
            errors[rule.key][validatorKey] = error
          }
        } else {
          throw `不存在的校验器:${validatorKey}`
        }
      })
    })

    return errors
  }
  required(value) {
    if (value !== 0 && !value) {
      return '必填'
    }
  }

  pattern(value, pattern) {
    if (pattern === 'email') {
      pattern = /^.+@.+$/
    }
    if (pattern.test(value) === false) {
      return '格式不正确'
    }
  }

  minLength(value, minLength) {
    if (value.length < minLength) {
      return '太短'
    }
  }

  maxLength(value, maxLength) {
    if (value.length > maxLength) {
      return '太长'
    }
  }
}
Validator.a = function() {}
function ensureObject(obj, key) {
  if (typeof obj[key] !== 'object') {
    obj[key] = {}
  }
}
export default Validator

/*

// 第四个版本
export default function validate(data, rules) {
  let errors = {}
  rules.forEach((rule) => {
    let value = data[rule.key]
    if(rule.required) {
      let error = validate.required(value)
      if (error) {
        ensureObject(errors,rule.key)
        errors[rule.key].required = error
      }
    }

    // 把required和key两个过滤掉
    let validators = Object.keys(rule).filter(key => key !=='key' && key !=='required')
    console.log(validators)

    // 遍历validators并调用对应的函数
    validators.forEach((validatorKey) => {
      // validatorKey is pattern / minLength / maxLength...
      if(validate[validatorKey]) {
        let error = validate[validatorKey] && validate[validatorKey](value, rule[validatorKey])
        if (error) {
          ensureObject(errors,rule.key)
          errors[rule.key][validatorKey] = error
        }
      }

      else {
        throw `不存在的校验器:${validatorKey}`
      }
    })
  })
  console.log(errors)
  return errors
}

validate.required = (value) => {
  if(value !== 0 && !value) {
    return '必填'
  }
}

validate.pattern = (value, pattern) => {
  if(pattern === 'email') {
    pattern = /^.+@.+$/
  }
  if (pattern.test(value) === false) {
    return '格式不正确'
  }
}

validate.minLength = (value, minLength) => {
  if(value.length < minLength) {
    return '太短'
  }
}

validate.maxLength = (value, maxLength) => {
  if(value.length > maxLength) {
    return '太长'
  }
}

function ensureObject(obj, key) {
  if(typeof obj[key] !== 'object') {
    obj[key] = {}
  }
}*/

/*
// 第三个版本，不够精简
export default function validate(data, rules) {
  let errors = {}
  rules.forEach((rule) => {
    let value = data[rule.key]
    if(rule.required) {
      if(value !== 0 && !value) {
        errors[rule.key] = {required: '必填'}
        return
      }
    }
    if (rule.pattern) {
      if(rule.pattern === 'email') {
        rule.pattern = /^.+@.+$/
      }
      if (rule.pattern.test(value) === false) {
        ensureObject(errors,rule.key)
        errors[rule.key].pattern = '格式不正确'
      }
    }
    if(rule.minLength) {
      if (value.length < rule.minLength) {
        ensureObject(errors,rule.key)
        errors[rule.key].minLength = '太短'
      }
    }
  })
  console.log(errors)
  return errors
}

function ensureObject(obj, key) {
  console.log(key)
  if(typeof obj[key] !== 'object') {
    obj[key] = {}
  }
}
*/

/*

// ① 表单验证 无法报两个错，errors对象会被第二次的赋值覆盖
export default function validate(data, rules) {
  let errors = {}
  rules.forEach((rule) => {
    let value = data[rule.key]
    if(rule.required) {
      if(value !== 0 && !value) {
        errors[rule.key] = {required: '必填'}
        return
      }
    }
    if (rule.pattern) {
      if(rule.pattern === 'email') {
        rule.pattern = /^.+@.+$/
      }
      if (rule.pattern.test(value) === false) {
        errors[rule.key] = {pattern: '格式不正确'}

      }
    }
    if(rule.minLength) {
      if (value.length < rule.minLength) {
        errors[rule.key] = {minLength: '太短'}
      }
    }
  })
  console.log(errors)
  return errors
}


*/

/* export default function validate(data, rules) {
  let errors = {}
  rules.forEach((rule) => {
    let value = data[rule.key]
    if(rule.required) {
      let error = validate.required(value)
      if (error) {
        ensureObject(errors,rule.key)
        errors[rule.key].required = error
      }
    }
    if (rule.pattern) {
      let error = validate.pattern(value, rule.pattern)
      if (error) {
        ensureObject(errors,rule.key)
        errors[rule.key].minLength = error
      }
    }
    if(rule.minLength) {
      let error = validate.minLength(value, rule.minLength)
      if (error) {
        ensureObject(errors,rule.key)
        errors[rule.key].minLength = error
      }
    }
    if(rule.maxLength) {
      let error = validate.maxLength(value, rule.maxLength)
      if (error) {
        ensureObject(errors,rule.key)
        errors[rule.key].maxLength = error
      }
    }
  })
  console.log(errors)
  return errors
}

validate.required = (value) => {
  if(value !== 0 && !value) {
    return '必填'
  }
}

validate.pattern = (value, pattern) => {
  if(pattern === 'email') {
    pattern = /^.+@.+$/
  }
  if (pattern.test(value) === false) {
    return '格式不正确'
  }
}

validate.minLength = (value, minLength) => {
  if(value.length < minLength) {
    return '太短'
  }
}

validate.maxLength = (value, maxLength) => {
  if(value.length > maxLength) {
    return '太长'
  }
}

function ensureObject(obj, key) {
  if(typeof obj[key] !== 'object') {
    obj[key] = {}
  }
}
*/

/*
// 第二个版本，不够精简
export default function validate(data, rules) {
  let errors = {}
  rules.forEach((rule) => {
    let value = data[rule.key]
    if(rule.required) {
      if(value !== 0 && !value) {
        errors[rule.key] = {required: '必填'}
        return
      }
    }
    if (rule.pattern) {
      if(rule.pattern === 'email') {
        rule.pattern = /^.+@.+$/
      }
      if (rule.pattern.test(value) === false) {
        ensureObject(errors,rule.key)
        errors[rule.key].pattern = '格式不正确'
      }
    }
    if(rule.minLength) {
      if (value.length < rule.minLength) {
        ensureObject(errors,rule.key)
        errors[rule.key].minLength = '太短'
      }
    }
  })
  console.log(errors)
  return errors
}

function ensureObject(obj, key) {
  console.log(key)
  if(typeof obj[key] !== 'object') {
    obj[key] = {}
  }
}
*/

/*

// ① 表单验证 无法报两个错，errors对象会被第二次的赋值覆盖
export default function validate(data, rules) {
  let errors = {}
  rules.forEach((rule) => {
    let value = data[rule.key]
    if(rule.required) {
      if(value !== 0 && !value) {
        errors[rule.key] = {required: '必填'}
        return
      }
    }
    if (rule.pattern) {
      if(rule.pattern === 'email') {
        rule.pattern = /^.+@.+$/
      }
      if (rule.pattern.test(value) === false) {
        errors[rule.key] = {pattern: '格式不正确'}

      }
    }
    if(rule.minLength) {
      if (value.length < rule.minLength) {
        errors[rule.key] = {minLength: '太短'}
      }
    }
  })
  console.log(errors)
  return errors
}


*/
