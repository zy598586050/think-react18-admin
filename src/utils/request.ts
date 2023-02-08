import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import config from "@/config";
import store from '@/store'
import { clearUserInfo } from '@/store/module/user'
import { message, Modal } from 'antd'
import storage from '@/utils/localStorage'

interface OptionsType {
  url: string;
  method?: string;
  params?: any;
  data?: any;
  mock?: boolean;
}

const service = axios.create({
  baseURL: config.baseUrl,
  timeout: 8000,
});

// 请求拦截
service.interceptors.request.use(
  (request) => {
    const headers = request?.headers;
    const locState = JSON.parse(storage.getItem('userInfo') || '{}')
    if (!headers.Authorization) {
      headers.Authorization = `Bearer ${locState?.token}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截
service.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  (error) => {
    if (error?.response?.data) {
      if (
        error?.response?.data?.errorCode === 30001 &&
        window.location.href.split("#")[1] !== "/login"
      ) {
        Modal.warning({
          title: 'Token已过期，请重新登录。',
          okText: '确定',
          onOk: () => {
            store.dispatch(clearUserInfo({}))
            location.replace('/login')
          }
        })
      } else {
        message.error(error?.response?.data?.msg);
      }
    }
    return Promise.reject(error);
  }
);

const request: any = (options: OptionsType) => {
  options.method = options?.method?.toLowerCase() || "get";
  // get应该用params传参，防止post写习惯了突然改get, data参数自动转params
  if (!options.params && options.method === "get") {
    options.params = options.data;
  }
  const isMock = options.mock || config.mock;
  if (config.env === "production") {
    service.defaults.baseURL = config.baseUrl;
  } else {
    service.defaults.baseURL = isMock ? config.mockUrl : config.baseUrl;
  }
  return service(options);
};

["get", "post", "put", "delete", "patch"].forEach((item: string) => {
  request[item] = (url: string, options: OptionsType) => {
    return request({
      method: item,
      ...options,
      url,
    });
  };
});

export default request;
