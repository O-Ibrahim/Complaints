import React, { useState } from "react";
import api from "../../api/axios";
import Error from "./error";
import { Redirect } from "react-router-dom";
const Login = (props) => {
  let [loginInfo, setLoginInfo] = useState({
    username: "user@test.com",
    password: "12312312313",
  });

  let [error, setError] = useState("");

  if (localStorage.getItem("token")) {
    return <Redirect to="/complaints" />;
  }

  const onSubmit = async () => {
    try {
      let response = await api.post("/user/login", loginInfo);
      localStorage.setItem("token", "Bearer " + response.data.token);
      setError("");
    } catch (err) {
      setError(err.response.data.Error);
    }
  };
  return (
    <div className="text-center col-md-4 offset-md-4 mt-3">
      <div className="form-signin">
        <h1 className="h3 mb-3 font-weight-normal">Login</h1>
        {error.length > 0 ? <Error text={error} /> : null}
        &nbsp;
        <label htmlFor="inputEmail" className="sr-only">
          Email address
        </label>
        <input
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
          required
          autoFocus
          value={loginInfo.username}
          onChange={(e) => {
            setLoginInfo({ ...loginInfo, username: e.target.value });
          }}
        />
        <label htmlFor="inputPassword" className="sr-only mt-1">
          Password
        </label>
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          required
          value={loginInfo.password}
          onChange={(e) => {
            setLoginInfo({ ...loginInfo, password: e.target.value });
          }}
        />
        &nbsp;
        <button className="btn btn-lg btn-primary btn-block" onClick={onSubmit}>
          Sign in
        </button>
      </div>
    </div>
  );
};
export default Login;
