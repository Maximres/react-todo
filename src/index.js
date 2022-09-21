import React from "react";
import store from "@/app/configs/store";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import "react-datepicker/dist/react-datepicker.css";
import "simplebar/dist/simplebar.min.css";
import { AppErrorBoundary } from "@/components/AppErrorBoundary";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </Provider>,
);
