import React, { useState } from "react";
import {
  Col,
  Form,
  Input,
  Row,
  Select,
  TimePicker,
  message,
  Radio,
} from "antd";
import "../../public/stylesheets/FilterSort.css";

const FilterSortForm = ({ onSubmitFilter, onSubmitSort }) => {
  const options = [
    { value: "feesPerConsultation", label: "Fees Per Consultation" },
    { value: "timings", label: "Timings" },
    { value: "netRating", label: "User Ratings" },
  ];

  const specialisation = [
    "ENT Specialist",
    "Dermatologist",
    "Urologist",
    "Orthopedic Surgeon",
    "Rheumatologist",
    "Endocrinologist",
    "Vascular Surgeon",
    "Cardiologist",
    "General Surgeon",
    "Internal Medicine Physician",
    "Hepatologist",
    "Pulmonologist",
    "General Practitioner",
    "Infectious Disease Specialist",
    "Pediatrician",
    "Neurologist",
    "Gastroenterologist",
    "Allergist",
    "Immunologist",
  ];

  const options2 = specialisation.map((spc) => ({
    value: spc,
    label: spc,
  }));

  const [order, setOrder] = useState(1);

  const onChangeRadio = (e) => {
    console.log("radio checked", e.target.value);
    setOrder(e.target.value);
  };
  return (
    <div className="container">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-lg-6 mt-4">
          <Form
            onFinish={(values) => {
              onSubmitSort({ ...values, order });
            }}
          >
            <div className="row my-3 sortdiv">
              {/* <div className="col-md-4"> */}
              <Form.Item
                label="Sort By"
                name="sortBy"
                className="sort-downdown"
                style={{
                  width: "45%",
                }}
              >
                {/* <Input type="text" placeholder="your specialization" /> */}
                <Select
                  // mode="multiple"
                  // allowClear
                  style={{
                    width: "100%",
                  }}
                  placeholder="Sort By"
                  defaultValue={[]}
                  // onChange={handleChange}
                  options={options}
                />
              </Form.Item>
              {/* </div>
          <div className="col-md-4"> */}
              <div
                className="btn-group"
                role="group"
                aria-label="Basic radio toggle button group"
                style={{ height: "35px", width: "35px" }}
              >
                <input
                  type="radio"
                  className="btn-check"
                  name="btnradio"
                  id="btnradio1"
                  autocomplete="off"
                  checked
                />
                <label className="btn btn-outline-primary" for="btnradio1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    style={{ height: "15px", width: "15px" }}
                  >
                    <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                  </svg>
                </label>

                <input
                  type="radio"
                  className="btn-check d-flex align-items-center "
                  name="btnradio"
                  id="btnradio2"
                  autocomplete="off"
                />
                <label className="btn btn-outline-primary" for="btnradio2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    style={{ height: "15px", width: "15px" }}
                  >
                    <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                  </svg>
                </label>
              </div>
              {/* <Radio.Group name="order" onChange={onChangeRadio} value={order}>
                <Radio value={1}>Ascending</Radio>
                <Radio value={-1}>Descending</Radio>
              </Radio.Group> */}
              {/* </div>
          <div className="col-md-4"> */}
              <button
                className="btn btn-primary sort-button mx-auto"
                HTMLtype="submit"
              >
                Sort
              </button>
              {/* </div> */}
            </div>
          </Form>
        </div>
        <div className="col-lg-6">
          <div className="accordion accordion-flush" id="accordionExample">
            <div className="accordion-item">
              <h2
                className="accordion-header"
                id="headingOne"
                style={{ background: "none" }}
              >
                <button
                  className="accordion-button collapsed accitem"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Filter By
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <Form
                    onFinish={(values) => {
                      let obj = values;
                      if (values.timings != null) {
                        obj = {
                          ...obj,
                          timings: [
                            values.timings[0].format("HH:mm"),
                            values.timings[1].format("HH:mm"),
                          ],
                        };
                      }
                      onSubmitFilter(obj);
                    }}
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <Form.Item label="Fees" name="feesPerConsultation">
                          <Input type="number" placeholder="Maximum fees" />
                        </Form.Item>
                      </div>
                      <div className="col-md-6">
                        <Form.Item label="Rating" name="netRating">
                          <Input type="number" placeholder="Minimum rating" />
                        </Form.Item>
                      </div>
                    </div>
                    {/* <div className="row">
                      <div className="col-md-6"> */}
                    <Form.Item label="Timings" name="timings">
                      <TimePicker.RangePicker
                        format="HH:mm"
                        minuteStep={30}
                        hourStep={1}
                      />
                    </Form.Item>
                    {/* </div> */}
                    {/* <div className="col-md-6"> */}
                    <Form.Item label="Specialization" name="specialization">
                      <Select
                        mode="multiple"
                        allowClear
                        style={{
                          width: "100%",
                        }}
                        placeholder="Please select your specialization"
                        // onChange={handleChange}
                        options={options2}
                      />
                    </Form.Item>
                    {/* </div> */}
                    {/* </div> */}

                    <div>
                      <button
                        className="btn btn-primary mx-auto text-center"
                        HTMLtype="submit"
                      >
                        Filter
                      </button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSortForm;
