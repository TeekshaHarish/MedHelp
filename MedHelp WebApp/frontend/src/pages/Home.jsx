// import axios from "axios";
import React from "react";
import "../../public/stylesheets/Home.css";
import "../../public/stylesheets/Navbar.css";

const Home = () => {
  return (
    <>
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
              <a className="nav-link" href="/">
                Home
              </a>
              <a className="nav-link" href="/login">
                Login
              </a>
              <a className="nav-link" href="/register">
                Signup
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div>
        <div className="hero">
          <h1>Welcome to MedHelp App</h1>
          <p className="tagline">
            Bridge to Healing: Connecting Users with Expert Care and Predictive
            Insights.
          </p>
          <button className="cta">Register Now</button>
        </div>
        <div className="main">
          <h2>With our app you can</h2>
          <section id="symptom" className="feature">
            <div className="left" />
            <div className="right">
              <h2>Symptom Based Disease Detection</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Dolores, corrupti nobis voluptas nostrum libero alias soluta
                quia unde blanditiis error omnis veritatis tenetur, dicta
                excepturi enim voluptates dolorum facilis aliquam! Commodi enim
                provident culpa tenetur vel, consequatur dignissimos cupiditate,
                debitis ab quam nesciunt molestiae minus odit quas autem ducimus
                est similique. Minima consequuntur earum exercitationem, dolore
                molestiae maxime repellendus recusandae! Lorem ipsum dolor sit
                amet, consectetur adipisicing elit. Vitae cum quibusdam at autem
                veritatis eum sint quo velit corrupti, sed quos qui beatae porro
                accusamus necessitatibus ab delectus officia consequatur.
              </p>
            </div>
          </section>
          <section id="doctor" className="feature">
            <div className="right">
              <h2>Disease based doctor suggestor</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Dolores, corrupti nobis voluptas nostrum libero alias soluta
                quia unde blanditiis error omnis veritatis tenetur, dicta
                excepturi enim voluptates dolorum facilis aliquam! Commodi enim
                provident culpa tenetur vel, consequatur dignissimos cupiditate,
                debitis ab quam nesciunt molestiae minus odit quas autem ducimus
                est similique. Minima consequuntur earum exercitationem, dolore
                molestiae maxime repellendus recusandae! Lorem ipsum dolor sit
                amet, consectetur adipisicing elit. Vitae cum quibusdam at autem
                veritatis eum sint quo velit corrupti, sed quos qui beatae porro
                accusamus necessitatibus ab delectus officia consequatur.
              </p>
            </div>
            <div className="left" />
          </section>
          <section id="symptom" className="feature">
            <div className="left" />
            <div className="right">
              <h2>User and Doctor Registration</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Dolores, corrupti nobis voluptas nostrum libero alias soluta
                quia unde blanditiis error omnis veritatis tenetur, dicta
                excepturi enim voluptates dolorum facilis aliquam! Commodi enim
                provident culpa tenetur vel, consequatur dignissimos cupiditate,
                debitis ab quam nesciunt molestiae minus odit quas autem ducimus
                est similique. Minima consequuntur earum exercitationem, dolore
                molestiae maxime repellendus recusandae! Lorem ipsum dolor sit
                amet, consectetur adipisicing elit. Vitae cum quibusdam at autem
                veritatis eum sint quo velit corrupti, sed quos qui beatae porro
                accusamus necessitatibus ab delectus officia consequatur.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
