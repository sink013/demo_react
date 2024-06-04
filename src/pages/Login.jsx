import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginFn = () => {
    axios({
      method: "POST",
      data: { account: "admin", pwd: "admin123" },
      url: "http://62.234.30.177/adminapi/login",
    }).then((res) => {
      if (res.data.status === 200) {
        dispatch({ type: "set_userData", payload: res.data.data });
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
