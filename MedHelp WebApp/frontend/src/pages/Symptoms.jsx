import React from "react";
import Layout from "../components/Layout";
import { Form, Select, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { symptoms } from "../data/meddata";
const Symptoms = () => {
  const navigate = useNavigate();
  const onFinishHandler = async (values) => {
    try {
      console.log(values);
      let symptomslist = [];
      for (let key in values) {
        if (values[key] != null) {
          symptomslist.push(values[key]);
        }
      }
      console.log(symptomslist);
      const res = await axios.post(
        "http://127.0.0.1:5000/predictapi",
        {
          symptoms: symptomslist,
        },
        {}
        // {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem("token")}`,
        //   },
        // }
      );
      console.log(res);
      if (res.data.success) {
        const disease = res.data["Predicted Disease"];
        console.log(disease);
        message.warning(`You have ${disease} as per our predictions`);
        navigate("/recommended-doctors", {
          state: { predictedDisease: disease },
        });
      } else {
        message.error("Error while fetching predicting data from ML Model");
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  const option = symptoms.map((symptom) => ({
    value: symptom,
    label: symptom,
  }));
  console.log(option);
  return (
    <Layout>
      <h1 className="text-center my-3">Please tell your symptoms</h1>
      <Form layout="vertical" onFinish={onFinishHandler} className="m-4">
        <h4>Enter Symptoms</h4>

        <div className="container">
          <Form.Item
            label="Symptom 1"
            name="symptom1"
            required
            rules={[{ required: true }]}
          >
            <Select
              showSearch
              style={{ width: 400 }}
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label.toLowerCase() ?? "").includes(
                  input.toLowerCase()
                )
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={option}
            />
          </Form.Item>
          <Form.Item
            label="Symptom 2"
            name="symptom2"
            required
            rules={[{ required: true }]}
          >
            <Select
              showSearch
              style={{ width: 400 }}
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label.toLowerCase() ?? "").includes(
                  input.toLowerCase()
                )
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={option}
            />
          </Form.Item>

          <Form.Item label="Symptom 3" name="symptom3">
            <Select
              showSearch
              style={{ width: 400 }}
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label.toLowerCase() ?? "").includes(
                  input.toLowerCase()
                )
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={option}
            />
          </Form.Item>

          <Form.Item label="Symptom 4" name="symptom4">
            <Select
              showSearch
              style={{ width: 400 }}
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label.toLowerCase() ?? "").includes(
                  input.toLowerCase()
                )
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={option}
            />
          </Form.Item>

          <Form.Item label="Symptom 5" name="symptom5">
            <Select
              showSearch
              style={{ width: 400 }}
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label.toLowerCase() ?? "").includes(
                  input.toLowerCase()
                )
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={option}
            />
          </Form.Item>
        </div>

        <div className="d-flex justify-content-end">
          <button className="btn btn-dark" type="submit">
            Submit
          </button>
        </div>
      </Form>
    </Layout>
  );
};

export default Symptoms;
