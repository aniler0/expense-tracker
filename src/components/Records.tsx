import { useDispatch, useSelector } from "react-redux";
import { Form, Select, Button, Input, Modal, Table, Tag, Space } from "antd";
import { AppState } from "../store";
import { Record, RecordForm } from "../types/record";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { addRecord, getRecords } from "../store/actions/recordActions";
import React, { useEffect, useState } from "react";
import { Category } from "../types/category";
import { Mode } from "../types/general";

import { getCategories } from "../store/actions/categoryActions";

const emptyForm: RecordForm = {
  title: "",
  amount: 0,
  category_id: 0,
};

const Records = () => {
  const [isModalVisible, setIsModalVisible] = useState(false); //sets modal visible or invisible
  const [mode, setMode] = useState<Mode>("edit"); //sets mode to call the function which is same name with state
  const [form, setForm] = useState<RecordForm>(emptyForm); //sets form
  const [updateId, setUpdateId] = useState<number | null>(null); //
  const [deleteId, setDeleteId] = useState<number | null>();
  const { data, loading, error } = useSelector(
    (state: AppState) => state.records
  );
  const { data: categories } = useSelector(
    (state: AppState) => state.categories
  );
  const dispatch = useDispatch();

  const isFormValid = !(
    !form.title ||
    form.amount === 0 ||
    form.category_id === 0
  );
  const showModal = (mode: Mode) => {
    setIsModalVisible(true);
    setMode(mode);
  };
  const handleOk = () => {
    //Mode değerine göre create or update action creator fonksiyonu çağır.
    if (mode === "new") dispatch(addRecord(form));
    //   else if (mode === "edit" && typeof updateId === "number")
    //     dispatch(updateRecord(form, updateId));
    //   else if (mode === "delete" && typeof deleteId === "number")
    //     dispatch(deleteRecord(deleteId));
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
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: Record["amount"], record: Record) => {
        return (
          <>
            {Intl.NumberFormat("tr-TR", {
              style: "currency",
              currency: "TRY",
            }).format(amount)}
          </>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category: Category, record: Record) => {
        return <Tag color={category.color}>{category.name.toUpperCase()}</Tag>;
      },
    },

    {
      title: "Action",
      key: "action",
      render: (text: string, record: Record) => (
        <Space size="middle">
          <EditOutlined style={{ color: "darkblue" }} onClick={() => {}} />
          <DeleteOutlined style={{ color: "maroon" }} onClick={() => {}} />
        </Space>
      ),
    },
  ];
  useEffect(() => {
    dispatch(getRecords());
    !categories.length && dispatch(getCategories());
  }, []);

  return (
    <React.Fragment>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "10px",
          }}
        >
          <Button
            type="primary"
            onClick={() => {
              showModal("new");
            }}
          >
            New Record
          </Button>
        </div>
        <Modal
          title={
            mode === "new"
              ? "Create New Records"
              : mode === "edit"
              ? "Update Records"
              : "Delete Records"
          }
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{ disabled: !(mode === "delete") && !isFormValid }}
        >
          {mode === "edit" || mode === "new" ? (
            <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
              <Form.Item label="Title" required>
                <Input
                  name="title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="Amount" required>
                <Input
                  name="amount"
                  value={form.amount}
                  type="number"
                  onChange={(e) =>
                    setForm({ ...form, amount: Number(e.target.value) })
                  }
                />
              </Form.Item>
              <Form.Item label="Category">
                <Select
                  defaultValue={form.category_id}
                  value={form.category_id}
                  onChange={(category_id) => setForm({ ...form, category_id })}
                >
                  <Select.Option value={0} disabled>
                    Select a category
                  </Select.Option>
                  {categories.map((category, key) => {
                    return (
                      <Select.Option key={key} value={category.id}>
                        {category.name}
                      </Select.Option>
                    );
                  })}
                </Select>
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

export default Records;
