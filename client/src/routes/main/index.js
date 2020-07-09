import React from "react";
import { Route, Switch } from "react-router-dom";
import Question from "./question";
import User from "./User";
import ability from "../../authorization/ability";

const Main = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/question`} component={Question} />
    {ability.can("view", "User") && (
      <Route path={`${match.url}/user`} component={User} />
    )}
  </Switch>
);

export default Main;
