/**
 * Frame level types
 */

import type { Component } from 'vue';
import type { RouteParamsRaw, LocationQueryRaw, RouteRecordRaw } from 'vue-router';

/** 面包屑数据结构 */
export interface BreadCrumb {
  /** vue-router的路由名称 */
  name: string;
  /** 显示到标题或面包屑上的名称，如果为空，一般使用route.meta.title */
  title?: string;
  /** vue-router 路由params参数 */
  params?: RouteParamsRaw;
  /** vue-router 路由query参数 */
  query?: LocationQueryRaw;
  /** 当前面包屑是否有对应的页面，一般用于面包屑判断是否可以点击跳转 */
  notPage?: boolean;
}

/** 通用的菜单配置数据结构 */
export interface MenuConfig {
  /** 菜单图标样式名称 */
  iconClass?: string;
  /** 菜单顺序号 */
  order?: number;
  /** 菜单scope，相同的layout显示不同的菜单时，使用scope来过滤菜单 */
  menuScope?: string;
  /** 不在菜单中显示  */
  hidden?: boolean;
  /** 指定要高亮的菜单对应的路由名称 */
  activeRouteName?: string;
  /** 菜单权限表达式 */
  perm?: string[];
  /** url链接新窗口打开 */
  linkUrl?: string;
}

/** 布局路由的名称类型，具体项目中通常为项目中所有布局名称的联合字面量类型，比如: 'base' | 'admin' | 'profile' */
export type LayoutRouteName = string;

/**
 * @name LayoutRouteConfig
 * @description 布局路由配置数据，用于生成基础的布局框架路由
 * @template T 布局路由名称，通常为项目中所有布局名称的联合字面量类型，比如: 'base' | 'admin' | 'profile'
 */
export type LayoutRouteConfig<T extends LayoutRouteName> = {
  /** 路由名称，同时会作为布局路由的路径 `/${name}` */
  name: T;
  /** 路由框架组件 */
  component: Component;
};

/**
 * @name LayoutRouteRecordData
 * @description 根据布局路由名称生成的布局路由数据类型，用户配置路由数据时，
 * 指定跟路由为某个具体的布局框架，如果不指定框架，则指定为'route',，比如以下该类型的路由配置结构：
 * {
 *   base: [{ path: '/home', name: 'home', component: Home }],
 *   profile: [{ path: '/personal', name: 'personal', component: Personal}],
 *   route: [{ path: '/login', name: 'login', component: Login }]
 * }
 * 分别指定了三个页面：home、personal、login的页面框架路由为base、profile、route，
 * 其中login页面设定为route，表示不适用任何页面框架
 * @template T 布局路由名称，通常为项目中所有布局名称的联合字面量类型，比如: 'base' | 'admin' | 'profile'
 */
export type LayoutRouteRecordData<T extends LayoutRouteName> = Partial<Record<T | 'route', RouteRecordRaw[]>>;
