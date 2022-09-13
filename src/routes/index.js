//해당 index.js 파일은 페이지를 구성해주는 구성 파일
import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./Home";
import Movie from "./Movie"; //추가된 내용
import About from "./About";
import NotFound from './NotFound'


export default createRouter({
  history: createWebHashHistory(),
  scrollBehavior(){
    return { top: 0 }
  },
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/movie/:id", //추가된 내용
      component: Movie,
    },
    {
      path: "/about",
      component: About,
    },
    {
      path: '/:NotFound(.*)', //.* 모든 문자열 일치
      component: NotFound
    }
  ],
});
