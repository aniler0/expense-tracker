import React, { useEffect, useState } from "react";
import { Form, Select, Button, Input, Modal, Table, Tag } from "antd";
import { Category, CategoryForm } from "../types/category";
import { addCategory, getCategories } from "../store/actions/categoryActions";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import { SketchPicker } from "react-color";

type Mode = "new" | "edit";

const emptyForm: CategoryForm = {
  name: "",
  type: "expense",
  color: "black",
};
const Categories = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mode, setMode] = useState<Mode>("edit");
  const [form, setForm] = useState<CategoryForm>(emptyForm);
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: AppState) => state.categories
  );
  console.log({ data, loading, error });
  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const showModal = (mode: Mode) => {
    setIsModalVisible(true);
    setMode(mode);
  };

  const handleOk = () => {
    //Mode değerine göre create or update action creator fonksiyonu çağır.
    dispatch(addCategory(form));
    setIsModalVisible(false);
    setMode("new");
    setForm(emptyForm);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setMode("new");
    setForm(emptyForm);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text: string, category: Category) => {
        return <Tag color={category.color}>{text.toUpperCase()}</Tag>;
      },
    },

    // {
    //   title: "Action",
    //   key: "action",
    //   render: (text, record) => (
    //     <Space size="middle">
    //       <a>Invite {record.name}</a>
    //       <a>Delete</a>
    //     </Space>
    //   ),
    // },
  ];

  return (
    <React.Fragment>
      <div>
        <Button type="primary" onClick={() => showModal("new")}>
          New Category
        </Button>

        <Modal
          title={mode === "new" ? "Create New Category" : "Update Category"}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{ disabled: !form.name }}
        >
          <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
            <Form.Item label="Category Name" required>
              <Input
                name="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="Category Type">
              <Select
                defaultValue="expense"
                onChange={(type) => setForm({ ...form, type })}
              >
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Color">
              <SketchPicker
                color={form.color}
                onChange={(color) => setForm({ ...form, color: color.hex })}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>

      <Table columns={columns} dataSource={data} />
    </React.Fragment>
  );
};

export default Categories;
