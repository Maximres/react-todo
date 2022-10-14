import React from "react";
import store from "@/app/configs/store";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import "react-datepicker/dist/react-datepicker.css";
import "simplebar/dist/simplebar.min.css";
import { AppErrorBoundary } from "@/components/AppErrorBoundary";
import theme from "@/app/configs/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <AppErrorBoundary>
        <CssBaseline />
        <App />
      </AppErrorBoundary>
    </ThemeProvider>
  </Provider>,
);
