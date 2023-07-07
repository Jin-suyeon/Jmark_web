import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { store } from "./feature";
import { Provider } from "react-redux";
// import "@/apis/initializeAxios";
// import { SnackbarProvider } from "notistack";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    {/* <SnackbarProvider maxSnack={3} autoHideDuration={2500}> */}
    <App />
    {/* </SnackbarProvider> */}
  </Provider>
);

//! connected-react-router
