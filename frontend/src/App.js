import React from "react";
import { Router } from "react-router-dom";

import "./config/ReactotronConfig";
import Route from "./routes";
import history from "./services/history";

const App = () => {
  return (
    <Router history={history}>
      <Route />
    </Router>
  );
}

export default App;
