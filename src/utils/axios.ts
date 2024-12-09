import { Toast } from 'antd-mobile';
import axios from 'axios';
import { authorizationValue, currentAddress } from './tools';

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL
});

instance.interceptors.request.use((config) => {
  const authorization = authorizationValue(currentAddress());
  if (authorization) {
    config.headers.Authorization = authorization;
  }

  return config;
});

instance.interceptors.response.use(
  (response) => {
    if (response.data.code != 0) {
      Toast.show({
        content: response.data.msg
      });
      return Promise.reject(response);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
