import Cookies from "js-cookie";
import React from "react";
import { Navigate } from "react-router-dom";

// 使用react hoc进行路由拦截功能实现，打开项目后默认重定向到首页面，如果路由拦截判定没有登录则跳转到登录页。
const withRoute = (Comp) => {
  return (props) => {
    const token = Cookies.get("token");
    if (!token) {
      return <Navigate to="/login" />;
    }
    return <Comp {...props} />;
  };
};

export default withRoute;
