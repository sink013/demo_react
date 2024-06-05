import React from "react";
import { Dropdown, Space } from "antd";
import { useSelector } from "react-redux";

const Logout = () => {
  const { user_info } = useSelector((state) => state.userData);
  return (
    <div>
      <Dropdown
        menu={{
          items: [],
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
