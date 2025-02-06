import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { generateProjectRoutes } from '@/frame';
import { type LayoutRouteRecordData } from '@/frame/types';
import AdminLayout from '@/components/layouts/AdminLayout.vue';
import BaseLayout from '@/components/layouts/BaseLayout.vue';

export type LayoutRouteNames = 'admin' | 'base';
export type RouteRecordData = LayoutRouteRecordData<LayoutRouteNames>;

export const baseRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
  },
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_PATH),
  routes: generateProjectRoutes<LayoutRouteNames>({
    staticRoutes: baseRoutes,
    moduleRoutes: import.meta.glob('@/modules/**/*/route.ts', { eager: true }),
    layoutRoutesConfig: [
      { name: 'admin', component: AdminLayout },
      { name: 'base', component: BaseLayout },
    ],
  }),
});
