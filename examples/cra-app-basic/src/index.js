import { App } from "onekijs-cra";
import React from "react";
import ReactDOM from "react-dom";
import { Route, Switch, Link } from "react-router-dom";

ReactDOM.render(
  <App>
    <div
      style={{ backgroundColor: "#EEE", padding: "10px", marginBottom: "10px" }}
    >
      <Link to="/">Home</Link> | <Link to="/users">Users</Link>
    </div>
    <Switch>
      <Route path="/users">
        <div>This is the user page</div>
      </Route>
      <Route>
        <div>This is the main page</div>
      </Route>
    </Switch>
  </App>,
  document.getElementById("root")
);