import React, { useEffect, useRef } from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import { signupAsAdmin } from "../actions";
import Logo from "../img/logo.png";
import { Link } from "react-router-dom";
import Cleave from "cleave.js/react";
import { BeatLoader } from "react-spinners";
import { css } from "styled-components";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #fff;
`;


const AuthForm = ({ signupAsAdmin,loading }) => {
  useEffect(() => {
    var cleave = new Cleave(inputEl, {
      phone: true,
      phoneRegionCode: "{country}",
    });
  }, []);
  const inputEl = useRef();
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      phoneno: "",
      address: "",
      password: "",
    },
    onSubmit: (values) => {
      signupAsAdmin(values);
    },
  });

  return (
    <div className="signup_container">
      <div className="signup_wrapper">
        <div className="signup__header">
          <Link to="/">
            <img src={Logo} />
          </Link>
          <p className="header__title">Sign Up</p>
        </div>
        <form onSubmit={formik.handleSubmit} className="form__signup">
          <div className="input__group">
            <div className="input__signup-wrapper">
              <label>firstname</label>
              <input
                type="text"
                name="firstname"
                onChange={formik.handleChange}
                value={formik.values.firstname}
              />
            </div>
            <div className="input__signup-wrapper">
              <label>lastname</label>
              <input
                type="text"
                name="lastname"
                onChange={formik.handleChange}
                value={formik.values.lastname}
              />
            </div>
          </div>
          <div className="input__signup-wrapper">
            <label>Username</label>
            <input
              type="text"
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
          </div>
          <div className="input__signup-wrapper">
            <label>Phone No</label>
            <Cleave options={{ phone: true, phoneRegionCode: "IN" }} />
          </div>
          <div className="input__signup-wrapper">
            <label>Email</label>
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </div>
          <div className="input__signup-wrapper">
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </div>
          <div className="input__signup-wrapper">
            <label>Address</label>
            <input
              type="text"
              name="address"
              onChange={formik.handleChange}
              value={formik.values.address}
            />
          </div>
          {loading ? (
            <button className="form__button">
              <BeatLoader css={override} loading={loading} color={"white"}  size={15} />
            </button>
          ) : (
            <button className="form__button">submit</button>
          )}
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.adReducers.loading,
  };
};

export default connect(mapStateToProps, { signupAsAdmin })(AuthForm);
