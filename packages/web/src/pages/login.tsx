import React from "react";
import { Button, Typography, Col, Form, Input, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { LoginParmas } from "../types";
import { fetchLogin } from "../request/user";
import { AlertTwoTone, LockOutlined, UserOutlined } from "@ant-design/icons";
const { Text, Link } = Typography;

const Login: React.FC = () => {

  const navigate = useNavigate();

  const onFinish = (values: LoginParmas) => {
    fetchLogin(values).then(res => {
      if (res.code == 200) {
        localStorage.setItem('token', res.data.token);
        navigate("/");
      }
    })
  };
  const goToRegister = () => {
    navigate("/register");
  }
  return (
    <div
      className="h-screen 
                w-full
                flex-col
                flex
                justify-center
                items-center
    ">
      <AlertTwoTone className="text-4xl" />

      <div
        className="
              p-20
              border-blue-400
              shadow-orange-100
              hover:shadow-2xl 
              duration-200
              shadow-md
               rounded-md 
               border-2 
               w-1/2 
               bg-blue-100
               ">
        <p className="text-2xl text-center cursor-pointer">登录 </p>
        <Form
          name="basic"
          onFinish={onFinish}
          autoComplete="off"
          size="large"
          labelAlign="left"
          layout={"vertical"}
          initialValues={{
            phoneNumber: "18623816694",
            password: "123456"
          }}
          className="w-full">

          <Form.Item
            label="手机号"
            name="phoneNumber"
            rules={
              [
                { required: true, message: "请输入手机号" },
                { len: 11, message: "请输入11位手机号" },
              ]
            }
          >
            <Input prefix={<UserOutlined />} className="h-12" placeholder="请输入手机号" />
          </Form.Item>


          <Form.Item
            label="密码"
            name="password"
            rules={[
              { type: "string", min: 3, max: 6, message: "密码长度必须在3位到6位之间" },
              { required: true, message: "请输入密码" },
            ]}>
            <Input.Password placeholder="请输入密码" className="h-12" prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item>
            <Link className="float-right" onClick={goToRegister}>没有账号？去注册</Link>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              className="bg-blue-500 w-1/2 mx-auto flex justify-center">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
