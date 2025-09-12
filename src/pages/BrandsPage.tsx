import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";

import BrandTable from "../components/Brands/BrandsTable";

const BrandsPage = () => {
  return (
    <Layout>
      <Content>
        <h1>Brands</h1>
        <BrandTable />
      </Content>
    </Layout>
  );
};

export default BrandsPage;
