import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./app/configs/store";
import App from "./app/App";

import "bootstrap/dist/css/bootstrap.css";
import "react-datepicker/dist/react-datepicker.css";
import "simplebar/dist/simplebar.min.css";
import "react-contexify/dist/ReactContexify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode> ////bug with dnd lib. second render cause troubles
  <Provider store={store}>
    <App />
  </Provider>,
  // </React.StrictMode>,
);
