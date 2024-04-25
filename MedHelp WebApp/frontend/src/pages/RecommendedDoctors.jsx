import Layout from "./../components/Layout";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";
import DoctorCard from "../components/DoctorCard";
import { useLocation, useNavigate } from "react-router-dom";
import FilterSortForm from "../components/FilterSortForm";
import { medicalConditions } from "../data/meddata";
medicalConditions;

const RecommendedDoctors = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const predictedDisease = location.state && location.state.predictedDisease;
  let query = {
    specialization: { $in: medicalConditionsSpecializations[predictedDisease] },
  };
  // predDisease = predictedDisease;

  const [doctors, setDoctors] = useState();

  const getRecommendedDoctors = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/v1/user/getRecommendedDoctors`,
        { query },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
        console.log("D", doctors == null);
      } else {
        message.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };
  const onSubmitFilter = (values) => {
    console.log(values);
    query = {
      specialization: {
        $in: medicalConditionsSpecializations[predictedDisease],
      },
    };
    if (values.specialization) {
      query.specialization = { $in: values.specialization };
    }
    if (values.netRating) {
      query.netRating = { $gte: parseInt(values.netRating) };
    }
    if (values.timings) {
      query["timings.0"] = { $gte: values.timings[0] };
      query["timings.1"] = { $lte: values.timings[1] };
    }
    if (values.feesPerConsultation) {
      query.feesPerConsultation = {
        $lte: parseInt(values.feesPerConsultation),
      };
    }
    getRecommendedDoctors();
  };

  const onSubmitSort = async (values) => {
    // console.log("Hi");
    // console.log(values);
    if (!values.sortBy) {
      message.error("Choose sort by which property!");
      return;
    }
    const querysort = {};
    querysort[values.sortBy] = values.order;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/v1/user/getRecommendedDoctors`,
        {
          querysort,
          query,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res);
      if (res.data.success) {
        setDoctors(res.data.data);
      } else {
        message.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (predictedDisease == null) {
      navigate("/symptoms");
    }
    getRecommendedDoctors();
  }, []);

  return (
    <Layout>
      <h5 className="d-flex flex-column align-items-end my-3">
        <div>
          <span className="text-secondary">Your predicted disease is : </span>{" "}
          <span className="text-danger fw-bold">{predictedDisease}</span>
        </div>
      </h5>
      <h3 className="text-center">Recommended Doctors</h3>
      <FilterSortForm
        onSubmitSort={onSubmitSort}
        onSubmitFilter={onSubmitFilter}
      />
      <div className="d-flex">
        {doctors != null && doctors.length != 0
          ? doctors.map((doctor) => {
              return <DoctorCard doctor={doctor} />;
            })
          : "We are sorry there are no matching doctors available for your predicted disease 😔"}
        {/* {console.log(doctors)} */}
      </div>
    </Layout>
  );
};

export default RecommendedDoctors;
