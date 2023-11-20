import { Button, Form, Input, Modal, Select } from "antd";
import React, { useState } from "react";
import { selectProduct } from "../../redux/products/selectors";
import { useSelector } from "react-redux";
import TextArea from "antd/es/input/TextArea";
import { selectAllCategories } from "../../redux/categories/selectors";

interface IProductEditModalProps {
  isModalEditShow: boolean;
  setIsModalEditShow: (a: boolean) => void;
}

const ProductEditModal: React.FC<IProductEditModalProps> = ({
  isModalEditShow,
  setIsModalEditShow,
}) => {
  //   const [isModalOpen, setIsModalOpen] = useState(false);
  const currentProduct = useSelector(selectProduct);
  const categories = useSelector(selectAllCategories);

  console.log(categories);

  const showModal = () => {
    setIsModalEditShow(true);
  };

  const handleOk = () => {
    setIsModalEditShow(false);
  };

  const handleCancel = () => {
    setIsModalEditShow(false);
  };

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <Modal
      title="Edit Product"
      open={isModalEditShow}
      onOk={handleOk}
      onCancel={handleCancel}
      width={800}
    >
      <Form
        name="wrap"
        labelCol={{ flex: "110px" }}
        labelAlign="left"
        labelWrap
        wrapperCol={{ flex: 1 }}
        colon={false}
        style={{ maxWidth: 800 }}
        onFinish={onFinish}
        initialValues={currentProduct as any}
      >
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Category" name="category_id">
          <Select
            defaultValue="lucy"
            // style={{ width: 120 }}
            // onChange={handleChange}
            options={categories.map((category) => {
              return { value: category.id, label: category.name };
            })}
          />
        </Form.Item>
        <Form.Item label="SKU" name="sku">
          <Input />
        </Form.Item>
        <Form.Item label="Vendor" name="vendor">
          <Input />
        </Form.Item>

        <Form.Item label="Price" name="price">
          <Input />
        </Form.Item>
        <Form.Item label="Image" name="image">
          <TextArea style={{ height: 120, resize: "none" }} />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <TextArea style={{ height: 120, resize: "none" }} />
        </Form.Item>
        <Form.Item label=" ">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductEditModal;
