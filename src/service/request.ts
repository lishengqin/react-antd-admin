import axios, { AxiosResponse } from 'axios';
import { LogoutClear } from "@/utils/LogoutClear"
import { message } from 'antd';
const Http = axios.create({
  baseURL: '/admin',
  timeout: 60000,
  headers: {
    Accept: 'application/vnd.datashare.v1+json',
  },
});
Http.interceptors.request.use(
  (config: any) => {
    const loginToken = localStorage.getItem('loginToken')
      ? localStorage.getItem('loginToken')
      : '';
    if (loginToken) {
      config.headers.Authorization = loginToken;
    } else {
      if (window.location.pathname !== "/login") {
        window.location.href = '/login';
        LogoutClear()
      }

    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
Http.interceptors.response.use(
  (res: AxiosResponse) => {
    const { code } = res.data;
    if (code === 21001) {
      message.error(res.data.msg || '服务器异常');
      window.location.href = '/login';
      LogoutClear()
    } else if (code !== 0) {
      message.error(res.data.msg || '服务器异常')
    } else {
      return res.data.data;
    }
  },
  (error) => {
    message.error('服务器异常')
    return Promise.reject(error);
  }
);
export default Http;
