import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import { createAd, getUser } from "../actions";
import Menu from "./Menu";
import { ClipLoader } from "react-spinners";
import { css } from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const plan = {
  bbc: {
    "6:00am-9:00am": "12000",
    "9:00am-12:00pm": "20000",
    "12:00pm-5:00pm": "30000",
    "5:00pm-9:00pm": "40000",
  },
  cnn: {
    "6:00am-9:00am": "15000",
    "9:00am-12:00pm": "22000",
    "12:00pm-5:00pm": "45000",
    "5:00pm-9:00pm": "42000",
  },
  Discovery: {
    "6:00am-9:00am": "20000",
    "9:00am-12:00pm": "25000",
    "12:00pm-5:00pm": "32000",
    "5:00pm-9:00pm": "45000",
  },
  Rbharat: {
    "6:00am-9:00am": "10000",
    "9:00am-12:00pm": "12000",
    "12:00pm-5:00pm": "20000",
    "5:00pm-9:00pm": "30000",
  },
  Star: {
    "6:00am-9:00am": "30000",
    "9:00am-12:00pm": "40000",
    "12:00pm-5:00pm": "45000",
    "5:00pm-9:00pm": "50000",
  },
};

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #000;
`;

const NewAd = ({ createAd, getUser, loading, history }) => {
  const [date, setDate] = useState(null);
  useEffect(() => {
    getUser();
  }, []);
  const [file, setFile] = useState(null);
  const formik = useFormik({
    initialValues: {
      adname: "",
      releasedate: "",
      channel: "bbc",
      timings: "6:00am-9:00am",
      video: "",
      category: "commercial",
    },
    onSubmit: (values) => {
      const price = plan[`${values.channel}`][values.timings]
      console.log(price);
      const form = new FormData();
      form.append("adname", values.adname);
      form.append("releasedate", date);
      form.append("channel", values.channel);
      form.append("timings", values.timings);
      form.append("category", values.category);
      form.append("price", Number(price));
      form.append("video", file);
      createAd(form, () => history.push("/your-ads"));
    },
  });
  return (
    <>
      <Menu />
      <form className="form__ad" onSubmit={formik.handleSubmit}>
        <div className="form__ad-wrapper">
          <label>Ad name</label>
          <input
            type="text"
            name="adname"
            onChange={formik.handleChange}
            value={formik.values.adname}
          />
        </div>
        <div className="form__ad-wrapper">
          <label>release Date</label>
          <DatePicker
            autoComplete="off"
            selected={date}
            onChange={(date) => setDate(date)}
            name="releasedate"
            value={date}
            minDate={new Date()}
          />
        </div>
        <div className="form__ad-wrapper">
          <label>category</label>
          <select
            defaultValue="commercial"
            onChange={formik.handleChange}
            name="category"
          >
            <option>commercial</option>
            <option>matrimonials</option>
            <option>bevarages</option>
            <option>Eatables</option>
            <option>hygiene</option>
          </select>
        </div>
        <div className="form__ad-wrapper">
          <label>channel</label>
          <select
            defaultValue="bbc"
            onChange={formik.handleChange}
            name="channel"
          >
            <option>bbc</option>
            <option selected>Star</option>
            <option>Discovery</option>
            <option>Rbharat</option>
            <option>cnn</option>
          </select>
        </div>
        <div className="form__ad-wrapper">
          <label>timings</label>
          <select onChange={formik.handleChange} name="timings">
            <option selected value="6:00am-9:00am">
              6:00am-9:00am
            </option>
            <option>9:00am-12:00am</option>
            <option>12:00pm-5:00pm</option>
            <option>5:00pm-9:00pm</option>
          </select>
        </div>
        <div>
          <label className="form__ad-wrapper">upload content</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        {loading ? (
          <button className="ad__btn">
            <ClipLoader loading={true} color={"white"} size={15} />
          </button>
        ) : (
          <button className="ad__btn">submit</button>
        )}
      </form>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.adReducers.loading,
  };
};
export default connect(mapStateToProps, { createAd, getUser })(NewAd);
