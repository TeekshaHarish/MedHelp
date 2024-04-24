import React, { useContext, useState } from "react";
import Layout from "./../components/Layout";
import { Tabs, message } from "antd";
import axios from "axios";
import { userContext } from "./../UserContextProv";
import { useNavigate } from "react-router-dom";

const NotificationPage = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useContext(userContext);

  const markAllReadHandler = async () => {
    try {
      const res = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_API
        }/api/v1/user/read-all-notifications`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        updateUser(res.data.data);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong");
    }
  };
  const DeleteAllReadHandler = async () => {
    try {
      const res = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_API
        }/api/v1/user/delete-all-notifications`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        updateUser(res.data.data);
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
      <h4 className="p-3 text-center">Notifications Page</h4>
      <Tabs className="mx-3">
        <Tabs.TabPane tab="Unread" key={0}>
          <div className="d-flex justify-content-end">
            <div className="btn btn-success" onClick={markAllReadHandler}>
              Mark All as Read
            </div>
          </div>
          <div className="">
            {user?.notification.map((notif) => {
              return (
                <div
                  className="card m-3"
                  onClick={() => navigate(notif.onClickPath)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="card-text p-2">{notif.message}</div>
                </div>
              );
            })}
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Read" key={1}>
          <div className="d-flex justify-content-end">
            <div className="btn btn-danger" onClick={DeleteAllReadHandler}>
              Delete All Read
            </div>
          </div>
          <div className="">
            {user?.seenNotification.map((notif) => {
              return (
                <div
                  className="card m-3"
                  onClick={() => navigate(notif.data.onClickPath)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="card-text p-2">{notif.message}</div>
                </div>
              );
            })}
          </div>
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default NotificationPage;
