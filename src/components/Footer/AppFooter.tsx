import { Footer } from "antd/es/layout/layout";
import { useSelector } from "react-redux";
import { selectCurrentTransaction } from "../../redux/transactions/selectors";

const AppFooter = () => {
  const selectedTransaction = useSelector(selectCurrentTransaction);

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
        <b>Transaction №</b>
        {selectedTransaction?.id}
      </span>
      <span>Suma: {selectedTransaction?.suma} грн.</span>
    </Footer>
  );
};

export default AppFooter;
