import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { getAllProducts } from "../../redux/products/operations";
import { selectAllProducts } from "../../redux/products/selectors";
import { Table } from "antd";

const ProductTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectAllProducts);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const columns = [
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
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
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
    <div>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default ProductTable;
