import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

const OrdersPage = () => {
  return (
    <Layout hasSider>
      <Sider width={400} color="white" theme="light"></Sider>
      <Content>Orders</Content>
    </Layout>
  );
};

export default OrdersPage;
