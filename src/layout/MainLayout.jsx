import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import LeftMenu from "../components/LeftMenu";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, theme, Row, Col } from "antd";
import BreadBar from "../components/BreadBar";
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsedWidth, setCollapsedWidth] = useState(80);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  useEffect(() => {
    // 根据窗口变化改变侧边栏收起宽度
    const fn = () => {
      const width = window.innerWidth;
      //   console.log(width);
      if (width > 700) {
        setCollapsedWidth(80);
      } else {
        setCollapsedWidth(0);
      }
    };
    fn();
    window.onresize = fn;
  }, []);
  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth={collapsedWidth}
      >
        <div className="demo-logo-vertical" />
        <LeftMenu />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Row style={{ display: "flex", alignItems: "center" }}>
            <Col span={3}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
            </Col>
            <Col span={18}>
              <BreadBar />
            </Col>
          </Row>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
