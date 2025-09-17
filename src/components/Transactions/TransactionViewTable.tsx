import { useDispatch, useSelector } from "react-redux";

import { Button, Popconfirm, Space, Table } from "antd";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";

import type { ColumnsType } from "antd/es/table";

import { selectCurrentTransaction } from "../../redux/transactions/selectors";
import {
  getTransactionById,
  removeTransactionProduct,
  updateTransactionProduct,
} from "../../redux/transactions/operations";
import type { AppDispatch } from "../../redux/store";
import { useState } from "react";
import DialogInput from "../Dialog/DialogInput";

interface DataType {
  key: string;
  id: number;
  name: string;
}

const TransactionViewTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [productId, setProductId] = useState<number | null>(null);

  const currentTransaction = useSelector(selectCurrentTransaction);

  const handleEdit = (productId: number) => {
    if (!currentTransaction) return;
    setProductId(productId);
    setIsShowEditModal(true);
  };

  const handleEditOk = async (quantity: string) => {
    if (!currentTransaction || !productId) return;

    await dispatch(
      updateTransactionProduct({
        transactionId: currentTransaction.id,
        productId: productId,
        quantity: Number(quantity),
      })
    );
  };

  const handleDelete = async (productId: number) => {
    if (!currentTransaction) return;

    await dispatch(
      removeTransactionProduct({
        transactionId: currentTransaction.id,
        productId: productId,
      })
    );

    // await dispatch(getTransactionById(currentTransaction.id));
  };

  const columns: ColumnsType<any> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Suma",
      dataIndex: "suma",
      key: "suma",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: DataType) => (
        <Space size="middle">
          <Popconfirm
            title="Delete the product"
            description="Are you sure to delete this product?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" icon={<CloseOutlined />} />
          </Popconfirm>

          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.id)}
          />
        </Space>
      ),
    },
  ];

  if (!currentTransaction?.transaction_products) return <>None</>;

  const dataSource = currentTransaction?.transaction_products.map(
    ({ productId, name, quantity, price }) => {
      return {
        key: productId,
        id: productId,
        name,
        quantity,
        price,
        suma: quantity * price,
      };
    }
  );

  return (
    <>
      <Table columns={columns} dataSource={dataSource} size="small" />
      <DialogInput
        title="Edit product"
        isShow={isShowEditModal}
        setIsShow={setIsShowEditModal}
        onOk={handleEditOk}
      />
    </>
  );
};

export default TransactionViewTable;
