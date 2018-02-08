import React from "react";
import { Route, Switch } from "react-router-dom";
import Projects from "./containers/Projects/Projects";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import NotFound from "./components/NotFound/NotFound";

export default () =>
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/welcome" exact component={Projects} />
    <Route path="/login" exact component={Login} />
    <Route path="/signup" exact component={SignUp} />

    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;