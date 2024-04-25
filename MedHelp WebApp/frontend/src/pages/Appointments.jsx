import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { Table, message } from "antd";

const Appointments = () => {
  const [appointments, setAppointments] = useState();
  const getAppointments = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/api/v1/user/getAppointments`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setAppointments(res.data.data);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };
  useEffect(() => {
    getAppointments();
  }, []);

  const deleteAppointmentHandler = async (record) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/v1/doctor/deleteAppointment`,
        {
          appointmentId: record._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getAppointments();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Somethong went wrong");
    }
  };
  const columns = [
    // {
    //   title: "ID",
    //   dataIndex: "_id",
    // },
    {
      title: "Doctor Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          Dr. {record.doctorId.firstName} {record.doctorId.lastName}
        </span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      render: (text, record) => <span>{record.doctorId.phone}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text, record) => <span>{record.doctorId.email}</span>,
    },
    {
      title: "Address",
      dataIndex: "address",
      render: (text, record) => <span>{record.doctorId.address}</span>,
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Timing",
      dataIndex: "startTime",
    },
    {
      title: "Action",
      dataIndex: "actions",
      render: (rext, record) => (
        <div
          className="btn btn-danger"
          onClick={() => {
            deleteAppointmentHandler(record);
          }}
        >
          <i className="fa-solid fa-xmark"></i> Cancel
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h3 className="text-center py-3">Appointments</h3>
      <div className="container">
        {appointments && <Table columns={columns} dataSource={appointments} />}
        {/* {appointments &&
        appointments.map((appt) => {
          return(
            <div>

            </div>
          );
        })} */}
      </div>
    </Layout>
  );
};

export default Appointments;
