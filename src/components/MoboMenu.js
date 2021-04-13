import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUser, logout } from "../actions";
import cookie from "js-cookie";
import Logo from "../img/logo.png";
import "../App.css";
import styled from "styled-components";

const NavbarList = styled.ul`
  width: ${(props) => (props.user ? "40%" : "30%")};
  display: ${(props) => (props.show ? "flex !important" : "none")};
  justify-content: space-between;
  align-items: center;

  @media only screen and (min-width: 800px) {
    display: none !important;
  }
`;

const MoboMenu = ({ getUser, user, show, setShow, logout }) => {
  const jwt = cookie.get("jwt");
  return (
    <div>
      <>
        <NavbarList
          show={show}
          setShow={setShow}
          user={user}
          className="navbar__list"
        >
          {!user && (
            <>
              <li>
                <Link
                  className="hvr-buzz-out hvr-underline-from-center"
                  to="/signin"
                >
                  signin
                </Link>
              </li>
              <li>
                <Link
                  className="hvr-buzz-out hvr-underline-from-center"
                  to="/signup"
                >
                  signup
                </Link>
              </li>
            </>
          )}

          {!user && (
            <li>
              <Link
                className="hvr-buzz-out hvr-underline-from-center"
                to="/signin/as/admin"
              >
                admin
              </Link>
            </li>
          )}
          {user && user.isAdmin && (
            <>
              <li>
                <Link
                  className="hvr-buzz-out hvr-underline-from-center"
                  to="/signup/as/admin"
                >
                  new admin
                </Link>
              </li>
              <li>
                <Link
                  className="hvr-buzz-out hvr-underline-from-center"
                  to="/ad/users"
                >
                  users
                </Link>
              </li>
            </>
          )}
          {jwt && (
            <li>
              <Link
                className="hvr-buzz-out hvr-underline-from-center"
                to="/newad"
              >
                newAd
              </Link>
            </li>
          )}
          {user && (
            <li>
              <Link
                className="hvr-buzz-out hvr-underline-from-center"
                to="/your-ads"
              >
                my ads
              </Link>
            </li>
          )}
          <li>
            <Link
              className="hvr-buzz-out hvr-underline-from-center"
              to="/budget"
            >
              Budget
            </Link>
          </li>
          <li>
            <Link
              className="hvr-buzz-out hvr-underline-from-center"
              to="/aboutus"
            >
              About
            </Link>
          </li>
          {user && (
            <li>
              <Link
                className="hvr-buzz-out hvr-underline-from-center"
                to="#"
                onClick={logout}
              >
                logout
              </Link>
            </li>
          )}
          <div className="cross" onClick={() => setShow(!show)}>
            <box-icon name="x" size="md"></box-icon>
          </div>
        </NavbarList>
      </>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.adReducers.user,
  };
};

export default connect(mapStateToProps, { logout, getUser })(MoboMenu);
