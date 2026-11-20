import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./assets/styles/global.css";

import { useCourseStore } from "./store/useCourseStore";

import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import HomePage from "./assets/Homepage/home";
import CategoriPage from "./assets/Homepage/kategori";
import InformationProduct from "./assets/Homepage/infoproduct";
import MetodePage from "./assets/Homepage/metode";
import MetodePage1 from "./assets/Homepage/metode1-1";
import {
  PembayaranBerhasil,
  PembayaranTertunda,
  PembayaranGagal,
} from "./assets/Homepage/statuspembayaran";
import PesananPage from "./assets/Homepage/pesanan";
import KelasPage from "./assets/Homepage/kelas";
import ProfilPage from "./assets/Homepage/profil";
import AutoLogout from "./assets/component/autoLogout";
gitimport BelajarPage from "./assets/Homepage/belajar";
import SertifikatPage from "./assets/Homepage/sertifikat";
import KelolaKursusPage from "./assets/Homepage/kelolakursus";

// Ambil data kursus dari API satu kali saat app dibuka
useCourseStore.getState().fetchCourses();
const root = createRoot(document.getElementById("root"));
root.render(<p style={{ padding: 24 }}>Memuat data...</p>);

// Tampilkan aplikasi setelah data kursus selesai dimuat dari API
useCourseStore
  .getState()
  .fetchCourses()
  .then(() => {
    root.render(
      <BrowserRouter>
        <AutoLogout />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/category" element={<CategoriPage />} />
          <Route path="/information/:id" element={<InformationProduct />} />
          <Route path="/metode/:id" element={<MetodePage />} />
          <Route path="/metode1/:id" element={<MetodePage1 />} />
          <Route path="/pembayaran-berhasil" element={<PembayaranBerhasil />} />
          <Route path="/pembayaran-tertunda" element={<PembayaranTertunda />} />
          <Route path="/pembayaran-gagal" element={<PembayaranGagal />} />
          <Route path="/pesanan" element={<PesananPage />} />
          <Route path="/kelas" element={<KelasPage />} />
          <Route path="/profil" element={<ProfilPage />} />
          <Route path="/belajar/:id" element={<BelajarPage />} />
          <Route path="/sertifikat/:id" element={<SertifikatPage />} />
          <Route path="/kelola-kursus" element={<KelolaKursusPage />} />
        </Routes>
      </BrowserRouter>,
    );
  });