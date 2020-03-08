import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "../src/app/App";
import "./scss/_.scss";
import "./font/Mont.otf";
import "./font/EULA Free Font License Ver. 2.0.pdf";
import "./font/Mont-HeavyDEMO.otf";
import "./font/Mont_Specimen.pdf";
import * as serviceWorker from "./serviceWorker";

import {
  BrowserRouter as Router
}

from "react-router-dom";

ReactDOM.render(<Router> <App /> </Router>,
  document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();