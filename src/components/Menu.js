import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUser, logout } from "../actions";
import cookie from "js-cookie";
import Logo from "../img/logo.png";
import "../App.css";
import styled from "styled-components";
import MoboMenu from "./MoboMenu";



const NavbarList = styled.ul`
  width: ${(props) => (props.user ? "40%" : "30%")};
  @media only screen and (max-width: 800px) {
    display: none;
  }
`;

const Menu = ({ getUser, user, logout }) => {
  const jwt = cookie.get("jwt");
  const [show, setShow] = useState(false);

  return (
    <div>
      <>
        <div show={show} className="navbar">
          <div className="logo">
            <img src={Logo} />
          </div>
          <NavbarList show={show} user={user} className="navbar__list">
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
            {/* <li>
              <Link
                className="hvr-buzz-out hvr-underline-from-center"
                to="/aboutus"
              >
                About
              </Link>
            </li> */}
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
          <div onClick={() => setShow(!show)} className="hamburger">
            <box-icon name="menu-alt-right" size="md"></box-icon>
          </div>
        </div>
      </>
      <MoboMenu show={show} setShow={setShow} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.adReducers.user,
  };
};

export default connect(mapStateToProps, { logout, getUser })(Menu);
