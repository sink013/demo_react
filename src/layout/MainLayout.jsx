import React, { useState } from "react";
import withRoute from "../hoc/withRoute";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Col, Layout, Row, theme } from "antd";
import LeftNav from "../components/LeftNav";
import { Outlet } from "react-router-dom";
import BreadNav from "../components/BreadNav";
import TagsNav from "../components/TagsNav";
const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <LeftNav />
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
            <Col span={10}>
              <BreadNav />
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
          <Row style={{ marginBottom: 20 }}>
            <TagsNav />
          </Row>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default withRoute(MainLayout);
