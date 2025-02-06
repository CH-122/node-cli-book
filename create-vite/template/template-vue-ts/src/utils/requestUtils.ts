import Axios, { AxiosError } from 'axios';
import { setDefaultRequestWrapperOption, ContentTypeEnum } from '@itshixun/qst-request-lib';
import { ElMessage } from 'element-plus';

export const axiosInstance = Axios.create({
  timeout: 6000000,
  // baseURL: import.meta.env.VITE_API_BASE_PATH,
  headers: {
    'Content-Type': ContentTypeEnum.JSON,
  },
});

/** 初始化@itshixun/qst-request-lib的默认请求配置 */
export const initQstRequest = () => {
  setDefaultRequestWrapperOption({
    handle401: (err: AxiosError) => {
      ElMessage.error(err.message);
    },
    handleMessage: (msg: string) => {
      ElMessage.error(msg);
    },
    axiosInstance,
  });
};

axiosInstance.interceptors.request.use(
  (config) => {
    // const token = useLocaliteStore().AccessToken;
    // if (token) config.headers['X-Access-Token'] = token;
    return config;
  },
  (err: AxiosError<unknown>) => {
    console.log('request rejected:', err);
    return Promise.reject(err);
  }
);
