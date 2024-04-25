import React from "react";
import { Form, Input, message } from "antd";
import "../../public/stylesheets/RegisterStyles.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar2 from "../components/Navbar2";

const Login = () => {
  const navigate = useNavigate();
  const onFinishHandler = async (values) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/v1/user/login`,
        values
      );
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successful!");
        navigate("/all-doctors");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrongf");
    }
  };
  return (
    <>
      <Navbar2 />
      <div className="form-container reg">
        <Form
          layout="vertical"
          onFinish={onFinishHandler}
          className="register-form"
        >
          <h3 className="text-center">Login</h3>
          <Form.Item label="Email" name="email" className="white-label">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password" className="white-label">
            <Input type="password" required />
          </Form.Item>

          <div className="d-flex justify-content-center">
            <button className="btn btn-success" type="submit">
              Login
            </button>
          </div>
          <div className="mt-2 text-center">
            <Link to="/register">Not a user Register here</Link>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;
