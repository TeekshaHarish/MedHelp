import { message } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
let cnt = 0;
const Logout = () => {
  const navigate = useNavigate();
  //   console.log("CALLED 1");
  const logout = () => {
    // console.log("CALLED LOGOUT");
    // localStorage.removeItem("token");
    localStorage.clear();
    if (cnt < 1) {
      message.success("Logout Successful!");
    }
    cnt += 1;
    navigate("/login");
  };
  //   console.log("CALLED 2");
  //   logout();
  useEffect(() => {
    logout();
  }, []);
  return <div>Logout</div>;
};

export default Logout;
