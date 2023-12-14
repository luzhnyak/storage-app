import React from "react";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import CategoriesTree from "../components/Categories/CategoriesTree";
import ProductTable from "../components/Products/ProductTable";

const CatalogPage = () => {
  return (
    <Layout hasSider>
      <Sider breakpoint="xs" width={300} color="white" theme="light">
        <CategoriesTree />
      </Sider>
      <Content>
        <ProductTable />
      </Content>
    </Layout>
  );
};

export default CatalogPage;
