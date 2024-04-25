// import axios from "axios";
import React from "react";
import "../../public/stylesheets/Home.css";
import "../../public/stylesheets/Navbar.css";
import Navbar2 from "../components/Navbar2";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Navbar2 />

      <div className="hero">
        <h1>Welcome to MedHelp App</h1>
        <p className="tagline">
          Bridge to Healing: Connecting Users with Expert Care and Predictive
          Insights.
        </p>
        <button className="cta">
          <a href="/register">Register Now</a>{" "}
        </button>
      </div>
      <div className="main">
        <h2>With our app you can</h2>
        <section id="symptom" className="feature">
          <div className="left" />
          <div className="right">
            <h2>Symptom Based Disease Detection</h2>
            <p>
              Experience seamless disease prediction by simply entering your
              symptoms. Our advanced algorithm analyzes your inputs and provides
              accurate predictions, enabling proactive healthcare management.
              With personalized recommendations and intuitive interface, take
              charge of your well-being effortlessly. Welcome to a platform that
              prioritizes your health and puts you in control.
            </p>
          </div>
        </section>
        <section id="doctor" className="feature">
          <div className="right">
            <h2>Disease based doctor suggestor</h2>
            <p>
              Discover specialized healthcare professionals tailored to your
              specific medical needs. Our intuitive platform analyzes your
              diagnosed diseases and matches you with qualified doctors,
              ensuring you receive the best possible care. Say goodbye to
              endless searches and hello to personalized healthcare
              recommendations.
            </p>
          </div>
          <div className="left" />
        </section>
        <section id="user" className="feature">
          <div className="left" />
          <div className="right">
            <h2>Seamless Appointment Booking</h2>
            <p>
              Easily schedule appointments with qualified healthcare
              professionals at your convenience. Our intuitive platform allows
              you to browse available time slots, select your preferred doctor,
              and book appointments hassle-free. Plus, view ratings of doctors
              from other users and provide your own feedback to help others make
              informed decisions about their healthcare providers. Take control
              of your healthcare journey with ease and transparency.
            </p>
          </div>
        </section>
      </div>
      <div className="text-center my-2 w-75 mx-auto">
        <span className="fs-5 mx-3">
          Embark on your journey to better health! Take control of your
          well-being today and discover a world of personalized care. Get
          started now and unlock a new chapter in your healthcare
          experience.Ready to Get Started?
        </span>
        <button className="btn btn-primary mb-3">
          <Link to="/register">Sign Up Now</Link>
        </button>
      </div>

      <footer class="footer bg-dark text-center text-light py-2 px-5 pt-3">
        <p>&copy; 2024 MedHelp. Made with ❤️ by Teeksha.</p>
      </footer>
    </>
  );
};

export default Home;
