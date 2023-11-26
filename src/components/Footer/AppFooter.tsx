import { Footer } from "antd/es/layout/layout";
import { useSelector } from "react-redux";
import { selectOrder } from "../../redux/orders/selectors";

const AppFooter = () => {
  const selectedOrder = useSelector(selectOrder);

  return (
    <Footer
      style={{
        overflow: "auto",
        // height: "100px",
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <span>
        <b>Order №</b>
        {selectedOrder?.id}
      </span>
      <span>Date: {selectedOrder?.date_added}</span>
    </Footer>
  );
};

export default AppFooter;
