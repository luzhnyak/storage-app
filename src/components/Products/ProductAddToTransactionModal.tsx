import { Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { selectProduct } from "../../redux/products/selectors";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentTransaction } from "../../redux/transactions/selectors";
import type { AppDispatch } from "../../redux/store";
import type { ITransactionProduct } from "../../types/types";
import { addTransactionProduct } from "../../redux/transactions/operations";

interface IProductAddModalProps {
  isModalAddShow: boolean;
  setIsModalAddShow: (a: boolean) => void;
}

const ProductAddToTransactionModal: React.FC<IProductAddModalProps> = ({
  isModalAddShow,
  setIsModalAddShow,
}) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const currentProduct = useSelector(selectProduct);
  const currentTransaction = useSelector(selectCurrentTransaction);

  useEffect(() => {
    const addProduct = currentTransaction?.transaction_products?.find(
      (product) => product.productId === currentProduct?.id
    );

    setQuantity(addProduct ? addProduct.quantity : 1);
  }, [currentProduct, currentTransaction, isModalAddShow]);

  // const showModal = () => {
  //   setIsModalEditShow(true);
  // };

  const handleOk = () => {
    addProductToTransaction();
    setIsModalAddShow(false);
  };

  const handleCancel = () => {
    setQuantity(1);
    setIsModalAddShow(false);
  };

  const addProductToTransaction = async () => {
    if (!currentTransaction || !currentProduct) return;

    const newTransactionProduct: Omit<ITransactionProduct, "id" | "name"> = {
      transactionId: currentTransaction.id,
      productId: currentProduct.id,
      quantity: quantity,
      price: currentProduct.price,
    };

    await dispatch(addTransactionProduct(newTransactionProduct));
  };

  return (
    <Modal
      title="Add Product to transaction"
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

export default ProductAddToTransactionModal;
