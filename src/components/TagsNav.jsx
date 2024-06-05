import React, { useEffect } from "react";
import { Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { deepRecursive } from "../utils/tools";
const TagsNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { menus } = useSelector((state) => state.userData);
  const tagsNav = useSelector((state) => state.tagsNav);
  useEffect(() => {
    let item = deepRecursive(menus, pathname).pop();
    // console.log(item);
    if (item) {
      dispatch({ type: "add_tag", payload: item });
    }
  }, [pathname, menus]);
  return (
    <div style={{ width: "100%", marginBottom: "20px" }}>
      {tagsNav.map((v, i) => (
        <Tag
          color={v.path === pathname ? "blue-inverse" : "default"}
          key={v.path}
          onClick={() => {
            navigate(v.path);
          }}
          closable={tagsNav.length > 1}
          onClose={(e) => {
            e.preventDefault();
            dispatch({ type: "del_tag", payload: i });
            if (tagsNav.length === 1) {
              navigate("/admin/index");
              return;
            }
            if (v.path === pathname) {
              let targetIndex = i - 1;
              if (targetIndex < 0) {
                targetIndex = i + 1;
              }
              navigate(tagsNav[targetIndex].path);
            }
          }}
        >
          {v.title}
        </Tag>
      ))}
    </div>
  );
};

export default TagsNav;
