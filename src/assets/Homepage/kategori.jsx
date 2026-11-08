
import { useState } from "react";

import "../styles/category.css";
import "../styles/global.css";

import logo from "../logo.png";

function CategoriPage() {
  const [menuOpen, setMenuOpen] = useState(true);
  
  const [kategoriOpen, setKategoriOpen] = useState(false);
  const [perusahaanOpen, setPerusahaanOpen] = useState(false);
  const [komunitasOpen, setKomunitasOpen] = useState(false);
    return (
      <>
        <nav className="navbar">
          <img src={logo} alt="logo" className="imglogo" />
          <button onClick={() => setMenuOpen(!menuOpen)} className="hamburger">
            {" "}
            ☰
          </button>
          <div className={`nav-menu ${menuOpen ? "active" : ""}`}>
            <a className="beranda" href="/">
              Beranda
            </a>
            <a className="kategori" href="/category">
              Kategori
            </a>
            <a className="login" href="/login">
              Login
            </a>
            <a className="register" href="/register">
              Register
            </a>
          </div>
        </nav>
        <main className="main">
          <div className="heding">
            <h1>Koleksi Video Pembelajaran Unggulan</h1>
            <p>Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!</p>
          </div>
          <div className="counten">
            <div className="sidebarbox">
              <div className="span-side">
                <span>Filter</span>
                <span className="reset">Reset</span>
              </div>
              <div className="menu-sidebar">
                <div className="menu">
                  <h3>Bidang study</h3>
                  <div className="listmenu">
                    <p>Pemasara</p>
                    <p>Digital & Teknlogi</p>
                    <p>Pengembangan Diri</p>
                    <p>Bisnis Manajemen</p>
                  </div>
                </div>
                <div className="menu">
                  <h3>Harga</h3>
                  <div className="listmenu">
                    <p>Pemasara</p>
                    <p>Digital & Teknlogi</p>
                    <p>Pengembangan Diri</p>
                    <p>Bisnis Manajemen</p>
                  </div>
                </div>
                <div className="menu">
                  <h3> Durasi</h3>
                  <div className="listmenu">
                    <p>Kurang dari 4 jam</p>
                    <p>4-8 Jam</p>
                    <p> Lebih dari 8 jam</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="videocard">
              <p>hallo word </p>
            </div>
          </div>
        </main>

        <footer className="footer-container">
          <div className="boxfooter">
            <div className="footer1">
              <img src={logo} alt="logo" className="imglogo" />
              <p>Platform Video Pembelajaran untuk meningkatkan skill.</p>
              <p>Jl. Pendidikan No. 50, Indonesia</p>
              <p>+62-812-3456-7890</p>
            </div>

            <div className="listfooter">
              {/* KATEGORI */}
              <div className="footer-column">
                <h3 onClick={() => setKategoriOpen(!kategoriOpen)}>
                  Kategori
                  <span className="footer-arrow">
                    {kategoriOpen ? "⌃" : "⌄"}
                  </span>
                </h3>

                <div className={`footer-links ${kategoriOpen ? "active" : ""}`}>
                  <a href="#">Digital &amp; Teknologi</a>
                  <a href="#">Pemasaran</a>
                  <a href="#">Manajemen Bisnis</a>
                  <a href="#">Pengembangan Diri</a>
                  <a href="#">Desain</a>
                </div>
              </div>

              {/* PERUSAHAAN */}
              <div className="footer-column">
                <h3 onClick={() => setPerusahaanOpen(!perusahaanOpen)}>
                  Perusahaan
                  <span className="footer-arrow">
                    {perusahaanOpen ? "⌃" : "⌄"}
                  </span>
                </h3>

                <div
                  className={`footer-links ${perusahaanOpen ? "active" : ""}`}
                >
                  <a href="#">Tentang Kami</a>
                  <a href="#">FAQ</a>
                  <a href="#">Kebijakan Privasi</a>
                  <a href="#">Bantuan</a>
                </div>
              </div>

              {/* KOMUNITAS */}
              <div className="footer-column">
                <h3 onClick={() => setKomunitasOpen(!komunitasOpen)}>
                  Komunitas
                  <span className="footer-arrow">
                    {komunitasOpen ? "⌃" : "⌄"}
                  </span>
                </h3>

                <div
                  className={`footer-links ${komunitasOpen ? "active" : ""}`}
                >
                  <a href="#">Tips Sukses</a>
                  <a href="#">Blog</a>
                  <a href="#">Event</a>
                </div>
              </div>
            </div>
          </div>

          <div className="copyright">
            <p>© 2026 Copyright Sayur All Rights Reserved.</p>
          </div>
        </footer>
      </>
    );
}

export default CategoriPage;