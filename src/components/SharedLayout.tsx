import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { Footer, Header } from "antd/es/layout/layout";

import AppBar from "./AppBar/AppBar";

export function SharedLayout() {
  return (
    <Layout>
      <Header style={{ padding: 0 }}>
        <AppBar />
      </Header>
      <Outlet />
      <Footer>Footer</Footer>
    </Layout>
  );
}
