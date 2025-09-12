import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
// import Sider from "antd/es/layout/Sider";
import OrdersTable from "../components/Orders/OrdersTable";
import OrdersTools from "../components/Orders/OrdersTools";

const OrdersPage = () => {
  return (
    <Layout>
      <OrdersTools />
      <Layout hasSider>
        <Content>
          <OrdersTable />
        </Content>
      </Layout>
    </Layout>
  );
};

export default OrdersPage;
