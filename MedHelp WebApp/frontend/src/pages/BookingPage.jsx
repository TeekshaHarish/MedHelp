import { DatePicker, Form, TimePicker, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import "../../public/stylesheets/stars.css";

const BookingPage = () => {
  const [doctor, setDoctor] = useState();
  const params = useParams();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState(false);
  const getDoctorData = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/v1/doctor/getDoctorById`,
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };
  useEffect(() => {
    getDoctorData();
  }, []);

  const findEndingTime = (time) => {
    let minutes = time.format("HH:mm").substring(3, 5);
    let hours = time.format("HH:mm").substring(0, 2);
    if (minutes + 30 >= 60) {
      minutes = parseInt(minutes) + 30 - 60;
      hours = parseInt(hours) + 1;
    } else {
      minutes = parseInt(minutes) + 30;
    }
    if (minutes < 10) {
      minutes = "0" + minutes.toString();
    } else {
      minutes = minutes.toString();
    }
    if (hours < 10) {
      hours = "0" + hours.toString();
    } else {
      hours = hours.toString();
    }
    const newTime = hours + ":" + minutes;
    return newTime;
  };
  const findBeforeTime = (time) => {
    let minutes = time.format("HH:mm").substring(3, 5);
    let hours = time.format("HH:mm").substring(0, 2);
    if (minutes - 30 < 0) {
      minutes = (parseInt(minutes) - 30 + 60) % 60;
      hours = parseInt(hours) - 1;
    } else {
      minutes = parseInt(minutes) - 30;
    }
    if (minutes < 10) {
      minutes = "0" + minutes.toString();
    } else {
      minutes = minutes.toString();
    }
    if (hours < 10) {
      hours = "0" + hours.toString();
    } else {
      hours = hours.toString();
    }
    const newTime = hours + ":" + minutes;
    return newTime;
  };

  const bookAppointmentHandler = async () => {
    try {
      if (!date || !time) {
        return alert("Date and Time required");
      }
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/v1/user/book-appointment`,
        {
          doctorId: params.doctorId,
          startTime: time.format("HH:mm"),
          date: date.format("DD-MM-YYYY"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  const checkAvailabilityHandler = async () => {
    try {
      if (!date || !time) {
        return alert("Date and Time required");
      }
      const endingTime = findEndingTime(time);
      const beforeTime = findBeforeTime(time);
      const res = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_API
        }/api/v1/user/check-available-appointment`,
        {
          doctorId: params.doctorId,
          startTime: time.format("HH:mm"),
          endTime: endingTime,
          beforeTime,
          date: date.format("DD-MM-YYYY"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        setIsAvailable(true);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  const [rating, setRating] = useState(0);
  const submitRating = async () => {
    // e.preventDefault();
    console.log(rating);
    try {
      if (rating <= 0) {
        return message.error("Something went wrong");
      }
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/v1/doctor/giveRating`,
        {
          doctorId: params.doctorId,
          rating: rating,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getDoctorData();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
    // console.log(e);
  };

  const disabledTime = () => {
    const disabledHours = () => {
      const hours = [];
      const sTime = parseInt(doctor.timings[0].substring(0, 2));
      const eTime = parseInt(doctor.timings[1].substring(0, 2));
      for (let i = 0; i < 24; i++) {
        if (i < sTime || i > eTime) {
          hours.push(i);
        }
      }
      return hours;
    };
    const disabledMinutes = () => {
      const minutes = [];
      for (let i = 0; i < 60; i++) {
        if (i !== 0 && i !== 30) {
          minutes.push(i);
        }
      }
      return minutes;
    };
    return {
      disabledHours,
      disabledMinutes,
    };
  };
  return (
    <Layout>
      <h3 className="text-center my-3 fs-2">Booking Page</h3>
      <div className="container">
        {doctor && (
          <div className="div">
            <div className="row">
              <div className="col-md-6">
                <h3>
                  Dr. {doctor.firstName} {doctor.lastName}
                </h3>
                <p>
                  <b>Contact Info</b>
                  <br />
                  <span className="mx-2">
                    <i className="fa-solid fa-phone mx-2"></i>
                    {doctor.phone}
                  </span>
                  <span className="mx-2">
                    <i className="fa-regular fa-envelope mx-2"></i>
                    {doctor.email}
                  </span>
                </p>

                <p>
                  <b>Specialization</b>{" "}
                  <div className="d-flex flex-wrap">
                    {doctor.specialization.map((spz, idx) => {
                      return (
                        <>
                          <div className="spz">{spz}</div>{" "}
                        </>
                      );
                    })}
                  </div>
                </p>
                <p>
                  <b> Rating : </b>
                  {doctor.netRating} ⭐
                </p>

                <p>
                  <b>Experience</b> {doctor.experience}
                </p>
                <p>
                  <b>Fees Per Consultation</b> {doctor.feesPerConsultation}
                </p>

                <p>
                  <b>
                    {" "}
                    Timings: {doctor.timings[0]} - {doctor.timings[1]}
                  </b>
                </p>
                {doctor.website && (
                  <p>
                    <b>Website</b> {doctor.website}
                  </p>
                )}
                <p>
                  <b>Address</b> {doctor.address}
                </p>
              </div>
              <div className="col-md-6">
                <h3 className="my-2">Give rating to the doctor</h3>
                <fieldset className="starability-basic">
                  <input
                    type="radio"
                    id="no-rate"
                    className="input-no-rate"
                    name="review[rating]"
                    value="1"
                    checked
                    aria-label="No rating."
                    onClick={(e) => {
                      setRating(e.target.value);
                      // console.log(rating);
                      // console.log(e.target.value);
                    }}
                  />
                  <input
                    type="radio"
                    id="first-rate1"
                    name="review[rating]"
                    value="1"
                    onClick={() => {
                      setRating(1);
                    }}
                  />
                  <label for="first-rate1" title="Terrible">
                    1 star
                  </label>
                  <input
                    type="radio"
                    id="first-rate2"
                    name="review[rating]"
                    value="2"
                    onClick={() => {
                      setRating(2);
                    }}
                  />
                  <label for="first-rate2" title="Not good">
                    2 stars
                  </label>
                  <input
                    type="radio"
                    id="first-rate3"
                    name="review[rating]"
                    value="3"
                    onClick={() => {
                      setRating(3);
                    }}
                  />
                  <label for="first-rate3" title="Average">
                    3 stars
                  </label>
                  <input
                    type="radio"
                    id="first-rate4"
                    name="review[rating]"
                    value="4"
                    onClick={() => {
                      setRating(4);
                    }}
                  />
                  <label for="first-rate4" title="Very good">
                    4 stars
                  </label>
                  <input
                    type="radio"
                    id="first-rate5"
                    name="review[rating]"
                    value="5"
                    onClick={() => {
                      setRating(5);
                    }}
                  />
                  <label for="first-rate5" title="Amazing">
                    5 stars
                  </label>
                </fieldset>
                <button className="btn btn-success" onClick={submitRating}>
                  Submit Rating
                </button>
                <div className="my-3">
                  <h3 className="text-center">Book Appointment</h3>
                  <h5>
                    Timings: {doctor.timings[0]} - {doctor.timings[1]}
                  </h5>
                  <div className="d-flex flex-column w-50">
                    <DatePicker
                      className="my-2"
                      format="DD-MM-YYYY"
                      onChange={(value) => {
                        setDate(value);
                        setIsAvailable(false);
                      }}
                      value={date}
                      required
                    />
                    <TimePicker
                      className="mb-3"
                      format="HH:mm"
                      minuteStep={30}
                      hourStep={1}
                      onChange={(value) => {
                        setTime(value);
                        setIsAvailable(false);
                      }}
                      disabledTime={disabledTime}
                      value={time}
                      inputReadOnly // to prevent user fomr typing diabled values in input
                      allowClear
                      hideDisabledOptions //hide disabled time slots
                      addon={null}
                      required
                    />
                    <button
                      className="btn btn-info mb-3"
                      onClick={checkAvailabilityHandler}
                    >
                      Check Availability
                    </button>
                    {isAvailable && (
                      <button
                        className="btn btn-dark mb-3"
                        onClick={bookAppointmentHandler}
                      >
                        Book Appointment
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div></div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;
