import React from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import { login } from "../actions";
import Logo from "../img/logo.png";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { css } from "styled-components";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #fff;
`;

const Signin = (props) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
      props.login(values);
    },
  });

  return (
    <div className="container">
      <div className="wrapper">
        <div className="header">
          <Link to="/">
            <img src={Logo} />
          </Link>
          <p className="header__title">Login</p>
          <p className="header__subtitle">Welcome back</p>
        </div>
        <form onSubmit={formik.handleSubmit} className="form">
          <div className="input__wrapper">
            <label>Email</label>
            <input
              // placeholder="Enter your Email"
              type="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </div>
          <div className="input__wrapper">
            <label>password</label>
            <input
              type="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <p className="forgot">forgot your password?</p>
          </div>
          {props.loading ? (
            <button className="form__button">
              <BeatLoader css={override} loading={props.loading} color={"white"}  size={15} />
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

export default connect(mapStateToProps, { login })(Signin);
