import React from "react";
// import logo from "./logo.svg";
import "./App.css";
// import AppMenu from "./AppBar/AppMenu";
import AppBar from "./AppBar/AppBar";
import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import CategoriesTree from "./Categories/CategoriesTree";
import ProductTable from "./Products/ProductTable";

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#7dbcea",
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#108ee9",
};

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  padding: "16px",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#7dbcea",
};

function App() {
  return (
    <Layout>
      <Header style={headerStyle}>
        <AppBar />
      </Header>
      <Layout hasSider>
        <Sider style={siderStyle} width={400} color="white" theme="light">
          <CategoriesTree />
        </Sider>
        <Content style={contentStyle}>
          <ProductTable />
        </Content>
      </Layout>
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>
  );
}

export default App;
