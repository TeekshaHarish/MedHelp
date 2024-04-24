import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { Table, message } from "antd";

const Doctors = () => {
  const [doctors, setDoctors] = useState();
  const getAllDoctors = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/api/v1/admin/getAllDoctors`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      } else {
        message.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };
  useEffect(() => {
    getAllDoctors();
  }, []);

  const changeDoctorStatus = async (record, status) => {
    try {
      console.log("record", record);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/v1/admin/changeDoctorStatus`,
        {
          doctorId: record._id,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getAllDoctors();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  const deleteDoctor = async (record) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/v1/admin/deleteDoctor`,
        {
          doctorId: record._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success("Doctor deleted successfully");
        getAllDoctors();
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}{" "}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button
              className="btn btn-success"
              onClick={() => changeDoctorStatus(record, "approved")}
            >
              Approve
            </button>
          ) : (
            <button
              className="btn btn-danger"
              onClick={() => changeDoctorStatus(record, "pending")}
            >
              Reject
            </button>
          )}
          <button
            className="btn btn-danger mx-3"
            onClick={() => {
              deleteDoctor(record);
            }}
          >
            Remove Doctor
          </button>
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h1>Doctors list</h1>
      <Table columns={columns} dataSource={doctors} />
    </Layout>
  );
};

export default Doctors;
