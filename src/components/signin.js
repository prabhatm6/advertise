import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import { login } from "../actions";
import Logo from "../img/logo.png";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { css } from "styled-components";
import Wave from "../img/blob-1.svg";

import Back1 from "../img/ad-1.jpg";
import Back2 from "../img/ad-3.jpg";
import Back3 from "../img/ad-bill.jpg";

const backgrounds = [Back1, Back2, Back3];
const override = css`
  display: block;
  margin: 0 auto;
  border-color: #fff;
`;

const Signin = (props) => {
  const [randomNum, setRandom] = useState(null);
  useEffect(() => {
    setRandom(Math.floor(Math.random() * 3));
  }, []);

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
      <div className="container__background">
        <img src={backgrounds[randomNum]} />
      </div>
      <div className="wrapper">
        <div className="header">
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
          <p className="header__title">Login</p>
          <p className="header__subtitle">Welcome back</p>
        </div>
        <form onSubmit={formik.handleSubmit} className="form">
          <div className="input__wrapper">
            <label>Email</label>
            <input
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
            <Link to="/forgotpassword" className="forgot">
              forgot your password?
            </Link>
          </div>
          {props.loading ? (
            <button className="form__button">
              <BeatLoader
                css={override}
                loading={props.loading}
                color={"white"}
                size={15}
              />
            </button>
          ) : (
            <button className="form__button">submit</button>
          )}
          <div className="form__option">
            <p>
              Don't have an account?<Link to="/signup">Join</Link>
            </p>
          </div>
          <div className="form__wave">
            <img src={Wave} alt="wave" />
          </div>
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
