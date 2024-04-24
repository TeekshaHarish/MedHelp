import React from "react";
import { useNavigate } from "react-router-dom";
import "../../public/stylesheets/common.css";

export default function DoctorCard({ doctor }) {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="card m-3"
        onClick={() => navigate(`/book-appointment/${doctor._id}`)}
        style={{ cursor: "pointer", width: "45%" }}
      >
        <div class="card d-flex justify-content-center align-items-center pt-3">
          <img
            src="/images/docpic2.png"
            class="card-img-top"
            alt="..."
            // width="50%"
            // height="80px"
            className="docimg"
          />
          <div class="card-body" style={{ width: "95%" }}>
            <h5 class="card-title">
              Dr. {doctor.firstName} {doctor.lastName}
            </h5>
            <p class="card-text">
              <b>Specialization</b>{" "}
              <div className="d-flex flex-wrap">
                {doctor.specialization.map((spz, idx) => {
                  return (
                    <>
                      <div className="spz">{spz}</div>{" "}
                      {/* {idx != doctor.specialization.length - 1 ? "," : ""} */}
                    </>
                  );
                })}
              </div>
            </p>
            <p class="card-text">
              <b>Experience</b> {doctor.experience}
            </p>
            <p class="card-text">
              <b>Fees Per Consultation</b> {doctor.feesPerConsultation}
            </p>
            <p class="card-text">
              <b>Timings</b> {doctor.timings[0]} - {doctor.timings[1]}
            </p>
            <div className="d-flex justify-content-center">
              <a href="#" class="btn btn-dark">
                See Details
              </a>
            </div>
          </div>
        </div>
        {/* <div className="card-header">
          Dr. {doctor.firstName} {doctor.lastName}
        </div>
        <div className="card-body">
          <p>
            <b>Specialization</b>{" "}
            {doctor.specialization.map((spz, idx) => {
              return (
                <>
                  <span>{spz}</span>{" "}
                  {idx != doctor.specialization.length - 1 ? "," : ""}
                </>
              );
            })}
          </p>
          <p>
            <b>Experience</b> {doctor.experience}
          </p>
          <p>
            <b>Fees Per Consultation</b> {doctor.feesPerConsultation}
          </p>
          <p>
            <b>Timings</b> {doctor.timings[0]} - {doctor.timings[1]}
          </p>
        </div> */}
      </div>
    </>
  );
}
