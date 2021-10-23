import React, { useEffect } from "react";
import { Form, Input, Button, Result } from "antd";
import { useHistory, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import showError from "../utils/showError";
import { LoginForm } from "../types/user";
import { login } from "../store/actions/userActions";
import { AppState } from "../store";
import showSuccess from "../utils/showSuccess";

export const Login = () => {
  const history = useHistory();
  const location = useLocation<{ newSignUp?: boolean }>(); // '?' bir objenin olabilir veya olmayabilir olduğu anlamına geliyor.
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: AppState) => state.user); //user'daki state'i alıyor
  const onFinish = (values: LoginForm) => {
    dispatch(login(values)); //action tetikliyor
  };

  useEffect(() => {
    error && showError(error);
  }, [error]);

  useEffect(() => {
    data.username && showSuccess("You have successfully logged in");
  }, [data.username]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) history.push("/");
  }, [data]);

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      //  onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <h2 style={{ textAlign: "center", marginBottom: "40" }}>
        Login for an account
      </h2>
      {location.state?.newSignUp && (
        <Result
          status="success"
          title="You successfully signed up!"
          subTitle=" Please login using your credentials."
        />
      )}
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
        required
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
        required
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
