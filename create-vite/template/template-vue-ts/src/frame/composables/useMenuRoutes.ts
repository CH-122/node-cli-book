import { type RouteRecordRaw, useRouter } from 'vue-router';
import { sortBy, get } from 'lodash-es';

/**
 * @name useMenuRoutes
 * @description 根据vue-router的路由表，获取菜单路由数组
 * @param {string} layoutRouteName  布局路由(根路由)的名称，菜单路由数组从该布局路由下获取
 * @param {function} customFilter 自定义的路由数组过滤方法，比如增加权限过滤等自定义过滤功能
 */
export const useMenuRoutes = (
  layoutRouteName: string,
  customFilter?: (routes: RouteRecordRaw[]) => RouteRecordRaw[]
) => {
  const router = useRouter();

  /** 获取菜单路由数组 */
  const getMenuRoutes = () => {
    const layoutRoute = router.getRoutes().find((route) => route.name === layoutRouteName);
    let result: RouteRecordRaw[] = [];
    if (layoutRoute && layoutRoute.children) {
      result = recursiveMenuRoutes(layoutRoute.children);
    }
    return result;
  };

  /** 递归获取菜单路由数组 */
  const recursiveMenuRoutes = (routes: RouteRecordRaw[]) => {
    let result: RouteRecordRaw[] = [];
    routes.forEach((route) => {
      if (route.meta && route.meta.menuConfig && !route.meta.menuConfig.hidden) {
        if (route.children && route.children.length > 0) {
          route.children = recursiveMenuRoutes(route.children);
        }
        result.push(route);
      }
    });
    if (typeof customFilter === 'function') {
      result = customFilter(result);
    }

    return sortBy(result, (item) => get(item, 'meta.menuConfig.order', 1000));
  };

  return { getMenuRoutes };
};
