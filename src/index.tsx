import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import FormCreation from "./Redux/FormCreation";
import Style from "./Redux/Style";
import Modal from "./Redux/Modal";
import EndPoint from "./Redux/EndPoint";
import UserProfile from "./Redux/UserProfile";
import { BrowserRouter } from "react-router-dom";
import FormLinks from "./Redux/FormLinks";
import FillForm from "./Redux/FillForm";
import Registered from "./Redux/Registered";
import DashDetails from "./Redux/DashDetails";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const store = configureStore({
  reducer: {
    form: FormCreation,
    style: Style,
    modal: Modal,
    endpoint: EndPoint,
    profiledetails: UserProfile,
    link: FormLinks,
    fillform: FillForm,
    registrationinfo: Registered,
    dashdetails: DashDetails,
  },
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
