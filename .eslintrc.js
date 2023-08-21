module.exports = {
  plugins: ['jest'],
  env: {
   'jest/globals': true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['standard', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {},
}
