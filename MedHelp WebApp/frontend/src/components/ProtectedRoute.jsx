import React, { createContext, useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserProvider } from "../UserContextProv";
// import axios from "axios";
// import { useSelector, useDispatch } from "react-redux";
// import { hideLoading, showLoading } from "../redux/features/alertSlice";
// import { setUser } from "../redux/features/userSlice";
// export const userContext = createContext();
export default function ProtectedRoute({ children }) {
  // const dispatch = useDispatch();
  // const [user, setUser] = useState({});
  // // const { user } = useSelector((state) => state.user);

  // //get user
  // //eslint-disable-next-line
  // const getUser = async () => {
  //   try {
  //     dispatch(showLoading());
  //     const res = await axios.post(
  //       `${import.meta.env.VITE_BACKEND_API}/api/v1/user/getUserData`,
  //       { token: localStorage.getItem("token") },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );

  //     dispatch(hideLoading());
  //     if (res.data.success) {
  //       // dispatch(setUser(res.data.data));
  //       console.log("RES", res.data.data);
  //       // setUser(res.data.data);
  //       setUser((prevUser) => ({ ...prevUser, ...res.data.data }));
  //       // console.log("USER");
  //       // console.log(user);
  //     } else {
  //       localStorage.clear();
  //       <Navigate to="/login" />;
  //     }
  //   } catch (error) {
  //     localStorage.clear();
  //     dispatch(hideLoading());
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   console.log("USER IS ", user);
  //   // if (!user) {
  //   getUser();
  //   // }
  // }, []);

  if (localStorage.getItem("token")) {
    // return <userContext.Provider value={user}>{children}</userContext.Provider>;
    return <UserProvider> {children}</UserProvider>;
  } else {
    return <Navigate to="/login" />;
  }
}
