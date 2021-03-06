export default function validate(data, rules) {
  let errors = {}
  rules.forEach(rule => {
    let value = data[rule.key]
    if (rule.required) {
      let error = validate.required(value)
      if (error) {
        ensureObject(errors, rule.key)
        errors[rule.key].required = error
        return
      }
    }

    let validators = Object.keys(rule).filter(key => {
      return key !== 'key' && key !== 'required'
    })

    validators.forEach(validatorKey => {
      if (validate[validatorKey]) {
        let error =
          validate[validatorKey] &&
          validate[validatorKey](value, rule[validatorKey])
        if (error) {
          ensureObject(errors, rule.key)
          errors[rule.key][validatorKey] = error
        }
      } else {
        throw `不存在的校验器：${validatorKey}`
      }
    })

    // if (rule.pattern) {
    //   let error = validate.pattern(value, rule.pattern)
    //   if (error) {
    //     ensureObject(errors, rule.key)
    //     errors[rule.key].pattern = error
    //   }
    // }
    // if (rule.minLength) {
    //   let error = validate.minLength(value, rule.minLength)
    //   if (error) {
    //     ensureObject(errors, rule.key)
    //     errors[rule.key].minLength = error
    //   }
    // }
    // if (rule.maxLength) {
    //   let error = validate.maxLength(value, rule.maxLength)
    //   if (error) {
    //     ensureObject(errors, rule.key)
    //     errors[rule.key].maxLength = error
    //   }
    // }
  })
  return errors
}

validate.required = value => {
  if (value !== 0 && !value) {
    return '必填'
  }
}

validate.pattern = (value, pattern) => {
  if (pattern === 'email') {
    pattern = /^.+@.+$/
  }
  if (pattern.test(value) === false) {
    return '格式不正确'
  }
}

validate.minLength = (value, minLength) => {
  if (value.length < minLength) {
    return '太短'
  }
}

validate.maxLength = (value, maxLength) => {
  if (value.length > maxLength) {
    return '太长'
  }
}

function ensureObject(obj, key) {
  if (typeof obj[key] !== 'object') {
    obj[key] = {}
  }
}

// 可能包含用户乱写的规则，如果是这样，直接报错
// let demoRule = {
//   key: 'xxx',
//   required: true,
//   minLength: 5,
//   maxLength: 20,
//   hasFrank: true,
// }
// console.log(demoRule)
