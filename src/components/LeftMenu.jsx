import React, { memo, useEffect, useMemo, useState } from "react";
import { Menu } from "antd";
import { useSelector } from "react-redux";
import { createFromIconfontCN } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { deepRecursive } from "../utils/tools";
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_4573692_s881b746ogp.js",
});

const recursiveFn = (menusArr) => {
  let newArr = [];
  if (!Array.isArray(menusArr)) {
    return newArr;
  }
  menusArr.forEach((v) => {
    let item = { key: v.path, label: v.title };
    if (v.icon) {
      item.icon = <IconFont type={v.icon} />;
    }
    if (v.children) {
      item.children = recursiveFn(v.children);
    }
    newArr.push(item);
  });
  return newArr;
};

const LeftMenu = () => {
  const [openKeys, setOpenKeys] = useState([]);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { menus } = useSelector((state) => state.userData);
  //   console.log(menus);
  const items = useMemo(() => {
    return recursiveFn(menus);
  }, [menus]);
  const onClick = (e) => {
    // console.log("click ", e);
    navigate(e.key);
  };
  useEffect(() => {
    const arr = deepRecursive(menus, pathname).map((v) => v.path);
    console.log(arr);
    setOpenKeys(arr);
  }, [menus, pathname]);
  return (
    <>
      <Menu
        onClick={onClick}
        theme="dark"
        mode="inline"
        selectedKeys={[pathname]}
        // defaultSelectedKeys={["/admin/index"]}
        openKeys={openKeys}
        items={items}
        onOpenChange={(keys) => {
          console.log(keys);
          setOpenKeys(keys);
        }}
      />
    </>
  );
};

export default memo(LeftMenu);
