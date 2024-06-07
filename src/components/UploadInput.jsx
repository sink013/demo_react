import React from "react";
import { Upload, message } from "antd";
import Cookies from "js-cookie";
const UploadInput = ({ value, onChange }) => {
  const changeFn = ({ file }) => {
    if (file.status === "done") {
      console.log(file.response.data.src);
      onChange(file.response.data.src);
    }
  };
  const beforeUpload = (file) => {
    const isJpgOrPng =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/gif";
    if (!isJpgOrPng) {
      message.error("只能上传 JPG/PNG/GIF file!");
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("图片不能大于 2MB!");
      return false;
    }
    if (file.size > 1024 * 100) {
      return new Promise((resolve, reject) => {
        // 将得到的file转换成图片路径
        const url = URL.createObjectURL(file);
        // 创建img标签
        const img = document.createElement("img");
        img.onload = () => {
          // 创建canvas画布
          const canvas = document.createElement("canvas");
          // 创建画笔 画布操作对象
          const ctx = canvas.getContext("2d");
          // 画布设定 固定宽度 高度等比例生成
          canvas.width = 100;
          canvas.height = (img.height / img.width) * 100;
          // 将图片放到画布中
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          // 将画布转换为blob二进制对象
          canvas.toBlob((blob) => {
            // 将转换后的二进制文件上传
            resolve(blob);
          });
        };
        img.src = url;
      });
    }
    return true;
  };
  return (
    <>
      <Upload
        listType="picture-card"
        showUploadList={false}
        action="http://62.234.30.177/adminapi/file/upload"
        headers={{
          "Authori-Zation": "Bearer " + Cookies.get("token"),
        }}
        name="file"
        data={{ pid: "" }}
        onChange={changeFn}
        beforeUpload={beforeUpload}
      >
        {value ? (
          <img
            src={"http://62.234.30.177/" + value}
            alt=""
            style={{
              width: "90%",
              height: "90%",
            }}
          />
        ) : (
          <div>+上传</div>
        )}
      </Upload>
    </>
  );
};

export default UploadInput;

/* 
const [imageUrl, setImageUrl] = useState("");

const beforeUpload = (file) => {
    console.log(file);
    if (file.type === "image/jpeg" && file.type === "image/png") {
      message.error("Please select a picture to upload");
      return false;
    }
    if (file.size > 1024 * 1024 * 2) {
      message.error("The picture size can't be larger than 2M");
      return false;
    }
    if (file.size > 1024 * 1) {
      return new Promise((resolve, reject) => {
        // 将得到的file转换成图片路径
        const url = URL.createObjectURL(file);
        // 创建img标签
        const img = document.createElement("img");
        img.onload = () => {
          // 创建canvas画布
          const canvas = document.createElement("canvas");
          // 创建画笔 画布操作对象
          const ctx = canvas.getContext("2d");
          // 画布设定 固定宽度 高度等比例生成
          canvas.width = 100;
          canvas.height = (img.height / img.width) * 100;
          // 将图片放到画布中
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          // 将画布转换为blob二进制对象
          canvas.toBlob((blob) => {
            // 将转换后的二进制文件上传
            resolve(blob);
          });
        };
        img.src = url;
      });
    }
  };

const changeFn = ({ file }) => {
    if (file.status === "done") {
      console.log(file.response.data.src);
      message.success("Uploaded successfully");
      setImageUrl(file.response.data.src);
    }
  };

<Upload
        listType="picture-card"
        showUploadList={false}
        action="http://62.234.30.177/adminapi/file/upload"
        headers={{
          "Authori-Zation": "Bearer " + Cookies.get("token"),
        }}
        name="file"
        data={{ pid: "" }}
        onChange={changeFn}
        beforeUpload={beforeUpload}
      >
        {imageUrl ? (
          <img
            src={"http://62.234.30.177/" + imageUrl}
            alt=""
            style={{
              width: "100%",
            }}
          />
        ) : (
          <div>+上传</div>
        )}
      </Upload>


*/
