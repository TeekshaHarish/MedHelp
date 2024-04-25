import React from "react";
import { Link } from "react-router-dom";

const Navbar2 = () => {
  return (
    <nav className="navbar navbar-dark mynav bg-dark navbar-expand-sm bg-body-dark">
      <div className="container-fluid ">
        <a className="navbar-brand  px-4" href="#">
          MedHelp
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
          <div className="navbar-nav d-flex justify-content-end w-100">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/login " className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Signup
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar2;
