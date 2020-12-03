import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";

import GlobalStyles from "./styles/global";
import "./config/ReactotronConfig";
import Route from "./routes";
import history from "./services/history";
import store from "./store";

const App = () => {
  return (
    <Router history={history}>
      <Provider store={store}>
        <GlobalStyles />
        <Route />
      </Provider>
    </Router>
  );
}

export default App;
