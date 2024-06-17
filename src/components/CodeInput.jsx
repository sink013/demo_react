import { Input } from "antd";
import React, { useState, forwardRef, useImperativeHandle } from "react";

// 9.验证码组件手动封装，可以通过手动点击更新，同时需要将组件内的更新方法暴露给父级，让父级也可以通过调用该方法实现验证码更新。（5分）
const CodeInput = (props, ref) => {
  const [url, setUrl] = useState("");
  const updateCode = () => {
    setUrl(Date.now());
  };
  useImperativeHandle(ref, () => {
    return {
      updateCode,
    };
  });
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Input
        value={props.value}
        onChange={(e) => {
          props.onChange(e.target.value);
        }}
      />
      <img
        src={
          "http://vueshop.glbuys.com/api/vcode/chkcode?token=1ec949a15fb709370f&random=1718584728048" +
          url
        }
        alt=""
        onClick={updateCode}
      />
    </div>
  );
};

export default forwardRef(CodeInput);
