import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:4000",
  timeout: 1000,
  headers: {
    Authorization: localStorage.getItem("token")
      ? localStorage.getItem("token")
      : null,
  },
});
