import React, { useState } from "react";
import Layout from "../components/Layout";
import { Col, Form, Input, Row, Select, TimePicker, message } from "antd";
// import "antd/dist/antd.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Symptoms = () => {
  const symptoms = [
    "Itching",
    "Skin Rash",
    "Nodal Skin Eruptions",
    "Continuous Sneezing",
    "Shivering",
    "Chills",
    "Joint Pain",
    "Stomach Pain",
    "Acidity",
    "Ulcers On Tongue",
    "Muscle Wasting",
    "Vomiting",
    "Burning Micturition",
    "Spotting  Urination",
    "Fatigue",
    "Weight Gain",
    "Anxiety",
    "Cold Hands And Feets",
    "Mood Swings",
    "Weight Loss",
    "Restlessness",
    "Lethargy",
    "Patches In Throat",
    "Irregular Sugar Level",
    "Cough",
    "High Fever",
    "Sunken Eyes",
    "Breathlessness",
    "Sweating",
    "Dehydration",
    "Indigestion",
    "Headache",
    "Yellowish Skin",
    "Dark Urine",
    "Nausea",
    "Loss Of Appetite",
    "Pain Behind The Eyes",
    "Back Pain",
    "Constipation",
    "Abdominal Pain",
    "Diarrhoea",
    "Mild Fever",
    "Yellow Urine",
    "Yellowing Of Eyes",
    "Acute Liver Failure",
    "Fluid Overload",
    "Swelling Of Stomach",
    "Swelled Lymph Nodes",
    "Malaise",
    "Blurred And Distorted Vision",
    "Phlegm",
    "Throat Irritation",
    "Redness Of Eyes",
    "Sinus Pressure",
    "Runny Nose",
    "Congestion",
    "Chest Pain",
    "Weakness In Limbs",
    "Fast Heart Rate",
    "Pain During Bowel Movements",
    "Pain In Anal Region",
    "Bloody Stool",
    "Irritation In Anus",
    "Neck Pain",
    "Dizziness",
    "Cramps",
    "Bruising",
    "Obesity",
    "Swollen Legs",
    "Swollen Blood Vessels",
    "Puffy Face And Eyes",
    "Enlarged Thyroid",
    "Brittle Nails",
    "Swollen Extremeties",
    "Excessive Hunger",
    "Extra Marital Contacts",
    "Drying And Tingling Lips",
    "Slurred Speech",
    "Knee Pain",
    "Hip Joint Pain",
    "Muscle Weakness",
    "Stiff Neck",
    "Swelling Joints",
    "Movement Stiffness",
    "Spinning Movements",
    "Loss Of Balance",
    "Unsteadiness",
    "Weakness Of One Body Side",
    "Loss Of Smell",
    "Bladder Discomfort",
    "Foul Smell Of Urine",
    "Continuous Feel Of Urine",
    "Passage Of Gases",
    "Internal Itching",
    "Toxic Look (Typhos)",
    "Depression",
    "Irritability",
    "Muscle Pain",
    "Altered Sensorium",
    "Red Spots Over Body",
    "Belly Pain",
    "Abnormal Menstruation",
    "Dischromic  Patches",
    "Watering From Eyes",
    "Increased Appetite",
    "Polyuria",
    "Family History",
    "Mucoid Sputum",
    "Rusty Sputum",
    "Lack Of Concentration",
    "Visual Disturbances",
    "Receiving Blood Transfusion",
    "Receiving Unsterile Injections",
    "Coma",
    "Stomach Bleeding",
    "Distention Of Abdomen",
    "History Of Alcohol Consumption",
    "Fluid Overload.1",
    "Blood In Sputum",
    "Prominent Veins On Calf",
    "Palpitations",
    "Painful Walking",
    "Pus Filled Pimples",
    "Blackheads",
    "Scurring",
    "Skin Peeling",
    "Silver Like Dusting",
    "Small Dents In Nails",
    "Inflammatory Nails",
    "Blister",
    "Red Sore Around Nose",
    "Yellow Crust Ooze",
  ];
  const medicalConditions = [
    "Fungal infection",
    "Allergy",
    "GERD",
    "Chronic cholestasis",
    "Drug Reaction",
    "Peptic ulcer disease",
    "AIDS",
    "Diabetes",
    "Gastroenteritis",
    "Bronchial Asthma",
    "Hypertension",
    "Migraine",
    "Cervical spondylosis",
    "Paralysis (brain hemorrhage)",
    "Jaundice",
    "Malaria",
    "Chicken pox",
    "Dengue",
    "Typhoid",
    "Hepatitis A",
    "Hepatitis B",
    "Hepatitis C",
    "Hepatitis D",
    "Hepatitis E",
    "Alcoholic hepatitis",
    "Tuberculosis",
    "Common Cold",
    "Pneumonia",
    "Dimorphic hemorrhoids (piles)",
    "Heart attack",
    "Varicose veins",
    "Hypothyroidism",
    "Hyperthyroidism",
    "Hypoglycemia",
    "Osteoarthritis",
    "Arthritis",
    "(Vertigo) Paroxysmal Positional Vertigo",
    "Acne",
    "Urinary tract infection",
    "Psoriasis",
    "Impetigo",
  ];
  const medicalConditionsSpecializations = {
    "Fungal infection": ["Dermatologist", "General Practitioner"],
    Allergy: ["Allergist", "Immunologist", "General Practitioner"],
    GERD: ["Gastroenterologist", "General Practitioner"],
    "Chronic cholestasis": ["Hepatologist", "Gastroenterologist"],
    "Drug Reaction": ["Allergist", "Dermatologist", "General Practitioner"],
    "Peptic ulcer disease": ["Gastroenterologist", "General Surgeon"],
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
    "Dimorphic hemorrhoids (piles)": [
      "General Surgeon",
      "General Practitioner",
    ],
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

  const navigate = useNavigate();
  const [formTimings, setFormTimings] = useState();
  const onFinishHandler = async (values) => {
    try {
      console.log(values);
      let symptomslist = [];
      for (let key in values) {
        if (values[key] != null) {
          symptomslist.push(values[key]);
        }
      }
      console.log(symptomslist);
      //   return;
      //   console.log({
      //     ...values,
      //     timings: [
      //       values.timings[0].format("HH:mm"),
      //       values.timings[1].format("HH:mm"),
      //     ],
      //   });
      // console.log("BEFORE", values);
      // console.log(values.timings[0], values.timings[1]);
      // console.log(
      //   moment(values.timings[0], "HH:mm").format("HH:mm"),
      //   moment(values.timings[1], "HH:mm").format("HH:mm")
      // );
      //   console.log("FORM", formTimings);
      const res = await axios.post(
        "http://127.0.0.1:5000/predictapi",
        {
          symptoms: symptomslist,
        },
        {}
        // {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem("token")}`,
        //   },
        // }
      );
      console.log(res);
      if (res.data.success) {
        const disease = res.data["Predicted Disease"];
        console.log(disease);
        message.warning(`You have ${disease} as per our predictions`);
        navigate("/recommended-doctors", {
          state: { predictedDisease: disease },
        });
        // navigate("/");
      } else {
        message.error("Error while fetching predicting data from ML Model");
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  const option = symptoms.map((symptom) => ({
    value: symptom,
    label: symptom,
  }));
  console.log(option);
  return (
    <Layout>
      <h1 className="text-center">Apply Doctor</h1>
      <Form layout="vertical" onFinish={onFinishHandler} className="m-4">
        <h4>Enter Symptoms</h4>

        {/* <Form.Item
          label="First name"
          name="firstName"
          required
          rules={[{ required: true }]}
        >
          <Input type="text" placeholder="your first name" />
        </Form.Item> */}
        <div className="container">
          <Form.Item
            label="Symptom 1"
            name="symptom1"
            required
            rules={[{ required: true }]}
          >
            <Select
              showSearch
              style={{ width: 400 }}
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label.toLowerCase() ?? "").includes(
                  input.toLowerCase()
                )
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={option}
            />
          </Form.Item>
          <Form.Item
            label="Symptom 2"
            name="symptom2"
            required
            rules={[{ required: true }]}
          >
            <Select
              showSearch
              style={{ width: 400 }}
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label.toLowerCase() ?? "").includes(
                  input.toLowerCase()
                )
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={option}
            />
          </Form.Item>

          <Form.Item label="Symptom 3" name="symptom3">
            <Select
              showSearch
              style={{ width: 400 }}
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label.toLowerCase() ?? "").includes(
                  input.toLowerCase()
                )
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={option}
            />
          </Form.Item>

          <Form.Item label="Symptom 4" name="symptom4">
            <Select
              showSearch
              style={{ width: 400 }}
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label.toLowerCase() ?? "").includes(
                  input.toLowerCase()
                )
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={option}
            />
          </Form.Item>

          <Form.Item label="Symptom 5" name="symptom5">
            <Select
              showSearch
              style={{ width: 400 }}
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label.toLowerCase() ?? "").includes(
                  input.toLowerCase()
                )
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={option}
            />
          </Form.Item>
        </div>

        <div className="d-flex justify-content-end">
          <button className="btn btn-dark" type="submit">
            Submit
          </button>
        </div>
      </Form>
    </Layout>
  );
};

export default Symptoms;
