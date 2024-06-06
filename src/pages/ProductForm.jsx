import { Button, Form } from "antd";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import qs from "qs";
import Input from "../components/Input";
import CodeInput from "../components/CodeInput";

const ProductForm = () => {
  const { search, hash, state } = useLocation();
  const [formData] = Form.useForm();
  //   useEffect(() => {
  //     // console.log(state);
  //     // let searchParams = qs.parse(search, { ignoreQueryPrefix: true });
  //     let searchParams = qs.parse(search.substring(1));
  //     if (searchParams) {
  //       formData.setFieldsValue(searchParams);
  //     }
  //   }, []);
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <div>
      ProductForm
      <Form form={formData} onFinish={onFinish}>
        {/* 只要Form.Item的子级，同时有设置name属性，那么子组件就会得到几个props的值 */}
        <Form.Item label="名" name="title">
          <Input />
        </Form.Item>
        <Form.Item name="code">
          <CodeInput />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">提交</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductForm;
