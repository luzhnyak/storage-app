import React from "react";
import { Button, Flex } from "antd";
import { useDispatch } from "react-redux";
import { addOrder } from "../../redux/orders/operations";
import { IOrder } from "../../types";
import { AppDispatch } from "../../redux/store";

const OrdersTools: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // const newOrder: IOrder = {
  //   date_added: 0,
  //   date_modified: 0,
  //   user_id: 1,
  //   contragent_id: 1,
  //   comment: "",
  // };

  const handleClickNew = () => {
    dispatch(addOrder());
  };

  return (
    <Flex wrap="wrap" gap="small" className="site-button-ghost-wrapper">
      <Button type="primary" ghost onClick={handleClickNew}>
        New
      </Button>
      <Button type="primary" ghost>
        Delete
      </Button>
    </Flex>
  );
};

export default OrdersTools;
