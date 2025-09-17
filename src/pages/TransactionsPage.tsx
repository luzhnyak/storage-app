import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
// import Sider from "antd/es/layout/Sider";
import TransactionsTable from "../components/Transactions/TransactionsTable";
import TransactionsTools from "../components/Transactions/TransactionsTools";

const TransactionsPage = () => {
  return (
    <Layout>
      <TransactionsTools />
      <Layout hasSider>
        <Content>
          <TransactionsTable />
        </Content>
      </Layout>
    </Layout>
  );
};

export default TransactionsPage;
