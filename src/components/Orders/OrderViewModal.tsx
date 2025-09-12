import { Modal } from "antd";
import React from "react";
import { useSelector } from "react-redux";

import { selectCurrentOrder } from "../../redux/orders/selectors";
import OrderViewTable from "./OrderViewTable";

interface IOrderViewModalProps {
  isModalViewShow: boolean;
  setIsModalViewShow: (a: boolean) => void;
}

const OrderViewModal: React.FC<IOrderViewModalProps> = ({
  isModalViewShow,
  setIsModalViewShow,
}) => {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const currentProduct = useSelector(selectProduct);
  const currentOrder = useSelector(selectCurrentOrder);

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
      title={`Order № ${currentOrder?.id}`}
      open={isModalViewShow}
      onOk={handleOk}
      onCancel={handleCancel}
      width={800}
    >
      <OrderViewTable />
    </Modal>
  );
};

export default OrderViewModal;
