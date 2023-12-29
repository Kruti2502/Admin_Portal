import React from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    const apiUrl = "http://localhost:2701";
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    };
    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.isError) {
          throw new Error(data.message);
        }
        if (data.token) {
          message.success("Login successful!");
          localStorage.setItem("token", data.token);
          navigate("/users-list");
        }
      })
      .catch((error) =>
        message.error(error ? error.message : "Something went wrong!")
      );
  };
  return (
    <div className="login-form">
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 400 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email address!" },
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit" className="login">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
