import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import {
  getAllProducts,
  getProductById,
  removeProduct,
} from "../../redux/products/operations";
import { selectAllProducts } from "../../redux/products/selectors";
import { Button, Popconfirm, Space, Table } from "antd";
import { selectCategory } from "../../redux/categories/selectors";
import { IProduct } from "../../types";
import type { ColumnsType } from "antd/es/table";

import { CloseOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { setCurrentProduct } from "../../redux/products/slice";
import {
  getAllOrders,
  getOrderById,
  removeOrder,
} from "../../redux/orders/operations";
import { selectAllOrders } from "../../redux/orders/selectors";
import { setCurrentOrder } from "../../redux/orders/slice";
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

  const currentOrder = useSelector(selectCategory);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const handleClickView = async (id: number) => {
    const order = await dispatch(getOrderById(id)).unwrap();

    dispatch(setCurrentOrder(order));

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
      date_added: new Date(order.date_added).toLocaleString(),
      date_modified: new Date(order.date_modified).toLocaleString(),
      user_id: order.user_id,
      contragent_id: order.contragent_id,
      comment: order.comment,
    };
  });

  return (
    <>
      <Table columns={columns} dataSource={dataSource} size="small" />
      <OrderViewModal
        isModalViewShow={isModalViewShow}
        setIsModalViewShow={setIsModalViewShow}
      />
    </>
  );
};

export default OrdersTable;
