import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { Header } from "antd/es/layout/layout";

import AppBar from "./AppBar/AppBar";
import AppFooter from "./Footer/AppFooter";

export function SharedLayout() {
  return (
    <Layout>
      <Header style={{ padding: 0 }}>
        <AppBar />
      </Header>
      <Outlet />
      <AppFooter />
    </Layout>
  );
}
