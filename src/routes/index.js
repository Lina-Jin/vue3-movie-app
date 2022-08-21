//해당 index.js 파일은 페이지를 구성해주는 구성 파일
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './Home'  //확장자명 생략이 가능도록 webpack을 설정해놓았습니다.
import About from './About' 

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/about',
      component: About
    },
  ]
})