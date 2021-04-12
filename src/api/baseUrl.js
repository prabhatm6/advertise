import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000/ad",
  // baseURL: "https://socialco.herokuapp.com",
});
