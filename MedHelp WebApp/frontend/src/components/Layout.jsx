import React, { createContext, useContext, useEffect, useState } from "react";
import { adminMenu, doctorMenu, userMenu } from "../data/data";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { userContext } from "./../UserContextProv";
import SideBar from "./SideBar";
// export const userContext = createContext();

const Layout = ({ children }) => {
  // let userData = {};
  const { user, updateUser } = useContext(userContext);
  //--------------------------------
  // const [user, setUser] = useState();
  // // const dispatch = useDispatch();
  const getUser = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/v1/user/getUserData`,
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        // userData = { ...res.data.data };
        // console.log("DATA ", res.data.data);
        await updateUser(res.data.data);
      } else {
        localStorage.clear();
        <Navigate to="/login" />;
      }
    } catch (error) {
      localStorage.clear();
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  //------------------------------

  // getUser();
  // console.log("USER DATA", userData);
  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;
  // const navigate = useNavigate();
  // const handleLogout = () => {
  //   localStorage.clear();
  //   message.success("Logged out successfully");
  //   navigate("/login");
  // };
  return (
    <div className="main">
      <SideBar routes={SidebarMenu} children={children} user={user} />
      <div className="layout">
        {/* <div className="sidebar">
          <SideBar /> */}
        {/* <div className="logo">
            <h6>DOC-APP</h6>
            <hr />
          </div> */}
        {/* <div className="menu">
            {SidebarMenu.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <>
                  <div className={`menu-item ${isActive && "active"}`}>
                    <i className={menu.icon}></i>
                    <Link to={menu.path}>
                      <h3>{menu.name}</h3>
                    </Link>
                  </div>
                </>
              );
            })}
            <div className={"menu-item"} onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket"></i>
              <Link to="/logout">
                <h3>Logout</h3>
              </Link>
            </div>
          </div> */}
        {/* </div> */}
        {/* <div className="content">
          <div className="header">
            <div className="header-content">
              <Badge
                count={user && user.notification.length}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/notifications");
                }}
              >
                <i
                  className="fa-solid fa-bell"
                  style={{ cursor: "pointer" }}
                ></i>
              </Badge>
              <Link to="/profile">{user?.name}</Link>
            </div>
          </div>
          <div className="body">{children}</div>
        </div> */}
      </div>
    </div>
  );
};

export default Layout;
