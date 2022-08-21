module.exports = {
  env: {
    browser: true,           
    node: true
  },
  extends: [
    //vue
    //'plugin:vue/vue3-essential',  //Lv1
    'plugin:vue/vue3-strongly-recommended', //Lv2
    //'plugin:vue/vue3-recommended', //Lv3 가장 엄격
    //js
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    
  }
}
