import React, { Component } from "react";
import ReactDOM from "react-dom";

import store from "./store";
import "./styles.css";
import App from "./containers";

const rootElement = document.getElementById("root");
ReactDOM.render(<App store={store} />, rootElement);