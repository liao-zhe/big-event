/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    // prettier专注于代码的美观度 (格式化工具)
    // 前置：
    // 1. 禁用格式化插件 prettier  format on save 关闭
    // 2. 安装Eslint插件, 并配置保存时自动修复
    'prettier/prettier': [
      'warn',
      {
        semi: false, // 无分号，
        singleQuote: true, // 单引号
        bracketSpacing: true, //在对象字面量的大括号里是否添加空格。,
        arrowParens: 'avoid', //箭头函数参数周围是否添加括号，当参数只有一个时可以省略括号
        trailingComma: 'none', // 不加对象|数组最后逗号
        endOfLine: 'auto', // 换行符号不限制（win mac 不一致）
        printWidth: 80, // 每行宽度至多80字符
        tabWidth: 2 //指定每个缩进级别的空格数。
      }
    ],
    // ESLint关注于规范, 如果不符合规范，报错
    'vue/multi-word-component-names': [
      'warn',
      {
        ignores: ['index'] // vue组件名称多单词组成（忽略index.vue）
      }
    ],
    'vue/no-setup-props-destructure': ['off'], // 关闭 props 解构的校验
    // 💡 添加未定义变量错误提示，create-vue@3.6.3 关闭，这里加上是为了支持下一个章节演示。
    'no-undef': 'error'
  },
  globals: {
    ElMessage: 'readonly',
    ElMessageBox: 'readonly',
    ElLoading: 'readonly'
  }
}
