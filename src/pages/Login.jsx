import { Button, Checkbox, Form, Input, message } from "antd";
import React, { useRef, useEffect } from "react";
import CodeInput from "../components/CodeInput";
import store from "store";
import axios from "../utils/request";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const codeRef = useRef();
  useEffect(() => {
    let user = store.get("user");
    if (user) {
      form.setFieldsValue(user);
    }
  }, []);
  const onFinish = (values) => {
    console.log("values:", values);
    // http://62.234.30.177
    axios({
      method: "POST",
      url: "/adminapi/login",
      data: values,
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          Cookies.set("token", res.data.token);
          dispatch({ type: "setUserData", payload: res.data });
          if (values.remember) {
            store.set(
              "user",
              {
                account: values.account,
                pwd: values.pwd,
              },
              { expired: 7 }
            );
          } else {
            store.remove("user");
          }
          navigate("/");
        } else {
          message.error(res.msg);
        }
        codeRef.current.updateCode();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div
        style={{
          width: "70%",
          height: "70%",
          position: "absolute",
          top: "50%",
          left: "50%",
          translate: "-50% -50%",
        }}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="account"
            rules={[
              {
                required: true,
                message: "请输入用户名",
              },
              //   同时用户名必须是字母或数字4-12位
              {
                pattern: /^[a-zA-Z0-9]{4,12}$/,
                message: "用户名必须是字母或数字4-12位",
              },
            ]}
          >
            <Input placeholder="用户名" />
          </Form.Item>

          <Form.Item
            name="pwd"
            rules={[
              {
                required: true,
                message: "请输入密码",
              },
              //  密码必须包括大小写字母和数字和特殊符号6-12位
              {
                pattern: /^(?=.[a-zA-Z]+).{6,12}$/,
                message: "密码必须包括大小写字母和数字和特殊符号6-12位",
              },
            ]}
          >
            <Input.Password placeholder="密码" />
          </Form.Item>

          <Form.Item name="captcha">
            <CodeInput ref={codeRef} />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>7天内记住用户名密码</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
