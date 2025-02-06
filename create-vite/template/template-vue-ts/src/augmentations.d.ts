// https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
import 'vue-router';
import { type MenuConfig } from '@/frame/types';

export {};

/** augment RoutMeta interface. */
declare module 'vue-router' {
  /** 路由meta数据 */
  interface RouteMeta {
    /** 页面标题 */
    title: string;
    /** layout菜单通过遍历路由树的menuConfig来生成菜单树 */
    menuConfig?: MenuConfig;
    /** 项目名称，一般在登录路由中指定，用于登录页和Header显示项目标题 */
    projectName?: string;
    /** 当前路由是否不需要登录即可访问。默认路由需要登录，在路由拦截器判断如果当前没有登录，跳转到登录页，除非当前路由meta.isPublic设为true */
    isPublic?: boolean;
  }
}
