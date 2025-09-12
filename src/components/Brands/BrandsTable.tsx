import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { getAllBrands } from "../../redux/brands/operations";
import { selectAllBrands } from "../../redux/brands/selectors";
import { Table } from "antd";

const BrandTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const brands = useSelector(selectAllBrands);

  useEffect(() => {
    dispatch(getAllBrands());
  }, [dispatch]);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: "80px",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
  ];

  const dataSource = brands.map((brand) => {
    return {
      key: brand.id,
      id: brand.id,
      name: brand.name,
    };
  });

  return (
    <div>
      <Table columns={columns} dataSource={dataSource} size="small" />
    </div>
  );
};

export default BrandTable;
