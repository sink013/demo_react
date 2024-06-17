import React from "react";
import { Upload, message } from "antd";
import Cookies from "js-cookie";

// 22.二次封装antd的upload组件，实现图片上传功能功能同时，限制上传图片只能是png并且小于200kb，并且在表单中使用时直接可以获取到图片上传地址而不是默认的file文件（5分）
const UploadImg = ({ value, onChange }) => {
  const beforeUpload = (file) => {
    const isPng = file.type === "image/png";
    if (!isPng) {
      message.error("上传图片只能是 PNG file!");
      return false;
    }
    const isLt2M = file.size / 1024 < 200;
    if (!isLt2M) {
      message.error("上传图片只能小于 200KB!");
      return false;
    }
    return true;
  };
  const handleChange = ({ file }) => {
    // console.log(file);
    if (file.status === "done") {
      onChange(file.response.data.src);
    }
  };

  return (
    <>
      <Upload
        listType="picture-card"
        showUploadList={false}
        action="/adminapi/file/upload"
        headers={{ "Authori-Zation": "Bearer " + Cookies.get("token") }}
        name="file"
        data={{ pid: "" }}
        onChange={handleChange}
        beforeUpload={beforeUpload}
      >
        {value ? <img src={value} width={90} height={90} alt="" /> : "上传"}
      </Upload>
    </>
  );
};

export default UploadImg;
