import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import {
  getAllProducts,
  getProductById,
  removeProduct,
} from "../../redux/products/operations";
import { selectAllProducts } from "../../redux/products/selectors";
import { Button, Popconfirm, Space, Table } from "antd";
import { selectCategory } from "../../redux/categories/selectors";
import type { IQueryProducts } from "../../types/types";
import type { ColumnsType } from "antd/es/table";

import {
  CloseOutlined,
  EyeOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import ProductEditModal from "./ProductEditModal";

import { selectCurrentOrder } from "../../redux/orders/selectors";
import ProductAddToOrderModal from "./ProductAddToOrderModal";

interface DataType {
  key: string;
  id: number;
  name: string;
  price: number;
}

const ProductTable = () => {
  const [isModalEditShow, setIsModalEditShow] = useState(false);
  const [isModalAddShow, setIsModalAddShow] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectAllProducts);

  const currentCategory = useSelector(selectCategory);
  const currentOrder = useSelector(selectCurrentOrder);

  useEffect(() => {
    if (!currentCategory) return;

    const newQuery: IQueryProducts = {
      page: 0,
      categoryId: currentCategory.id,
    };

    dispatch(getAllProducts(newQuery));
  }, [dispatch, currentCategory]);

  const handleClickEdit = async (id: number) => {
    await dispatch(getProductById(id));

    setIsModalEditShow(true);
  };

  const handleClickAdd = async (id: number) => {
    await dispatch(getProductById(id));
    // dispatch(setCurrentProduct(product));
    setIsModalAddShow(true);
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
            //   setIsModalAddShow(true);
            // }}
          />
          {currentOrder && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => handleClickAdd(record.id)}
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
      <ProductAddToOrderModal
        isModalAddShow={isModalAddShow}
        setIsModalAddShow={setIsModalAddShow}
      />
    </>
  );
};

export default ProductTable;
