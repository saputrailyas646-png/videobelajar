import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./assets/styles/global.css";

import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import HomePage from "./pages/home";

const app = document.getElementById("root");

const root = createRoot(app);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  </BrowserRouter>,
);
