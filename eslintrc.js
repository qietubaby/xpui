module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    camelcase: 2, // 强制驼峰命名
    quotes: [2, 'single'], // 强制使用单引号
    eqeqeq: 'warn', // TODO: 后期强制
    'block-scoped-var': 2, // 不能使用块级作用域内定义的变量
    'array-bracket-spacing': [2, 'never'], // 指定数组的元素之间要以空格隔开
    // 'comma-dangle': [2, 'always-multiline'], // 数组、对象末尾逗号 // TODO: 和prettierrc有冲突，等待后续再放开
    'comma-spacing': [2, { before: false, after: true }], // 逗号前后的空格
    'comma-style': [2, 'last'], // 逗号在行尾
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    // 'newline-per-chained-call': [2, { 'ignoreChainWithDepth': 4 }], // 方法链换行配置，与prettier冲突
    'vue/attributes-order': [
      2,
      {
        // 属性顺序
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          ['UNIQUE', 'SLOT'],
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT',
        ],
        alphabetical: true,
      },
    ],
    'vue/no-unused-components': 2,
    'no-unused-vars': 2,
    'no-case-declarations': 0,
    'no-prototype-builtins': 0, // 直接使用 Object.prototypes 的内置属性
    'standard/no-callback-literal': 0,
    'no-throw-literal': 0,
    'no-mixed-operators': 0, // TODO: remove popper.js
    'node/no-deprecated-api': 0, // TODO: wtf
  },
}
