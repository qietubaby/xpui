<template>
  <div>
    123
  </div>
</template>
<script>
// 表单验证
let data = {
  email: 'mmmmmm'
}
// let rules = [
//   {
//     key: 'email',pattern: /^.+@.+$/,required: true
//   }
// ]
// let rules = [
//   {
//     key: 'email',pattern: 'email',required: true
//   }
// ]
// let rules = [
//   {
//     required: true, key: 'email', pattern: 'email', minLength: 6, maxLength: 8,
//     hasLowerCaseAndUpperCase: true, hasDot: true, hasUnderscore: true,hasFrank: true
//   }
// ]
let rules = [
  {
    required: true, key: 'email', pattern: 'email', minLength: 6, maxLength: 8,hasNumber:true
  }
]
import Validator from '@/libs/validate'
let validator = new Validator()

// 自定义规则 1
// validator.hasNumber = (value) => {
//   if(!/\d/.test(value)) {
//     return '必须含有数字'
//   }
// }
// 自定义规则
console.log(validator)
Validator.add('hasNumber',function(value) {
  if(!/\d/.test(value)) {
    return '必须含有数字'
  }
})
validator.validate(data, rules)
export default {}
</script>
<style>
</style>

