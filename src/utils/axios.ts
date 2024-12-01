import { Toast } from "antd-mobile";
import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

instance.interceptors.request.use((config) => {
  return config;
});

instance.interceptors.response.use((response) => {
  if (response.data.code != 0) {
    Toast.show({
      content: response.data.msg,
    });
    return Promise.reject(response);
  }
  return response;
}, (error) => {
  return Promise.reject(error);
});

export default instance;
