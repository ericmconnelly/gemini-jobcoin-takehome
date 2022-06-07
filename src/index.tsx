import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { Login } from "./components/Login";
import { InvalidAddress } from "./components/InvalidAddress";
import { JobcoinMain } from "./components/JobcoinMain";
import reportWebVitals from "./utils/reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/address/" element={<InvalidAddress />} />
        <Route path="/address/:addressId" element={<JobcoinMain />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
