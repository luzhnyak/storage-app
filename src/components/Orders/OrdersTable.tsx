import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";

import { Button, Popconfirm, Space, Table } from "antd";

import type { ColumnsType } from "antd/es/table";

import { CloseOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

import {
  getAllOrders,
  getOrderById,
  removeOrder,
} from "../../redux/orders/operations";
import {
  selectAllOrders,
  selectCurrentOrder,
} from "../../redux/orders/selectors";
// import { setCurrentOrder } from "../../redux/orders/slice";
import OrderViewModal from "./OrderViewModal";

interface DataType {
  key: string;
  id: number;
  name: string;
  price: number;
}

const OrdersTable = () => {
  const [isModalViewShow, setIsModalViewShow] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector(selectAllOrders);
  const currentOrder = useSelector(selectCurrentOrder);

  // const currentOrder = useSelector(selectCategory);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const handleClickView = async (id: number) => {
    await dispatch(getOrderById(id));

    // dispatch(setCurrentOrder(order));

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
      dataIndex: "user_id",
      key: "user_id",
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
            title="Delete the order"
            description="Are you sure to delete this order?"
            onConfirm={() => dispatch(removeOrder(record.id))}
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

  const dataSource = orders.map((order) => {
    return {
      key: order.id,
      id: order.id,
      date_added: new Date(order.createdAt).toLocaleString(),
      date_modified: new Date(order.updatedAt).toLocaleString(),
      user_id: order.user_id,
      suma: order.suma,
      contragent_id: order.contragent_id,
      comment: order.comment,
    };
  });

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      dispatch(getOrderById(selectedRows[0].id));
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
          defaultSelectedRowKeys: [currentOrder?.id || ""],
          ...rowSelection,
        }}
        columns={columns}
        dataSource={dataSource}
      />
      <OrderViewModal
        isModalViewShow={isModalViewShow}
        setIsModalViewShow={setIsModalViewShow}
      />
    </>
  );
};

export default OrdersTable;
