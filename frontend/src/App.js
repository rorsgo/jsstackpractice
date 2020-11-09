import React from "react";
import { BrowserRouter } from "react-router-dom";

import GlobalStyle from "./styles/global";
import Routes from "./routes";

import Header from "./components/Header";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <Routes />
        <Header />
      </BrowserRouter>
    </>
  )
}

export default App;