import { Button, Form } from "antd";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import qs from "qs";
import Input from "../components/Input";
import CodeInput from "../components/CodeInput";
import CheckInput from "../components/CheckInput";
import RadioInput from "../components/RadioInput";
import DateInput from "../components/DateInput";
import SwitchInput from "../components/SwitchInput";
import UploadInput from "../components/UploadInput";

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
        {/* 多选 */}
        <Form.Item name="hobby" initialValue={["排球"]}>
          <CheckInput
            options={[
              { label: "排球", value: "排球" },
              { label: "游泳", value: "游泳" },
              { label: "足球", value: "足球" },
              { label: "爬山", value: "爬山" },
            ]}
          />
        </Form.Item>
        {/* 单选 */}
        <Form.Item name="sex">
          <RadioInput
            options={[
              { label: "男", value: "1" },
              { label: "女", value: "2" },
            ]}
          />
        </Form.Item>
        {/* 日期 */}
        <Form.Item name="time">
          <DateInput />
        </Form.Item>
        {/* Switch开关 */}
        <Form.Item name="status" initialValue={"0"}>
          <SwitchInput />
        </Form.Item>
        <Form.Item name="img">
          <UploadInput />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">提交</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductForm;
