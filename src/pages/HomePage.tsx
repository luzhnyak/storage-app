import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

const HomePage = () => {
  return (
    <Layout hasSider>
      <Sider width={400} color="white" theme="light"></Sider>
      <Content>Home</Content>
    </Layout>
  );
};

export default HomePage;
