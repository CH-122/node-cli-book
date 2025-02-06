import { type RouteLocationRaw, useRouter, useRoute } from 'vue-router';
import { useRouteQuerySync } from './useRouteQuerySync.js';
import { type BreadCrumb } from '../types.js';

export const useBreadCrumbNavigation = (queryName = 'bc') => {
  const router = useRouter();
  const route = useRoute();
  const { queryData, generateQueryString } = useRouteQuerySync<BreadCrumb[]>({ name: queryName });

  /** 跳转到某个面包屑对应的页面，如果不传routeName，则跳转面包屑数组最后一条 */
  const navByBreadCrumb = (routeName: string) => {
    if (queryData.value) {
      const target = queryData.value.find((item) => item.name === routeName);
      if (target) {
        if (queryData.value.length === 1) {
          router.replace(target);
        } else {
          const remainBreadCrumbs = [...queryData.value];
          remainBreadCrumbs.pop();
          const breadCrumbsQueryObj = { [queryName]: generateQueryString(remainBreadCrumbs) };
          target.query ? Object.assign(target.query, breadCrumbsQueryObj) : (target.query = breadCrumbsQueryObj);
          router.replace(target);
        }
      } else {
        console.error(`路由面包屑数据不包含名为${routeName}的面包屑数据`);
      }
    } else {
      console.error(`根据面包屑跳转失败：url中不存在面包屑字段${queryName}`);
    }
  };

  /** 根据面包屑name后退 */
  const navBackWithBreadCrumb = (routeName?: string, fallbackRoute: RouteLocationRaw = { path: '/' }) => {
    if (queryData.value) {
      if (routeName) {
        navByBreadCrumb(routeName);
      } else {
        // TODO 如果router.back()可用，优先调用router.back()
        // if (window.history.length > 1) {
        // }
        navByBreadCrumb(queryData.value[queryData.value.length - 1].name);
      }
    } else {
      router.push(fallbackRoute);
    }
  };

  /** 留下面包屑并跳转到新页面 */
  const navForwardWithBreadCrumb = (target: BreadCrumb) => {
    const newBreadCrumb: BreadCrumb = { name: route.name as string };
    if (route.params) newBreadCrumb.params = route.params;
    if (route.query) newBreadCrumb.query = Object.assign({}, route.query, { [queryName]: undefined });
    const newBreadCrumbs = queryData.value ? [...queryData.value, newBreadCrumb] : [newBreadCrumb];
    const breadCrumbsQueryObj = { [queryName]: generateQueryString(newBreadCrumbs) };
    target.query ? Object.assign(target.query, breadCrumbsQueryObj) : (target.query = breadCrumbsQueryObj);
    router.push(target);
  };

  return { queryData, navBackWithBreadCrumb, navForwardWithBreadCrumb };
};
