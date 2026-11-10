import { useState } from "react";

import "../styles/information.css";
// import "../styles/global.css";

import logo from "../logo.png";

function InformationProduct() {
    const [menuOpen, setMenuOpen] = useState(true);
    
const [kategoriOpen, setKategoriOpen] = useState(false);    const [perusahaanOpen, setPerusahaanOpen] = useState(false);
    const [komunitasOpen, setKomunitasOpen] = useState(false);


    return (
      <>
        <nav className="navbar">
          <img src={logo} alt="logo" className="imglogo" />
          <button onClick={() => setMenuOpen(!menuOpen)} className="hamburger">
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
          <p>
            <span>Branda /</span>
            <span>Desain /</span> Gapai Karier Impianmu sebagai Seorang UI/UX
            Designer & Product Manager.
          </p>
          <section className="hero">
            <div className="hero-content">
              <h1>
                Gapai Karier Impianmu sebagai Seorang UI/UX Designer & Product
                Manager.
              </h1>

              <p>
                Belajar bersama tutor profesional di Video Course. Kapanpun, di
                manapun.
              </p>
              <p>⭐⭐⭐⭐⭐</p>
            </div>
          </section>
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

export default InformationProduct;
