import React, { useMemo } from "react";
import { Breadcrumb } from "antd";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { deepRecursive } from "../utils/deepRecursive";
// 根据当前地址栏中的路径实现动态面包屑。
const BreadNav = () => {
  const { menus } = useSelector((state) => state.userData);
  const { pathname } = useLocation();
  const items = useMemo(() => {
    return deepRecursive(menus, pathname).map((v) => {
      return { title: v.title };
    });
  }, [menus, pathname]);
  return (
    <>
      <Breadcrumb items={items} />
    </>
  );
};

export default BreadNav;
