import { useDispatch, useSelector } from "react-redux";

import { Button, Popconfirm, Space, Table } from "antd";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";

import type { ColumnsType } from "antd/es/table";

import { selectCurrentOrder } from "../../redux/orders/selectors";
import {
  getOrderById,
  removeOrderProduct,
} from "../../redux/orders/operations";
import { AppDispatch } from "../../redux/store";

interface DataType {
  key: string;
  id: number;
  name: string;
}

const OrderViewTable = () => {
  const dispatch = useDispatch<AppDispatch>();

  const currentOrder = useSelector(selectCurrentOrder);

  const handleDelete = async (productId: number) => {
    if (!currentOrder) return;

    await dispatch(
      removeOrderProduct({ orderId: currentOrder.id, productId: productId })
    );

    // await dispatch(getOrderById(currentOrder.id));
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
            // onClick={}
          />
        </Space>
      ),
    },
  ];

  if (!currentOrder?.order_products) return <>None</>;

  const dataSource = currentOrder?.order_products.map(
    ({ product_id, name, quantity, price }) => {
      return {
        key: product_id,
        id: product_id,
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
    </>
  );
};

export default OrderViewTable;
