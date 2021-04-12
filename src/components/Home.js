import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../actions";
import AdImg from "../img/ad.jpg";
import Wave from "../img/wave-2.svg";
import Menu from "./Menu";
import jsCookie from "js-cookie";
import { Redirect } from "react-router-dom";

const Home = ({ getUser, history }) => {
  const jwt = jsCookie.get("jwt");
  if (jwt) {
    return <Redirect to="/your-ads" />;
  }
  return (
    <>
      <Menu />
      <div className="hero">
        <div className="left">
          <div>
            <p className="hero__title">
              Make your <br></br>
              <span style={{ color: "#1cc06d" }}>ads Effective !</span>
            </p>
            <p className="hero__sub">Better way to make ads bring revenue</p>
          </div>
          <Link to="/signup" className="hero__button hvr-radial-in">
            Get start
          </Link>
        </div>

        <div className="right">
          <img src={AdImg} />
          <div className="wave">
            <img src={Wave} />
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, { getUser })(Home);
