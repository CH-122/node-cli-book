import { RouteRecordData } from '@/router';
import Home from './views/Home.vue';
import About from './views/About.vue';

const routeData: RouteRecordData = {
  admin: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        title: '首页',
        menuConfig: {
          iconClass: 'i-mdi-home',
          order: 0,
        },
      },
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: {
        title: '关于',
        menuConfig: {
          iconClass: 'i-mdi-information',
          order: 1,
        },
      },
    },
  ],
};

export default routeData;
