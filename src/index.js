import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import "react-datepicker/dist/react-datepicker.css";
import { Provider } from "react-redux";
import store from "./app/configs/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
