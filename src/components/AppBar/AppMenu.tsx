import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import {
  HomeFilled,
  FolderFilled,
  TagsFilled,
  ThunderboltFilled,
} from "@ant-design/icons";

import type { MenuProps } from "antd";
import { Menu } from "antd";

const items: MenuProps["items"] = [
  {
    label: <NavLink to={"/"}>Home</NavLink>,
    key: "home",
    icon: <HomeFilled />,
  },
  {
    label: <NavLink to={"/catalog"}>Catalog</NavLink>,
    key: "catalog",
    icon: <FolderFilled />,
  },
  {
    label: <NavLink to={"/brands"}>Brands</NavLink>,
    key: "brands",
    icon: <TagsFilled />,
  },
  {
    label: <NavLink to={"/orders"}>Orders</NavLink>,
    key: "orders",
    icon: <ThunderboltFilled />,
  },
];

const AppMenu: React.FC = () => {
  const [current, setCurrent] = useState("mail");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default AppMenu;
