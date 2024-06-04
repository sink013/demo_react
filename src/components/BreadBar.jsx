import React, { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { deepRecursive } from "../utils/tools";
import { Breadcrumb } from "antd";

const BreadBar = () => {
  const { pathname } = useLocation();
  const { menus } = useSelector((state) => state.userData);
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

export default memo(BreadBar);
