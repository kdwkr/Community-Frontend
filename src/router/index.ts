import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Main from '../views/Main.vue';
import SignIn from '../views/SignIn.vue';
import SignUp from '../views/SignUp.vue';
import Board from '../views/Board.vue';
import ArticleWriter from '../views/article/Writer.vue';
import ArticleViewer from '../views/article/Viewer.vue';
import MyPage from '../views/MyPage.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Main',
    component: Main,
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/board/:boardId',
    name: 'Board',
    component: Board,
  },
  {
    path: '/articles/write',
    name: 'ArticleWriter',
    component: ArticleWriter,
  },
  {
    path: '/articles/:articleId',
    name: 'ArticleViewer',
    component: ArticleViewer,
  },
  {
    path: '/mypage',
    name: 'MyPage',
    component: MyPage,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
