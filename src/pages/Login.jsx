import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../utils/request";
import Cookies from "js-cookie";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginFn = () => {
    axios({
      method: "POST",
      data: { account: "admin", pwd: "admin123" },
      url: "http://62.234.30.177/adminapi/login",
    }).then((res) => {
      console.log(res);
      if (res.status === 200) {
        Cookies.set("token", res.data.token);
        dispatch({ type: "set_userData", payload: res.data });
        navigate("/admin/index");
      }
    });
  };
  return (
    <div>
      Login
      <button onClick={loginFn}>登录</button>
    </div>
  );
};

export default Login;
