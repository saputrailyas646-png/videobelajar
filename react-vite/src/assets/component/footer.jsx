import { useState } from "react";

import logo from "../logo.png";
import "../styles/footer.css";
function Footer() {
  const [kategoriOpen, setKategoriOpen] = useState(false);
  const [perusahaanOpen, setPerusahaanOpen] = useState(false);
  const [komunitasOpen, setKomunitasOpen] = useState(false);

  return (
    <footer className="footer-container">
      <div className="boxfooter">
        <div className="footer1">
          <img src={logo} alt="logo" className="imglogo" />

          <p>Platform Video Pembelajaran untuk meningkatkan skill.</p>

          <p>Jl. Pendidikan No. 50, Indonesia</p>

          <p>+62-812-3456-7890</p>
        </div>

        <div className="listfooter">
          {/* FOOTER KATEGORI */}
          <div className="footer-column">
            <h3 onClick={() => setKategoriOpen(!kategoriOpen)}>
              Kategori
              <span className="footer-arrow">{kategoriOpen ? "⌃" : "⌄"}</span>
            </h3>

            <div className={`footer-links ${kategoriOpen ? "active" : ""}`}>
              <a href="#">Digital &amp; Teknologi</a>
              <a href="#">Pemasaran</a>
              <a href="#">Manajemen Bisnis</a>
              <a href="#">Pengembangan Diri</a>
              <a href="#">Desain</a>
            </div>
          </div>

          {/* FOOTER PERUSAHAAN */}
          <div className="footer-column">
            <h3 onClick={() => setPerusahaanOpen(!perusahaanOpen)}>
              Perusahaan
              <span className="footer-arrow">{perusahaanOpen ? "⌃" : "⌄"}</span>
            </h3>

            <div className={`footer-links ${perusahaanOpen ? "active" : ""}`}>
              <a href="#">Tentang Kami</a>
              <a href="#">FAQ</a>
              <a href="#">Kebijakan Privasi</a>
              <a href="#">Bantuan</a>
            </div>
          </div>

          {/* FOOTER KOMUNITAS */}
          <div className="footer-column">
            <h3 onClick={() => setKomunitasOpen(!komunitasOpen)}>
              Komunitas
              <span className="footer-arrow">{komunitasOpen ? "⌃" : "⌄"}</span>
            </h3>

            <div className={`footer-links ${komunitasOpen ? "active" : ""}`}>
              <a href="#">Tips Sukses</a>
              <a href="#">Blog</a>
              <a href="#">Event</a>
            </div>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="copyright">
        <p>© 2026 Copyright Sayur All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
