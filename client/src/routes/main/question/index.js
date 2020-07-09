import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import asyncComponent from "util/asyncComponent";
import ability from "../../../authorization/ability";

const Question = ({ match }) => (
  <Switch>
    <Redirect exact from={`${match.url}/`} to={`${match.url}/interview`} />
    <Route
      path={`${match.url}/interview`}
      component={asyncComponent(() => import("./Interview/index"))}
    />
    {ability.can("view", "Import") && (
      <Route
        path={`${match.url}/import`}
        component={asyncComponent(() => import("./Import/index"))}
      />
    )}
  </Switch>
);

export default Question;
