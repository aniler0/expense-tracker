import React, { useEffect, useState } from "react";
import { Form, Select, Button, Input, Modal, Table, Tag, Space } from "antd";
import { SketchPicker } from "react-color";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Category, CategoryForm } from "../types/category";
import {
  addCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../store/actions/categoryActions";
import { AppState } from "../store";

type Mode = "new" | "edit" | "delete";

const emptyForm: CategoryForm = {
  name: "",
  type: "expense",
  color: "black",
};
const Categories = () => {
  const [isModalVisible, setIsModalVisible] = useState(false); //sets modal visible or invisible
  const [mode, setMode] = useState<Mode>("edit"); //sets mode to call the function which is same name with state
  const [form, setForm] = useState<CategoryForm>(emptyForm); //sets form
  const [updateId, setUpdateId] = useState<number | null>(null); //
  const [deleteId, setDeleteId] = useState<number | null>();
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state: AppState) => state.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const showModal = (mode: Mode) => {
    setIsModalVisible(true);
    setMode(mode);
  };

  const handleOk = () => {
    //Mode değerine göre create or update action creator fonksiyonu çağır.
    if (mode === "new") dispatch(addCategory(form));
    else if (mode === "edit" && typeof updateId === "number")
      dispatch(updateCategory(form, updateId));
    else if (mode === "delete" && typeof deleteId === "number")
      dispatch(deleteCategory(deleteId));
    setIsModalVisible(false);
    setMode("new");
    setForm(emptyForm);
    setUpdateId(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setMode("new");
    setForm(emptyForm);
    setUpdateId(null);
    setDeleteId(null);
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

    {
      title: "Action",
      key: "action",
      render: (text: string, category: Category) => (
        <Space size="middle">
          <EditOutlined
            style={{ color: "darkblue" }}
            onClick={() => {
              showModal("edit");
              setForm(category);
              setUpdateId(category.id);
            }}
          />
          <DeleteOutlined
            style={{ color: "maroon" }}
            onClick={() => {
              showModal("delete");
              setDeleteId(category.id);
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "10px",
        }}
      >
        <Button type="primary" onClick={() => showModal("new")}>
          New Category
        </Button>

        <Modal
          title={
            mode === "new"
              ? "Create New Category"
              : mode === "edit"
              ? "Update Category"
              : "Delete Category"
          }
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{ disabled: !(mode === "delete") && !form.name }}
        >
          {mode === "edit" || mode === "new" ? (
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
                  value={form.type}
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
          ) : mode === "delete" ? (
            <>Are you sure ? </>
          ) : null}
        </Modal>
      </div>

      <Table loading={loading} columns={columns} dataSource={data} />
    </React.Fragment>
  );
};

export default Categories;
