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
import { IOrderProduct, IQueryProducts } from "../../types/types";
import type { ColumnsType } from "antd/es/table";

import {
  CloseOutlined,
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { setCurrentProduct } from "../../redux/products/slice";
import ProductEditModal from "./ProductEditModal";
import { addOrderProduct } from "../../redux/orders/operations";
import { selectOrder } from "../../redux/orders/selectors";

interface DataType {
  key: string;
  id: number;
  name: string;
  price: number;
}

const ProductTable = () => {
  const [isModalEditShow, setIsModalEditShow] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectAllProducts);

  const currentCategory = useSelector(selectCategory);
  const currentOrder = useSelector(selectOrder);

  useEffect(() => {
    if (!currentCategory) return;

    const newQuery: IQueryProducts = {
      page: 0,
      category_id: currentCategory.id,
    };

    dispatch(getAllProducts(newQuery));
  }, [dispatch, currentCategory]);

  const handleClickEdit = async (id: number) => {
    const product = await dispatch(getProductById(id)).unwrap();
    dispatch(setCurrentProduct(product));
    setIsModalEditShow(true);
  };

  const handleClickAddToOrder = async (id: number) => {
    if (!currentOrder) return;

    const newOrderProduct: Omit<IOrderProduct, "id" | "name"> = {
      order_id: currentOrder.id,
      product_id: id,
      quantity: 1,
      price: 1,
    };

    const product = await dispatch(addOrderProduct(newOrderProduct)).unwrap();
    dispatch(setCurrentProduct(product));
  };

  const columns: ColumnsType<any> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: DataType) => (
        <Space size="middle">
          <Popconfirm
            title="Delete the product"
            description="Are you sure to delete this product?"
            onConfirm={() => dispatch(removeProduct(record.id))}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" icon={<CloseOutlined />} />
          </Popconfirm>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleClickEdit(record.id)}
          />
          <Button
            type="primary"
            icon={<EyeOutlined />}
            title="View"
            // onClick={() => {
            //   handleClickView(record.id);
            // }}
          />
          {!currentOrder && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => handleClickAddToOrder(record.id)}
            />
          )}
        </Space>
      ),
    },
  ];

  const dataSource = products.map((product) => {
    return {
      key: product.id,
      id: product.id,
      name: product.name,
      price: product.price,
    };
  });

  return (
    <>
      <Table columns={columns} dataSource={dataSource} size="small" />
      <ProductEditModal
        isModalEditShow={isModalEditShow}
        setIsModalEditShow={setIsModalEditShow}
      />
    </>
  );
};

export default ProductTable;
