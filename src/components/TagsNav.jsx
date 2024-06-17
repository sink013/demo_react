import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { deepRecursive } from "../utils/deepRecursive";
import { Tag } from "antd";

const TagsNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { menus } = useSelector((state) => state.userData);
  const tagsNav = useSelector((state) => state.tagsNav);
  const { pathname } = useLocation();
  useEffect(() => {
    let tag = deepRecursive(menus, pathname).pop();
    if (tag) {
      dispatch({ type: "addTag", payload: tag });
    }
  }, [menus, pathname]);
  return (
    <>
      {tagsNav.map((v, i) => (
        <Tag
          color={v.path === pathname ? "blue-inverse" : "default"}
          key={v.path}
          closable
          onClose={(e) => {
            e.preventDefault();
             if (tagsNav.length === 1) {
              console.log(tagsNav.length);
              navigate("/admin/index");
            }
            dispatch({ type: "delete", payload: i });
           
            if (v.path === pathname) {
              let targetIndex = i - 1;
              if (targetIndex < 0) {
                targetIndex = 0;
              }
              navigate(tagsNav[targetIndex].path);
            }
          }}
        >
          {v.title}
        </Tag>
      ))}
    </>
  );
};

export default TagsNav;
