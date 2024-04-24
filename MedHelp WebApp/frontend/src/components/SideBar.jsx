import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "../../public/stylesheets/Sidebar.css";
import Navbar from "./Navbar";
let open = false;
const SideBar = ({ children, routes, user }) => {
  console.log(routes);
  const [isOpen, setIsOpen] = useState(open);
  const toggle = () => {
    open = !isOpen;
    setIsOpen(!isOpen);
  };

  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "230px" : "50px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  {/* MedHelp */}
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
              {/* <FaBars onClick={(event) => toggle(event)} /> */}
            </div>
          </div>
          <section className="routes">
            {routes.map((route, index) => {
              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  {/* <div className="icon">{route.icon}</div> */}
                  <div className="icon">
                    <i className={route.icon}></i>
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <div className="w-100">
          <Navbar user={user} />
          <main>{children}</main>
          <footer class="footer bg-dark text-center text-light py-2 px-5 pt-3">
            <p>&copy; 2024 MedHelp. Made with ❤️ by Teeksha.</p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default SideBar;
