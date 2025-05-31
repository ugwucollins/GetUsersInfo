import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router } from "react-router-dom";
createRoot(document.getElementById("root")!).render(
  <Router>
    <StrictMode>
      <App />
      <ToastContainer />
    </StrictMode>
  </Router>
);
