import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import { createAd, getUser } from "../actions";
import Menu from "./Menu";
import { ClipLoader } from "react-spinners";
import { css } from "styled-components";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #000;
`;

const NewAd = ({ createAd, getUser, loading, history }) => {
  console.log(loading);
  useEffect(() => {
    getUser();
  }, []);
  const [file, setFile] = useState(null);
  const formik = useFormik({
    initialValues: {
      adname: "",
      releasedate: "",
      channel: "",
      timings: "",
      video: "",
      category:''
    },
    onSubmit: (values) => {
      console.log(values);
      const form = new FormData();
      form.append("adname", values.adname);
      form.append("releasedate", values.releasedate);
      form.append("channel", values.channel);
      form.append("timings", values.timings);
      form.append("category", values.category);
      form.append("video", file);
      createAd(form, () => history.push("/your-ads"));
    },
  });
  return (
    <>
      <Menu />
      {/* <div className="ad-wrapper"> */}
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
          <input
            type="date"
            name="releasedate"
            onChange={formik.handleChange}
            value={formik.values.releasedate}
          />
        </div>
        <div className="form__ad-wrapper">
          <label>category</label>
          <select onChange={formik.handleChange} name="category">
            <option>commercial</option>
            <option>matrimonials</option>
            <option>bevarages</option>
            <option>Eatables</option>
            <option>hygiene</option>
          </select>
        </div>
        <div className="form__ad-wrapper">
          <label>channel</label>
          <select onChange={formik.handleChange} name="channel">
            <option>bbc</option>
            <option>star</option>
            <option>Disacovery</option>
            <option>R.bharat</option>
            <option>CNN</option>
          </select>
        </div>
        <div className="form__ad-wrapper">
          <label>timings</label>
          <select onChange={formik.handleChange} name="timings">
            <option>6:00am-9:00am</option>
            <option>9:00am-12:00am</option>
            <option>12:00pm-5:00pm</option>
            <option>5:00pm-9:00pm</option>
          </select>
        </div>
        <div>
          <label className="form__ad-wrapper">upload content</label>
          <input
            type="file"
            // name="video"
            onChange={(e) => setFile(e.target.files[0])}
            // value={file.name}
          />
        </div>
        {loading ? (
          <button className="ad__btn">
            <ClipLoader
              // css={override}
              loading={true}
              color={"white"}
              size={15}
            />
          </button>
        ) : (
          <button className="ad__btn">submit</button>
        )}
      </form>
      {/* </div> */}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.adReducers.loading,
  };
};
export default connect(mapStateToProps, { createAd, getUser })(NewAd);
