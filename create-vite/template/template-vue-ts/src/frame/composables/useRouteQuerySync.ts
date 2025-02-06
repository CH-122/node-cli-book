import { ref, watch } from 'vue';
import { useRoute, useRouter, type LocationQueryValue } from 'vue-router';
import { decode, encodeURI } from 'js-base64';

/** 路由query监听composable的选项 */
export type RouteQuerySyncOption<T extends Record<string, any> | Record<string, any>[], P = any> = {
  /** 指定要监听的url参数名称 */
  name: string;
  /** 初始数据 */
  initialData?: T;
  /** url的query参数变更后的处理 */
  onQueryChange?: (data?: T) => P;
};

/**
 * @name useRouteQuerySync
 * @description 转码&同步数据(对象或数组类型)到vue-router的路由query参数，监听该query参数的变更，触发onQueryChange回调函数
 * @template T 存储到query参数的数据类型
 * @template P 回调函数onQueryChange的返回类型
 */
export const useRouteQuerySync = <T extends Record<string, any> | Record<string, any>[], P = any>(
  option: RouteQuerySyncOption<T, P>
) => {
  const route = useRoute();
  const router = useRouter();
  const queryData = ref<T>();

  /** 从vue-router的某个query参数(route.query.xxx)中解析(base64解码)数据 */
  const getDataFromQuery = (param?: LocationQueryValue | LocationQueryValue[]) => {
    if (!param) return option.initialData;
    const val = Array.isArray(param) ? (param[0] ? param[0] : '') : param;
    if (!val) return option.initialData;
    // TODO: try catch json parse error
    return JSON.parse(decode(val)) as T;
  };

  watch(
    () => route.query[option.name],
    (val) => {
      // 同步route.query[option.name]数据到queryData
      queryData.value = getDataFromQuery(val);
      // 触发onQueryChange回调函数
      if (option.onQueryChange) option.onQueryChange(queryData.value);
    },
    { immediate: true }
  );

  const reload = () => {
    if (typeof option.onQueryChange === 'function') option.onQueryChange(queryData.value);
  };

  /**
   * @name generateQueryString
   * @description 将要同步的数据转码为路由query适用的字符串
   * @param {Partial<T>} data 要更新到url参数的数据
   * @param {boolean} replace 是否替换掉原url上的数据，默认不替换，而是合并(Object.assign)原url上的数据
   */
  const generateQueryString = (data: Partial<T>, replace = false) => {
    const finalData = queryData.value && !replace ? Object.assign({}, queryData.value, data) : data;
    return encodeURI(JSON.stringify(finalData));
  };

  /**
   * 更新数据到url参数，并跳转
   * @param {Partial<T>} data 要更新到url参数的数据
   * @param {boolean} replace 是否替换掉原url上的数据，默认不替换，而是合并(Object.assign)原url上的数据
   */
  const updateQueryDataToUrl = (data: Partial<T>, replace = false) => {
    router.push({
      name: route.name as string,
      query: Object.assign({}, route.query, { [option.name]: generateQueryString(data, replace) }),
    });
  };

  return { queryData, reload, updateQueryDataToUrl, getDataFromQuery, generateQueryString };
};
