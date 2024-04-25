import React from "react";
import { Form, Input, message } from "antd";
import "../../public/stylesheets/RegisterStyles.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar2 from "../components/Navbar2";

export default function Register() {
  const navigate = useNavigate();
  const onFinishHandler = async (values) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/v1/user/register`,
        values
      );
      if (res.data.success) {
        message.success("Registered scuucessfully!");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };
  return (
    <>
      <Navbar2 />
      <div className="form-container reg">
        {/* <div className="register-form"> */}
        <Form
          layout="vertical"
          onFinish={onFinishHandler}
          className="register-form"
        >
          <h3 className="text-center">Register</h3>
          <Form.Item label="name" name="name" className="white-label">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Email" name="email" className="white-label">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password" className="white-label">
            <Input type="password" required />
          </Form.Item>

          <div className="d-flex justify-content-center">
            <button className="btn btn-success" type="submit">
              Register
            </button>
          </div>
          <div className="py-2 text-center">
            <Link to="/login">Already user login here</Link>
          </div>
        </Form>
        {/* </div> */}
      </div>
    </>
  );
}
