import Layout from "./../components/Layout";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";
import DoctorCard from "../components/DoctorCard";
import FilterSortForm from "../components/FilterSortForm";

const AllDoctors = () => {
  let query = {};
  const [doctors, setDoctors] = useState();
  const getAllDoctors = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/v1/user/getAllDoctors`,
        { query: query },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
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

  const onSubmitFilter = (values) => {
    console.log(values);
    // const query = {};
    query = {};
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
    console.log(query);
    getAllDoctors();
  };

  const onSubmitSort = async (values) => {
    // console.log("Hi");
    console.log(values);
    if (!values.sortBy) {
      message.error("Choose sort by which property!");
      return;
    }
    const querysort = {};
    querysort[values.sortBy] = values.order;
    // console.log(querysort);
    // console.log(doctors.sort(querysort));
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/v1/user/sortAllDoctors`,
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
    getAllDoctors();
  }, []);

  return (
    <Layout>
      <h3 className="text-center pt-3">You can find the best Doctors here!</h3>
      <FilterSortForm
        onSubmitSort={onSubmitSort}
        onSubmitFilter={onSubmitFilter}
      />
      <div className="d-flex justify-content-center flex-wrap align-items-center">
        {doctors &&
          doctors.map((doctor) => {
            return <DoctorCard doctor={doctor} />;
          })}
      </div>
    </Layout>
  );
};

export default AllDoctors;
