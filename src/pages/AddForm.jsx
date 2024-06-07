import { Button, Form, Switch, Input } from "antd";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import qs from "qs";
import UploadInput from "../components/UploadInput";
import SwitchInput from "../components/SwitchInput";

const AddForm = () => {
  const { search, hash, state } = useLocation();
  const [formData] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <div>
      <Form form={formData} onFinish={onFinish}>
        <Form.Item label="名" name="store_name">
          <Input />
        </Form.Item>
        <Form.Item name="is_show" initialValue={1}>
          <SwitchInput />
        </Form.Item>
        <Form.Item name="image">
          <UploadInput />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">提交</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddForm;
