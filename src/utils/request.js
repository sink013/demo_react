import { message } from "antd";
import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  timeout: 5000,
});

//axios设置请求拦截器
instance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers["Authori-Zation"] = "Bearer " + token; //设置响应头
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

//axios设置响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 如果token失效或者手动修改后，请求提示token无效时，会重新跳登录页
    if (response.data.status === 110003) {
      message.error("token无效,2s后重新跳登录页");
      Cookies.remove("token");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    }
    return response.data; //拦截处理响应结果，直接返回需要的数据
  },
  (err) => {
    console.log(err);
    // code:  "ECONNABORTED"
    // message: "timeout of 1000ms exceeded"
    if (err.code === "ECONNABORTED" && err.message.includes("timeout")) {
      // let count = 3;
      
      // return err.config
    }
    return Promise.reject(err);
  }
);

export default instance;
