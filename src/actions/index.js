// const { default: axios } = require("axios");
import axios from "axios";
import jsCookie from "js-cookie";
import { NotificationManager } from "react-notifications";

// const URL = "http://localhost:5000/ad";
const URL = "https://advertise-backend.herokuapp.com/ad";

export const signup = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`${URL}/signup`, data);
      dispatch({ type: "SET_LOADING", payload: true });
      if (res.data.status === "success") {
        jsCookie.set("jwt", res.data.token);
        localStorage.setItem("userid", res.data.user.id);
        NotificationManager.success("Account is created!");
        setTimeout(() => {
          window.location.assign("/newad");
        }, 1000);
      }
    } catch (error) {
      const err = error.response.data.message;

      dispatch({ type: "SET_LOADING", payload: false });
      NotificationManager.error(err, "Error");
    }
  };
};
export const signupAsAdmin = (data, callback) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`${URL}/signup/as/admin`, data);
      dispatch({ type: "SET_LOADING", payload: true });
      if (res.data.status === "success") {
        NotificationManager.success("New admin is created!");
        callback();
        dispatch({ type: "SET_LOADING", payload: false });
      }
    } catch (error) {
      const err = error.response.data.message;
      dispatch({ type: "SET_LOADING", payload: false });
      NotificationManager.error(err, "Error");
    }
  };
};
export const login = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`${URL}/signin`, data);
      dispatch({ type: "SET_LOADING", payload: true });
      if (res.data.status === "success") {
        jsCookie.set("jwt", res.data.token);
        localStorage.setItem("userid", res.data.user.id);
        NotificationManager.success("successfully logged in", "Log in");
        setTimeout(() => {
          window.location.assign("/newad");
        }, 1000);
      }
    } catch (error) {
      dispatch({ type: "SET_LOADING", payload: false });
      const err = error.response.data.message;
      NotificationManager.error(err, "Error");
    }
  };
};
export const getUser = () => {
  return async (dispatch) => {
    try {
      const userid = localStorage.getItem("userid");
      const res = await axios.get(`${URL}/user/${userid}`);
      if (res.data.status === "success") {
        dispatch({ type: "USER", payload: res.data.user });
      }
    } catch (error) {
      // console.log(error.response);
    }
  };
};

export const getAd = (adid) => {
  return async (dispatch) => {
    try {
      const userid = localStorage.getItem("userid");
      const res = await axios.get(`${URL}/getad/single/${adid}`);
      if (res.data.status === "success") {
        dispatch({ type: "GET_AD", payload: res.data.ad });
      }
    } catch (error) {
      // console.log(error.response);
    }
  };
};
export const getAllUser = () => {
  return async (dispatch) => {
    try {
      const userid = localStorage.getItem("userid");
      const res = await axios.get(`${URL}`);
      // console.log(res.data);
      if (res.data.status === "success") {
        dispatch({ type: "ALL_USER", payload: res.data.data });
      }
    } catch (error) {
      // console.log(error.response);
    }
  };
};
export const logout = () => {
  return async (dispatch) => {
    try {
      const userid = localStorage.removeItem("userid");
      jsCookie.remove("jwt");
      setTimeout(() => {
        window.location.assign("/");
      }, 1000);
    } catch (error) {
      // console.log(error.response);
    }
  };
};
export const forgotPassword = (data, callback) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`${URL}/forgotpassword/user`, data);
      if (res.data.status === "success") {
        NotificationManager.success("Your password is updated!");
        callback();
      }
    } catch (error) {
      NotificationManager.error(error.response.data.message);
      // console.log(error.response);
    }
  };
};
export const deleteAd = (adid) => {
  return async (dispatch) => {
    try {
      const res = await axios.patch(`${URL}/ad/delete/${adid}`);
      if (res.data.status === "success") {
        const userid = localStorage.getItem("userid");
        const res = await axios.get(`${URL}/user/${userid}`);
        if (res.data.status === "success") {
          dispatch({ type: "USER", payload: res.data.user });
        }
        NotificationManager.success("video is deleted");
      }
    } catch (error) {
      NotificationManager.error(error.response.data.message);
      // console.log(error.response);
    }
  };
};

export const createAd = (data, callback) => {
  return async (dispatch) => {
    try {
      NotificationManager.warning("Please!wait");
      dispatch({ type: "SET_LOADING", payload: true });
      const token = jsCookie.get("jwt");
      const res = await axios.post(`${URL}/create/ad`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.status === "success") {
        // console.log(res.data);
        NotificationManager.success("Ad is created");
        dispatch({ type: "SET_LOADING", payload: false });
        getUser();
        callback();
      }
    } catch (error) {
      dispatch({ type: "SET_LOADING", payload: false });
      const err = error.response.data.message;
      NotificationManager.error(err, "Error");
    }
  };
};

export const checkout = (data, adid, callback) => {
  return async (dispatch) => {
    try {
      NotificationManager.warning("Please!wait");
      dispatch({ type: "SET_LOADING", payload: true });
      const token = jsCookie.get("jwt");
      const res = await axios.post(`${URL}/checkout/${adid}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.status === "success") {
        // console.log(res.data);
        NotificationManager.success(res.data.message);
        dispatch({ type: "SET_LOADING", payload: false });
        getUser();
        callback();
      }
    } catch (error) {
      dispatch({ type: "SET_LOADING", payload: false });
      const err = error.response.data.message;
      // console.log(error);
      NotificationManager.error(err, "Error");
    }
  };
};
