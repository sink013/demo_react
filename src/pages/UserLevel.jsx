import React, { useState, useEffect } from "react";
import axios from "../utils/request";
import {
  Button,
  Switch,
  Table,
  Modal,
  Form,
  Input,
  message,
  Radio,
  Select,
} from "antd";
import LazyImg from "../components/LazyImg";
import UploadImg from "../components/UploadImg";
import store from "store";

const UserLevel = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isShow, setIsShow] = useState("");
  const [title, setTitle] = useState("");
  const [id, setId] = useState(0);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, seData] = useState([]);
  useEffect(() => {
    // 针对用户等级列表，增加全选和单选功能，勾选后的数据就算刷新也不丢失选中的状态
    let oldSelectedRowKeys = store.get("selectedRowKeys");
    if (oldSelectedRowKeys) {
      setSelectedRowKeys(oldSelectedRowKeys);
    }
  }, []);
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    axios({
      method: "GET",
      url: "/adminapi/user/user_level/vip_list",
      params: {
        is_show: isShow,
        title: title,
        page: 1,
        limit: 15,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          seData(res.data.list);
        }
      })
      .catch((err) => console.error(err));
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "图标",
      dataIndex: "icon",
      render: (text) => <LazyImg width={36} alt="" src={text} />,
    },
    {
      title: "背景图",
      dataIndex: "image",
      render: (text) => <LazyImg width={40} height={40} alt="" src={text} />,
    },
    {
      title: "名称",
      dataIndex: "name",
    },
    {
      title: "等级",
      dataIndex: "grade",
    },
    {
      title: "是否显示",
      dataIndex: "is_show",
      render: (text, record) => (
        <Switch
          defaultChecked={text === 1}
          onChange={() => {
            let temp = text === 1 ? 0 : 1;
            // 表单状态切换，实现点击修改，需要请求接口，提示修改成功或失败
            axios({
              method: "PUT",
              url: `/adminapi/user/user_level/set_show/${record.id}/${temp}`,
            })
              .then((res) => {
                if (res.status === 200) {
                  message.success(res.msg);
                  getData();
                } else {
                  message.error("修改失败");
                }
              })
              .catch((err) => console.log(err));
          }}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          onClick={() => {
            setIsModalOpen(true);
            setId(record.id);
            form.setFieldsValue(record);
          }}
        >
          编辑
        </Button>
      ),
    },
  ];
  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  const onFinish = (values) => {
    // http://62.234.30.177
    console.log(values);
    values.id = id;
    axios({
      method: "POST",
      url: "/adminapi/user/user_level.html",
      data: values,
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          message.success(res.msg);
          getData();
          handleCancel();
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div style={{ marginBottom: 20, display: "flex", alignItems: "center" }}>
        <span>等级状态</span>
        <Select
          style={{ width: 120 }}
          allowClear
          value={isShow}
          onChange={(val) => {
            setIsShow(val);
          }}
        >
          <Select.Option value={1}>显示</Select.Option>
          <Select.Option value={0}>不显示</Select.Option>
        </Select>
        <span style={{ marginLeft: 20 }}>等级名称</span>
        <Input
          style={{ width: "40%" }}
          allowClear
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <Button
          type="primary"
          onClick={() => {
            getData();
          }}
        >
          查询
        </Button>
      </div>
      <Table
        rowSelection={{
          selectedRowKeys: selectedRowKeys,
          onChange: (selectedRowKeys) => {
            setSelectedRowKeys(selectedRowKeys);
            store.set("selectedRowKeys", selectedRowKeys);
          },
        }}
        scroll={{ x: true }}
        rowKey={"id"}
        columns={columns}
        dataSource={data}
      />
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} onFinish={onFinish}>
          <Form.Item name="name" label="名称">
            <Input />
          </Form.Item>
          <Form.Item name="grade" label="等级">
            <Input />
          </Form.Item>
          <Form.Item name="exp_num" label="经验值">
            <Input />
          </Form.Item>
          <Form.Item name="icon" label="图标">
            <UploadImg />
          </Form.Item>
          <Form.Item name="image" label="背景图">
            <UploadImg />
          </Form.Item>
          <Form.Item name="is_show" label="是否显示">
            <Radio.Group>
              <Radio value={1}>显示</Radio>
              <Radio value={0}>隐藏</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UserLevel;
