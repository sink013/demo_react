import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/request";
import { Button, message, Space, Table } from "antd";
const ProductList = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios({
      method: "GET",
      url: "http://62.234.30.177/adminapi/product/product",
      params: {
        store_name: "",
        type: 1,
        cate_id: "",
        limit: 15,
        page: 1,
      },
    })
      .then((res) => {
        // console.log(res.data);
        if (res.status === 200) {
          setData(res.data.list);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "图",
      dataIndex: "image",
      key: "image",
      render: (text) => <img src={text} alt="" width={80} height={80} />,
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
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ margin: "20px auto" }}>
        <Button
          type="primary"
          onClick={() => {
            navigate("/admin/product/add_product");
          }}
        >
          添加
        </Button>
      </div>
      <Table columns={columns} dataSource={data} rowKey={"id"} />
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
