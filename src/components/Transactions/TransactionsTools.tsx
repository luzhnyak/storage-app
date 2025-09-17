import React from "react";
import { Button, Flex } from "antd";
import { useDispatch } from "react-redux";
import { addTransaction } from "../../redux/transactions/operations";
import type { AppDispatch } from "../../redux/store";

const TransactionsTools: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // const newTransaction: ITransaction = {
  //   date_added: 0,
  //   date_modified: 0,
  //   userId: 1,
  //   contragentId: 1,
  //   comment: "",
  // };

  const handleClickNew = () => {
    dispatch(addTransaction());
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

export default TransactionsTools;
