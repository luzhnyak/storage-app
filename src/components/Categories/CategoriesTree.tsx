import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../redux/categories/operations";
import { selectAllCategories } from "../../redux/categories/selectors";
import { AppDispatch } from "../../redux/store";
import { Tree, TreeProps } from "antd";
import { DownOutlined } from "@ant-design/icons";
// import { DataNode } from "antd/es/tree";
import { ICategory } from "../../types";

const treeData = (items: ICategory[]) => {
  return [
    {
      title: "Categories",
      key: "0-0",
      children: items.map((item) => {
        return {
          title: item.name,
          key: item.id,
        };
      }),
    },
  ];
};

const CategoriesTree = () => {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(selectAllCategories);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const onSelect: TreeProps["onSelect"] = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };

  const onCheck: TreeProps["onCheck"] = (checkedKeys, info) => {
    console.log("onCheck", checkedKeys, info);
  };

  return (
    <div>
      <Tree
        showLine
        switcherIcon={<DownOutlined />}
        defaultExpandedKeys={["0-0", "0-1"]}
        //   defaultSelectedKeys={["0-0-0", "0-0-1"]}
        //   defaultCheckedKeys={["0-0-0", "0-0-1"]}
        onSelect={onSelect}
        onCheck={onCheck}
        treeData={treeData(categories)}
      />
    </div>
  );
};

export default CategoriesTree;
