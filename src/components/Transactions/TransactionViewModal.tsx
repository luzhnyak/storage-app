import { Modal } from "antd";
import React from "react";
import { useSelector } from "react-redux";

import { selectCurrentTransaction } from "../../redux/transactions/selectors";
import TransactionViewTable from "./TransactionViewTable";

interface ITransactionViewModalProps {
  isModalViewShow: boolean;
  setIsModalViewShow: (a: boolean) => void;
}

const TransactionViewModal: React.FC<ITransactionViewModalProps> = ({
  isModalViewShow,
  setIsModalViewShow,
}) => {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const currentProduct = useSelector(selectProduct);
  const currentTransaction = useSelector(selectCurrentTransaction);

  // const showModal = () => {
  //   setIsModalViewShow(true);
  // };

  const handleOk = () => {
    setIsModalViewShow(false);
  };

  const handleCancel = () => {
    setIsModalViewShow(false);
  };

  // const onFinish = (values: any) => {
  //   console.log(values);
  // };

  return (
    <Modal
      title={`Transaction № ${currentTransaction?.id}`}
      open={isModalViewShow}
      onOk={handleOk}
      onCancel={handleCancel}
      width={800}
    >
      <TransactionViewTable />
    </Modal>
  );
};

export default TransactionViewModal;
