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
        <div className="card d-flex justify-content-center align-items-center pt-3">
          <img
            src="/images/docpic2.png"
            className="card-img-top docimg"
            alt="..."
            // width="50%"
            // height="80px"
            // className="docimg"
          />
          <div className="card-body" style={{ width: "95%" }}>
            <h5 className="card-title">
              Dr. {doctor.firstName} {doctor.lastName}
            </h5>
            <p className="card-text">
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
            <p className="card-text">
              <b>Experience</b> {doctor.experience}
            </p>
            <p className="card-text">
              <b>Fees Per Consultation</b> {doctor.feesPerConsultation}
            </p>
            <p>
              <b>Rating:</b> {doctor.netRating} ⭐
            </p>
            <p className="card-text">
              <b>Timings</b> {doctor.timings[0]} - {doctor.timings[1]}
            </p>
            <div className="d-flex justify-content-center">
              <a href="#" className="btn btn-dark">
                See Details
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
