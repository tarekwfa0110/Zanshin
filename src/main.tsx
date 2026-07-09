import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AllActivities from "./AllActivities";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/all-activities" element={<AllActivities />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
