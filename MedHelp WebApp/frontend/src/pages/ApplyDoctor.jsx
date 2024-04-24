import React, { useState } from "react";
import Layout from "../components/Layout";
import { Col, Form, Input, Row, Select, TimePicker, message } from "antd";
// import "antd/dist/antd.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const specialisation = [
  "ENT Specialist",
  "Dermatologist",
  "Urologist",
  "Orthopedic Surgeon",
  "Rheumatologist",
  "Endocrinologist",
  "Vascular Surgeon",
  "Cardiologist",
  "General Surgeon",
  "Internal Medicine Physician",
  "Hepatologist",
  "Pulmonologist",
  "General Practitioner",
  "Infectious Disease Specialist",
  "Pediatrician",
  "Neurologist",
  "Gastroenterologist",
  "Allergist",
  "Immunologist",
];

export const ApplyDoctor = () => {
  const navigate = useNavigate();
  const [formTimings, setFormTimings] = useState();

  const options = specialisation.map((spc) => ({
    value: spc,
    label: spc,
  }));
  console.log(options);
  const onFinishHandler = async (values) => {
    try {
      console.log({
        ...values,
        timings: [
          values.timings[0].format("HH:mm"),
          values.timings[1].format("HH:mm"),
        ],
      });
      // console.log("BEFORE", values);
      // console.log(values.timings[0], values.timings[1]);
      // console.log(
      //   moment(values.timings[0], "HH:mm").format("HH:mm"),
      //   moment(values.timings[1], "HH:mm").format("HH:mm")
      // );
      console.log("FORM", formTimings);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/v1/user/apply-doctor`,
        {
          ...values,
          timings: [
            values.timings[0].format("HH:mm"),
            values.timings[1].format("HH:mm"),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong");
    }
  };
  return (
    <Layout>
      {/* <h1 className="text-center">Apply Doctor</h1> */}
      <h3 className="text-center pt-3">Apply as a Doctor</h3>
      <Form layout="vertical" onFinish={onFinishHandler} className="m-4">
        <h4>Personal Details</h4>
        <hr />
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="First name"
              name="firstName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your first name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Last name"
              name="lastName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your last name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Phone Number"
              name="phone"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your phone" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Email"
              name="email"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your email" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Website" name="website">
              <Input type="text" placeholder="your website link" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Address"
              name="address"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your address" />
            </Form.Item>
          </Col>
        </Row>
        <h4 className="pt-3">Professional Details</h4>
        <hr />
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Specialization"
              name="specialization"
              required
              rules={[{ required: true }]}
            >
              {/* <Input type="text" placeholder="your specialization" /> */}
              <Select
                mode="multiple"
                allowClear
                style={{
                  width: "100%",
                }}
                placeholder="Please select your specialization"
                defaultValue={[]}
                // onChange={handleChange}
                options={options}
              />
              {/* <Select>
                const specialization=['orthopedic','dermatology','']
                <Select.Option value="orthopedic"></Select.Option>
              </Select> */}
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Experience"
              name="experience"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your experience" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Fees Per Consultation"
              name="feesPerConsultation"
              required
              rules={[{ required: true }]}
            >
              <Input type="number" placeholder="your fees" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Timings"
              name="timings"
              required
              rules={[{ required: true }]}
            >
              {/* <DatePicker
                // selected={startDate}
                // onChange={(date) => setStartDate(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="hh:mm"
              /> */}
              <TimePicker.RangePicker
                format="HH:mm"
                minuteStep={30}
                hourStep={1}
                // onChange={(values) => {
                //   // console.log(values);
                //   // console.log(values[0].format("HH:mm"));
                //   console.log(
                //     values[0].format("HH:mm"),
                //     values[1].format("HH:mm")
                //   );
                //   setFormTimings([
                //     values[0].format("HH:mm"),
                //     values[1].format("HH:mm"),
                //   ]);
                //   console.log("FORM NEW", formTimings);

                //   // console.log(
                //   //   moment(values[0], "HH:mm").format("HH:mm"),
                //   //   moment(values[1], "HH:mm").format("HH:mm")
                //   // );
                //   // console.log("NEW TIMINGS", formTimings);
                // }}
                // value={formTimings}
              />
            </Form.Item>
          </Col>
        </Row>
        <div className="d-flex justify-content-center">
          <button className="btn btn-dark w-40" type="submit">
            Submit
          </button>
        </div>
      </Form>
    </Layout>
  );
};
