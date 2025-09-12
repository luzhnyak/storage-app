import { useState, type FC } from "react";
import { Input, Modal } from "antd";

interface IProps {
  title: string;
  isShow: boolean;
  setIsShow: (value: boolean) => void;
  onOk: (value: string) => void;
}

const DialogInput: FC<IProps> = ({ title, isShow, setIsShow, onOk }) => {
  const [value, setValue] = useState("");

  const handleOk = () => {
    onOk(value);
    setIsShow(false);
  };

  const handleCancel = () => {
    setIsShow(false);
  };

  return (
    <Modal
      title={title}
      open={isShow}
      onOk={handleOk}
      onCancel={handleCancel}
      width={300}
    >
      <Input value={value} onChange={(event) => setValue(event.target.value)} />
    </Modal>
  );
};

export default DialogInput;
