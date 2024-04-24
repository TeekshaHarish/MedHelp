import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import { Table, message } from "antd";
const DocAppointments = () => {
  const [appointments, setAppointments] = useState();
  const getAppointments = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/api/v1/doctor/getDoctorAppointments`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
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

  const markAppointmentCompletedHandler = async (record) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/v1/doctor/markAppointmentCompleted`,
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
      title: "Patient Name",
      dataIndex: "name",
      render: (text, record) => <span>{record.userId.name}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text, record) => <span>{record.userId.email}</span>,
    },
    // {
    //   title: "Email",
    //   dataIndex: "email",
    //   render: (text, record) => <span>{record.doctorId.email}</span>,
    // },
    // {
    //   title: "Address",
    //   dataIndex: "address",
    //   render: (text, record) => <span>{record.doctorId.address}</span>,
    // },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Timing",
      dataIndex: "startTime",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => {
        return (
          <div>
            {record.status == "Scheduled" && (
              <div
                className="btn btn-success "
                onClick={() => {
                  markAppointmentCompletedHandler(record);
                }}
              >
                Mark as Completed
              </div>
            )}
            <div
              className="btn btn-danger m-2"
              onClick={() => {
                deleteAppointmentHandler(record);
              }}
            >
              {record.status === "Scheduled" ? "Cancel" : "Delete"} Appointment
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <Layout>
      <div>
        <h3>My Appointments</h3>
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

export default DocAppointments;
