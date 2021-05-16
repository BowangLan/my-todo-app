import React, { useState, useCallback, useEffect } from "react";
// import "./App.scss";
import App1 from "./App1";
import Appb from "./Appb";
import { GlobalContextProvider } from "./context";

const App = () => {
  return (
    <GlobalContextProvider>
      <App1 />
    </GlobalContextProvider>
  );
};

export default App;
