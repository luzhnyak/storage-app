import { Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { selectProduct } from "../../redux/products/selectors";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentOrder } from "../../redux/orders/selectors";
import type { AppDispatch } from "../../redux/store";
import type { IOrderProduct } from "../../types/types";
import { addOrderProduct } from "../../redux/orders/operations";

interface IProductAddModalProps {
  isModalAddShow: boolean;
  setIsModalAddShow: (a: boolean) => void;
}

const ProductAddToOrderModal: React.FC<IProductAddModalProps> = ({
  isModalAddShow,
  setIsModalAddShow,
}) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const currentProduct = useSelector(selectProduct);
  const currentOrder = useSelector(selectCurrentOrder);

  useEffect(() => {
    const addProduct = currentOrder?.order_products?.find(
      (product) => product.product_id === currentProduct?.id
    );

    setQuantity(addProduct ? addProduct.quantity : 1);
  }, [currentProduct, currentOrder, isModalAddShow]);

  // const showModal = () => {
  //   setIsModalEditShow(true);
  // };

  const handleOk = () => {
    addProductToOrder();
    setIsModalAddShow(false);
  };

  const handleCancel = () => {
    setQuantity(1);
    setIsModalAddShow(false);
  };

  const addProductToOrder = async () => {
    if (!currentOrder || !currentProduct) return;

    const newOrderProduct: Omit<IOrderProduct, "id" | "name"> = {
      order_id: currentOrder.id,
      product_id: currentProduct.id,
      quantity: quantity,
      price: currentProduct.price,
    };

    await dispatch(addOrderProduct(newOrderProduct));
  };

  return (
    <Modal
      title="Add Product to order"
      open={isModalAddShow}
      onOk={handleOk}
      onCancel={handleCancel}
      width={300}
    >
      <Input
        value={quantity}
        onChange={(event) => setQuantity(Number(event.target.value))}
      />
    </Modal>
  );
};

export default ProductAddToOrderModal;
