import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../utils/request";
import {
  Button,
  Form,
  Input,
  Modal,
  Space,
  Switch,
  Table,
  Tag,
  message,
} from "antd";
import UploadInput from "../components/UploadInput";
import qs from "qs";
const defaultData = {
  logistics: ["1"],
  freight: 2,
  store_name: "test1",
  cate_id: [3],
  unit_name: "123",
  image: "",
  slider_image: [
    "http://62.234.30.177/uploads/attach/2024/06/20240607/5183af744a126e59e1e0750c56d2e007.jpg",
  ],
  is_show: 1,
  id: 0,
  attrs: [
    {
      pic: "http://62.234.30.177/uploads/attach/2024/06/20240607/5183af744a126e59e1e0750c56d2e007.jpg",
      price: 0,
      cost: 0,
      ot_price: 0,
      stock: 0,
      bar_code: "",
      weight: 0,
      volume: 0,
      brokerage: 0,
      brokerage_two: 0,
      vip_price: 0,
      virtual_list: [],
      coupon_id: 0,
    },
  ],
  items: [],
  activity: ["默认", "秒杀", "砍价", "拼团"],
  couponName: [],
  header: [],
  min_qty: 1,
  type: 0,
  is_copy: 0,
};

const ProductList = () => {
  const [id, setId] = useState(0);
  const [data, setData] = useState([]);
  const [formData] = Form.useForm();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const { search } = useLocation();
  const { page, pageSize } = useMemo(() => {
    let page = 1,
      pageSize = 10;
    if (search) {
      let obj = qs.parse(search.substring(1));
      page = obj.page;
      pageSize = obj.pageSize;
    }
    return { page, pageSize };
  }, [search]);
  useEffect(() => {
    getData();
  }, [page, pageSize]);
  const getData = () => {
    axios({
      method: "GET",
      url: "http://62.234.30.177/adminapi/product/product",
      params: {
        store_name: "",
        type: 1,
        cate_id: "",
        limit: pageSize,
        page: page,
      },
    })
      .then((res) => {
        // console.log(res.data);
        if (res.status === 200) {
          setTotal(res.data.count);
          setData(res.data.list);
        }
      })
      .catch((err) => console.log(err));
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "图片",
      dataIndex: "image",
      key: "image",
      render: (text) => <img src={text} alt="" width={60} height={60} />,
    },
    {
      title: "名称",
      dataIndex: "store_name",
      key: "store_name",
    },
    {
      title: "状态",
      dataIndex: "is_show",
      key: "is_show",
      render: (text, record) => <Switch defaultChecked={text === 1} />,
    },
    {
      title: "操作",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Button
            size="small"
            type="primary"
            onClick={() => {
              console.log(record);
              setId(record.id);
              setModalOpen(true);
              formData.setFieldsValue(record);
            }}
          >
            编辑
          </Button>
          <Button size="small">删除</Button>
        </Space>
      ),
    },
  ];
  const onFinish = (values) => {
    // http://62.234.30.177/adminapi/product/product/0
    // console.log(values);
    let newData = { ...defaultData, ...values };
    axios({
      method: "POST",
      url: `http://62.234.30.177/adminapi/product/product/${id}`,
      data: newData,
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          getData();
        }
      })
      .catch((err) => console.log(err));
  };
  const onCancel = () => {
    formData.setFieldsValue();
    setModalOpen(false);
  };
  const onOk = () => {
    formData.submit();
    onCancel();
  };
  return (
    <div>
      <div style={{ margin: "20px auto" }}>
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
            axios({
              method: "PUT",
              url: "http://62.234.30.177/adminapi/product/product/product_unshow",
              data: { ids: selectedRowKeys },
            })
              .then((res) => {
                console.log(res);
                if (res.status === 200) {
                  getData();
                  message.success("下架成功");
                }
              })
              .catch((err) => console.log(err));
          }}
        >
          批量下架
        </Button>
      </div>
      <div>
        {selectedRows.map((v, i) => (
          <Tag
            key={v.id}
            closable
            onClose={(e) => {
              e.preventDefault();
              let index = i;
              let rows = [...selectedRows];
              let rowKeys = [...selectedRowKeys];
              rows.splice(index, 1);
              rowKeys.splice(index, 1);
              setSelectedRows(rows);
              setSelectedRowKeys(rowKeys);
            }}
          >
            {v.store_name}
          </Tag>
        ))}
      </div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={"id"}
        rowSelection={{
          getCheckboxProps: (record) => {
            return {
              disabled:
                !selectedRowKeys.includes(record.id) &&
                selectedRowKeys.length > 2,
            };
          },
          selectedRowKeys: selectedRowKeys,
          onChange: (selectedRowKeys, selectedRows) => {
            // console.log(selectedRowKeys, selectedRows);
            if (selectedRowKeys.length > 2) {
              selectedRows = selectedRows.slice(0, 3);
              selectedRowKeys = selectedRows.slice(0, 3);
            }
            setSelectedRows(selectedRows);
            setSelectedRowKeys(selectedRowKeys);
          },
        }}
        pagination={{
          showTotal: (total) => `总条数${total}`,
          showQuickJumper: true,
          pageSizeOptions: [5, 10, 15, 20],
          current: +page,
          pageSize: +pageSize,
          total: total,
          onChange: (page, pageSize) => {
            console.log(page, pageSize);
            navigate({
              search: qs.stringify({ page, pageSize }),
            });
          },
        }}
      />
      <Modal
        open={modalOpen}
        okText="确认"
        cancelText="取消"
        onOk={onOk}
        onCancel={onCancel}
      >
        <Form form={formData} onFinish={onFinish}>
          <Form.Item label="store_name" name="store_name">
            <Input />
          </Form.Item>
          <Form.Item label="slider_image" name="slider_image">
            <UploadInput />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductList;

/* 
      <Button
        onClick={() => {
          //  navigate("/admin/product/add_product");
          //   navigate("/admin/product/add_product", {
          //     state: {
          //       title: "test",
          //     },
          //   });
          navigate({
            pathname: "/admin/product/add_product",
            search: qs.stringify({ title: "test" }),
          });
        }}
      >
        编辑
      </Button> */
