import React, { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
// import { setUser } from "../redux/features/userSlice";
import UserContextProv from "../UserContextProv";
import { useUserContext, useUserContextUpdate } from "../UserContextProv";
export default function ProtectedRoute({ children }) {
  const user = useUserContext();
  const setUserFunc = useUserContextUpdate();

  const dispatch = useDispatch();
  //   const { user } = useSelector((state) => state.user);

  //get user
  //eslint-disable-next-line
  const getUser = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/v1/user/getUserData`,
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      console.log(res.data);
      if (res.data.success) {
        console.log("YES");
        setUserFunc(res.data.data);
        console.log(user);
        // dispatch(setUser(res.data.data));
      } else {
        localStorage.clear();
        <Navigate to="/login" />;
      }
    } catch (error) {
      localStorage.clear();
      dispatch(hideLoading());
      console.log(error);
    }
  };

  //   useEffect(() => {
  //     if (!user) {
  //       getUser();
  //     }
  //   }, []);

  if (localStorage.getItem("token")) {
    return <UserContextProv>{children}</UserContextProv>;
  } else {
    return <Navigate to="/login" />;
  }
}
