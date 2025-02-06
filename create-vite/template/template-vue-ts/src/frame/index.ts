import type { RouteRecordRaw, RouteRecordSingleViewWithChildren } from 'vue-router';
import type { LayoutRouteConfig, LayoutRouteName, LayoutRouteRecordData } from './types.js';

/**
 * @name generateProjectRoutes
 * @description 生成项目路由，将路由配置文件中的路由放到对应的布局框架父路由下，并最终生成RouteRecordRaw[]类型的完整项目路由表
 * @template 布局路由名称
 */
export const generateProjectRoutes = <T extends LayoutRouteName>({
  staticRoutes,
  moduleRoutes,
  layoutRoutesConfig,
}: {
  staticRoutes: RouteRecordRaw[];
  moduleRoutes: Record<string, { default: LayoutRouteRecordData<T> }>;
  layoutRoutesConfig: LayoutRouteConfig<T>[];
}): RouteRecordRaw[] => {
  const allRoutes: RouteRecordRaw[] = [...staticRoutes];

  const layoutRoutes = layoutRoutesConfig.map((item) => {
    const layoutRoute = {
      name: item.name,
      path: `/${item.name}`,
      /** 将layout作为参数传给布局组件 */
      props: { layout: item.name },
      component: item.component,
      children: [],
    } as RouteRecordSingleViewWithChildren;

    for (const path in moduleRoutes) {
      const targetChildRoutes = moduleRoutes[path].default[item.name];
      if (layoutRoute.children && targetChildRoutes) layoutRoute.children.push(...targetChildRoutes);
    }

    return layoutRoute;
  });
  allRoutes.push(...layoutRoutes);

  // 生成空白布局(以route命名的RouteRecord)
  for (const path in moduleRoutes) {
    const route = moduleRoutes[path].default['route'];
    if (route) allRoutes.push(...route);
  }

  return allRoutes;
};
