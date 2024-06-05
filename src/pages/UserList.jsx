import React, { useState } from "react";
import { Button, Modal, Form, Input } from "antd";
const UserList = () => {
  const [formData] = Form.useForm();
  const [modalOpen, setModalOpen] = useState(false);
  const onFinish = (values) => {
    console.log(values);
    // http://62.234.30.177/adminapi/user/user
    setModalOpen(false);
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
      <Modal
        title="添加"
        open={modalOpen}
        okText="确认"
        cancelText="取消"
        onOk={() => {
          formData.submit();
        }}
        onCancel={() => {
          setModalOpen(false);
        }}
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
          <Form.Item label="确认密码" name="true_pwd">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserList;
