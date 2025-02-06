import { RouteRecordData } from '@/router';
import Base from './views/Base.vue';

const routeData: RouteRecordData = {
  base: [
    {
      path: '/index',
      name: 'index',
      component: Base,
      meta: {
        title: '基础页面框架',
      },
    },
  ],
};

export default routeData;
