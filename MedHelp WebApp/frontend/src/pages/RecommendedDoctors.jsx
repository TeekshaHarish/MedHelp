// import axios from "axios";
import Layout from "./../components/Layout";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";
import DoctorCard from "../components/DoctorCard";
import { useLocation } from "react-router-dom";
import FilterSortForm from "../components/FilterSortForm";
import { MdQuickreply } from "react-icons/md";

const medicalConditionsSpecializations = {
  "Fungal infection": ["Dermatologist", "General Practitioner"],
  Allergy: ["Allergist", "Immunologist", "General Practitioner"],
  GERD: ["Gastroenterologist", "General Practitioner"],
  "Chronic cholestasis": ["Hepatologist", "General Practitioner"],
  "Drug Reaction": ["Allergist", "Dermatologist", "General Practitioner"],
  "Peptic ulcer disease": [
    "Gastroenterologist",
    "General Surgeon",
    "General Practitioner",
  ],
  AIDS: ["Infectious Disease Specialist", "General Practitioner"],
  Diabetes: ["Endocrinologist", "General Practitioner"],
  Gastroenteritis: ["Gastroenterologist", "General Practitioner"],
  "Bronchial Asthma": ["Pulmonologist", "General Practitioner"],
  Hypertension: ["Cardiologist", "General Practitioner"],
  Migraine: ["Neurologist", "General Practitioner"],
  "Cervical spondylosis": ["Orthopedic Surgeon", "General Practitioner"],
  "Paralysis (brain hemorrhage)": ["Neurologist", "General Practitioner"],
  Jaundice: ["Hepatologist", "General Practitioner"],
  Malaria: ["Infectious Disease Specialist", "General Practitioner"],
  "Chicken pox": [
    "Pediatrician",
    "Infectious Disease Specialist",
    "General Practitioner",
  ],
  Dengue: ["Infectious Disease Specialist", "General Practitioner"],
  Typhoid: ["Infectious Disease Specialist", "General Practitioner"],
  "Hepatitis A": ["Hepatologist", "General Practitioner"],
  "Hepatitis B": ["Hepatologist", "General Practitioner"],
  "Hepatitis C": ["Hepatologist", "General Practitioner"],
  "Hepatitis D": ["Hepatologist", "General Practitioner"],
  "Hepatitis E": ["Hepatologist", "General Practitioner"],
  "Alcoholic hepatitis": ["Hepatologist", "General Practitioner"],
  Tuberculosis: [
    "Pulmonologist",
    "Infectious Disease Specialist",
    "General Practitioner",
  ],
  "Common Cold": ["General Practitioner", "Internal Medicine Physician"],
  Pneumonia: ["Pulmonologist", "General Practitioner"],
  "Dimorphic hemorrhoids (piles)": ["General Surgeon", "General Practitioner"],
  "Heart attack": ["Cardiologist", "General Practitioner"],
  "Varicose veins": ["Vascular Surgeon", "General Practitioner"],
  Hypothyroidism: ["Endocrinologist", "General Practitioner"],
  Hyperthyroidism: ["Endocrinologist", "General Practitioner"],
  Hypoglycemia: ["Endocrinologist", "General Practitioner"],
  Osteoarthritis: [
    "Rheumatologist",
    "Orthopedic Surgeon",
    "General Practitioner",
  ],
  Arthritis: ["Rheumatologist", "Orthopedic Surgeon", "General Practitioner"],
  "(Vertigo) Paroxysmal Positional Vertigo": [
    "ENT Specialist",
    "General Practitioner",
  ],
  Acne: ["Dermatologist", "General Practitioner"],
  "Urinary tract infection": ["Urologist", "General Practitioner"],
  Psoriasis: ["Dermatologist", "General Practitioner"],
  Impetigo: ["Dermatologist", "General Practitioner"],
};

let predDisease;
const RecommendedDoctors = () => {
  let query = {
    specialization: { $in: medicalConditionsSpecializations[predDisease] },
  };
  console.log("qr", query);
  const location = useLocation();
  //   const predictedDisease = location.state?.myProp;
  const predictedDisease = location.state && location.state.predictedDisease;
  predDisease = predictedDisease;
  console.log(predDisease);

  const [doctors, setDoctors] = useState();

  console.log(predDisease);
  console.log("SP", medicalConditionsSpecializations[predDisease]);
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
    // const query = {};
    query = {
      specialization: { $in: medicalConditionsSpecializations[predDisease] },
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
    console.log(query);
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
    // console.log(querysort);
    // console.log(doctors.sort(querysort));
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
    getRecommendedDoctors();
  }, []);

  return (
    <Layout>
      <h5 className="d-flex flex-column align-items-end my-3">
        <div>
          <span className="text-secondary">Your predicted disease is : </span>{" "}
          <span className="text-danger fw-bold">{predDisease}</span>
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