import React from "react";
import { Route, Switch } from "react-router-dom";

import Main from "./main/index";

const App = ({ match }) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}main`} component={Main} />
    </Switch>
  </div>
);

export default App;
