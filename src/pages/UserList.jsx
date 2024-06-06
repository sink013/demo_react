import React, { useState } from "react";
import { Button, Modal, Form, Input } from "antd";
const UserList = () => {
  const [formData] = Form.useForm();
  const [modalOpen, setModalOpen] = useState(false);
  const closeFn = () => {
    formData.resetFields(); //清空表单
    setModalOpen(false);
  };
  const onFinish = (values) => {
    console.log(values);
    // http://62.234.30.177/adminapi/user/user
    closeFn();
  };
  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        添加
      </Button>
      <Button
        onClick={() => {
          formData.setFieldsValue({
            real_name: "test",
            pwd: "123123",
            phone: "18005111111",
          });
          setModalOpen(true);
        }}
      >
        编辑
      </Button>
      <Modal
        open={modalOpen}
        okText="确认"
        cancelText="取消"
        onOk={() => {
          formData.submit();
        }}
        onCancel={closeFn}
      >
        <Form form={formData} onFinish={onFinish}>
          <Form.Item label="姓名" name="real_name">
            <Input />
          </Form.Item>
          <Form.Item label="手机号" name="phone">
            <Input />
          </Form.Item>
          <Form.Item label="密码" name="pwd">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserList;
