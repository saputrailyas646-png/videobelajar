import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./assets/styles/global.css";

import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import HomePage from "./assets/Homepage/home";
import CategoriPage from "./assets/Homepage/kategori";
import InformationProduct from "./assets/Homepage/infoproduct";

const app = document.getElementById("root");

const root = createRoot(app);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/category" element={<CategoriPage />} />
      <Route path="/information" element={<InformationProduct />} />
    </Routes>
  </BrowserRouter>,
);
