import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../redux/store";

import { Button, Popconfirm, Space, Table } from "antd";

import type { ColumnsType } from "antd/es/table";

import { CloseOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

import {
  getAllTransactions,
  getTransactionById,
  removeTransaction,
} from "../../redux/transactions/operations";
import {
  selectAllTransactions,
  selectCurrentTransaction,
} from "../../redux/transactions/selectors";
// import { setCurrentTransaction } from "../../redux/transactions/slice";
import TransactionViewModal from "./TransactionViewModal";

interface DataType {
  key: string;
  id: number;
  name: string;
  price: number;
}

const TransactionsTable = () => {
  const [isModalViewShow, setIsModalViewShow] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const transactions = useSelector(selectAllTransactions);
  const currentTransaction = useSelector(selectCurrentTransaction);

  // const currentTransaction = useSelector(selectCategory);

  useEffect(() => {
    dispatch(getAllTransactions());
  }, [dispatch]);

  const handleClickView = async (id: number) => {
    await dispatch(getTransactionById(id));

    // dispatch(setCurrentTransaction(transaction));

    setIsModalViewShow(true);
  };

  const columns: ColumnsType<any> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Date added",
      dataIndex: "date_added",
      key: "date_added",
    },
    {
      title: "Date modified",
      dataIndex: "date_modified",
      key: "date_modified",
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "User",
      dataIndex: "userId",
      key: "userId",
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
            title="Delete the transaction"
            description="Are you sure to delete this transaction?"
            onConfirm={() => dispatch(removeTransaction(record.id))}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" icon={<CloseOutlined />} />
          </Popconfirm>

          <Button
            type="primary"
            icon={<EditOutlined />}
            title="Edit"
            // onClick={}
          />
          <Button
            type="primary"
            icon={<EyeOutlined />}
            title="View"
            onClick={() => {
              handleClickView(record.id);
            }}
          />
        </Space>
      ),
    },
  ];

  const dataSource = transactions.map((transaction) => {
    return {
      key: transaction.id,
      id: transaction.id,
      date_added: new Date(transaction.createdAt).toLocaleString(),
      date_modified: new Date(transaction.updatedAt).toLocaleString(),
      userId: transaction.userId,
      suma: transaction.suma,
      contragentId: transaction.contragentId,
      comment: transaction.comment,
    };
  });

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      dispatch(getTransactionById(selectedRows[0].id));
    },
    // getCheckboxProps: (record: any) => ({
    //   disabled: record.name === "Disabled User", // Column configuration not to be checked
    //   name: record.id,
    // }),
  };

  return (
    <>
      <Table
        size="small"
        rowSelection={{
          type: "radio",
          defaultSelectedRowKeys: [currentTransaction?.id || ""],
          ...rowSelection,
        }}
        columns={columns}
        dataSource={dataSource}
      />
      <TransactionViewModal
        isModalViewShow={isModalViewShow}
        setIsModalViewShow={setIsModalViewShow}
      />
    </>
  );
};

export default TransactionsTable;
