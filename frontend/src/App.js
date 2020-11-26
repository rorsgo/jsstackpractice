import React from "react";
import { Router } from "react-router-dom";

import GlobalStyles from "./styles/global";
import "./config/ReactotronConfig";
import Route from "./routes";
import history from "./services/history";

const App = () => {
  return (
    <Router history={history}>
      <GlobalStyles />
      <Route />
    </Router>
  );
}

export default App;
