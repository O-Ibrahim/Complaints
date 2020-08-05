import React from "react";
import Login from "./components/auth/login";
import Complaints from "./components/complaints/complaints";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/complaints">Complaints</Link>
          </li>
        </ul>

        <hr />
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/complaints">
            <Complaints />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
