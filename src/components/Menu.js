import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUser, logout } from "../actions";
import cookie from "js-cookie";
import Logo from "../img/logo.png";

const Menu = ({ getUser, user, logout }) => {
  const jwt = cookie.get("jwt");
  // useEffect(() => {
  //   getUser();
  // }, []);
  return (
    <div>
      <>
        <nav className="navbar">
          <div className="logo">
            <img src={Logo} />
          </div>
          <ul
            className={
              user ? "navbar__list-after navbar__list" : "navbar__list"
            }
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
              <li>
                <Link
                  className="hvr-buzz-out hvr-underline-from-center"
                  to="/signup/as/admin"
                >
                  new admin
                </Link>
              </li>
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
          </ul>
        </nav>
      </>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.adReducers.user,
  };
};

export default connect(mapStateToProps, { logout, getUser })(Menu);
