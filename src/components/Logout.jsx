import React from "react";
import { Dropdown, Space, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user_info } = useSelector((state) => state.userData);
  return (
    <div>
      <Dropdown
        menu={{
          items: [
            {
              label: "个人中心",
              key: 1,
            },
            {
              label: (
                <div
                  onClick={() => {
                    Modal.confirm({
                      title: "确认退出登录？",
                      okText: "确认",
                      cancelText: "取消",
                      onOk: () => {
                        // 清除redux的数据
                        dispatch({ type: "clear_userData" });
                        dispatch({ type: "clear_tags" });
                        // 清除token
                        Cookies.remove("token");
                        // 跳转登录页
                        navigate("/login");
                      },
                    });
                  }}
                >
                  退出登录
                </div>
              ),
              key: 2,
            },
          ],
        }}
      >
        <Space>
          <img
            width={30}
            src={user_info.head_pic}
            alt=""
            style={{ borderRadius: "50%" }}
          />
          {user_info.account}
        </Space>
      </Dropdown>
    </div>
  );
};

export default Logout;
