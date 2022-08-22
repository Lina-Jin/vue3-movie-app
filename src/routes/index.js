//해당 index.js 파일은 페이지를 구성해주는 구성 파일
import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./Home";
import Movie from "./Movie"; //추가된 내용
import About from "./About";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/movie", //추가된 내용
      component: Movie,
    },
    {
      path: "/about",
      component: About,
    },
  ],
});
