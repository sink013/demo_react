import React, { useEffect, useMemo, useState } from "react";
import { createFromIconfontCN } from "@ant-design/icons";
import { Menu } from "antd";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { deepRecursive } from "../utils/deepRecursive";
const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_4573692_s881b746ogp.js",
});

const recursiveMenu = (arr) => {
  let newArr = [];
  if (!Array.isArray(arr)) {
    return newArr;
  }
  arr.forEach((v) => {
    let item = {
      key: v.path,
      label: v.title,
    };
    if (v.icon) {
      item.icon = <IconFont type={v.icon} />;
    }
    if (v.children) {
      item.children = recursiveMenu(v.children);
    }
    newArr.push(item);
  });
  return newArr;
};

const LeftNav = () => {
  const [openKeys, setOpenKeys] = useState([]);
  const navigate = useNavigate();
  const { menus } = useSelector((state) => state.userData);
  const { pathname } = useLocation();
  let items = useMemo(() => {
    return recursiveMenu(menus);
  }, [menus]);
  useEffect(() => {
    let keysArr = deepRecursive(menus, pathname).map((v) => v.path);
    // console.log(keysArr);
    setOpenKeys(keysArr);
  }, [menus, pathname]);
  const onClick = (e) => {
    console.log(e.key);
    navigate(e.key);
  };
  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={[pathname]}
        theme="dark"
        mode="inline"
        items={items}
        openKeys={openKeys}
        onOpenChange={(keys) => {
          setOpenKeys(keys);
        }}
      />
    </>
  );
};

export default LeftNav;
