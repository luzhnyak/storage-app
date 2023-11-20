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

import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import { setCurrentProduct } from "../../redux/products/slice";
import ProductEditModal from "./ProductEditModal";

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

  useEffect(() => {
    dispatch(
      getAllProducts({ category_id: Number(currentCategory?.id), page: 0 })
    );
  }, [dispatch, currentCategory]);

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
            onClick={async () => {
              const product = await dispatch(
                getProductById(record.id)
              ).unwrap();
              dispatch(setCurrentProduct(product));
              setIsModalEditShow(true);
            }}
          />
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
