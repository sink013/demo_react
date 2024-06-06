import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import qs from "qs";
const ProductList = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          navigate("/admin/product/add_product");
        }}
      >
        添加
      </Button>
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
      </Button>
      ProductList
    </div>
  );
};

export default ProductList;
