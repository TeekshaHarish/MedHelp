import React from "react";
import { Form, Input, message } from "antd";
import "../../public/stylesheets/RegisterStyles.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinishHandler = async (values) => {
    try {
      // dispatch(showLoading());
      // console.log(values)
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/v1/user/login`,
        values
      );
      // dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successful!");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      // dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrongf");
    }
  };
  return (
    <div className="form-container">
      <Form
        layout="vertical"
        onFinish={onFinishHandler}
        className="register-form"
      >
        <h1 className="text-center">Login</h1>
        <Form.Item label="Email" name="email">
          <Input type="email" required />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" required />
        </Form.Item>
        <div className="">
          <Link to="/register">Not a user Register here</Link>
        </div>
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </Form>
    </div>
  );
};

export default Login;
