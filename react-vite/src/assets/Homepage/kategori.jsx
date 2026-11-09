import { useState } from "react";

import "../styles/category.css";
import "../styles/global.css";
import VideoCard from "../component/card";

import logo from "../logo.png";
import hero from "../hero.jpg";
import hero2 from "../hero.png";
import newsletter from "../newsletter.jpg";
import iconpp from "../iconpp.png";
import ppicon from "../ppicon.png";

function CategoriPage() {
  // STATE NAVBAR DAN FOOTER
  const [menuOpen, setMenuOpen] = useState(true);

  const [kategoriOpen, setKategoriOpen] = useState(false);
  const [perusahaanOpen, setPerusahaanOpen] = useState(false);
  const [komunitasOpen, setKomunitasOpen] = useState(false);

  // STATE PAGINATION
  const [currentPage, setCurrentPage] = useState(1);

  // STATE SEARCH DAN FILTER
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  // DATA VIDEO COURSE
  const videoData = [
    {
      id: 1,
      title: "Big 4 Auditor Financial Analyst",
      description: "Belajar analisis keuangan bersama instruktur profesional.",
      image: hero,
      avatar: iconpp,
      author: "Jenna Ortega",
      role: "Senior Accountant",
      rating: "3.5 (86)",
      price: "Rp 300K",
      category: "Bisnis Manajemen",
      date: "2026-11-08",
    },
    {
      id: 2,
      title: "Digital Marketing untuk Pemula",
      description: "Pelajari strategi pemasaran digital.",
      image: newsletter,
      avatar: ppicon,
      author: "John Doe",
      role: "Digital Marketer",
      rating: "4.5 (120)",
      price: "Rp 250K",
      category: "Pemasaran",
      date: "2026-11-05",
    },
    {
      id: 3,
      title: "Belajar UI UX Design",
      description: "Membuat desain aplikasi yang menarik.",
      image: hero2,
      avatar: iconpp,
      author: "Sarah Putri",
      role: "UI UX Designer",
      rating: "4.8 (95)",
      price: "Rp 200K",
      category: "Digital & Teknologi",
      date: "2026-11-01",
    },
    {
      id: 4,
      title: "Big 4 Auditor Financial Analyst",
      description: "Belajar analisis keuangan bersama instruktur profesional.",
      image: hero,
      avatar: iconpp,
      author: "Jenna Ortega",
      role: "Senior Accountant",
      rating: "3.5 (86)",
      price: "Rp 300K",
      category: "Bisnis Manajemen",
      date: "2026-11-08",
    },
    {
      id: 5,
      title: "Digital Marketing untuk Pemula",
      description: "Pelajari strategi pemasaran digital.",
      image: newsletter,
      avatar: ppicon,
      author: "John Doe",
      role: "Digital Marketer",
      rating: "4.5 (120)",
      price: "Rp 250K",
      category: "Pemasaran",
      date: "2026-11-05",
    },
    {
      id: 6,
      title: "Belajar UI UX Design",
      description: "Membuat desain aplikasi yang menarik.",
      image: hero2,
      avatar: iconpp,
      author: "Sarah Putri",
      role: "UI UX Designer",
      rating: "4.8 (95)",
      price: "Rp 200K",
      category: "Digital & Teknologi",
      date: "2026-11-01",
    },
    {
      id: 7,
      title: "Big 4 Auditor Financial Analyst",
      description: "Belajar analisis keuangan bersama instruktur profesional.",
      image: hero,
      avatar: iconpp,
      author: "Jenna Ortega",
      role: "Senior Accountant",
      rating: "3.5 (86)",
      price: "Rp 300K",
      category: "Bisnis Manajemen",
      date: "2026-11-08",
    },
    {
      id: 8,
      title: "Digital Marketing untuk Pemula",
      description: "Pelajari strategi pemasaran digital.",
      image: newsletter,
      avatar: ppicon,
      author: "John Doe",
      role: "Digital Marketer",
      rating: "4.5 (120)",
      price: "Rp 250K",
      category: "Pemasaran",
      date: "2026-11-05",
    },
    {
      id: 9,
      title: "Belajar UI UX Design",
      description: "Membuat desain aplikasi yang menarik.",
      image: hero2,
      avatar: iconpp,
      author: "Sarah Putri",
      role: "UI UX Designer",
      rating: "4.8 (95)",
      price: "Rp 200K",
      category: "Digital & Teknologi",
      date: "2026-11-01",
    },
    {
      id: 10,
      title: "Big 4 Auditor Financial Analyst",
      description: "Belajar analisis keuangan bersama instruktur profesional.",
      image: hero,
      avatar: iconpp,
      author: "Jenna Ortega",
      role: "Senior Accountant",
      rating: "3.5 (86)",
      price: "Rp 300K",
      category: "Bisnis Manajemen",
      date: "2026-11-08",
    },
    {
      id: 11,
      title: "Digital Marketing untuk Pemula",
      description: "Pelajari strategi pemasaran digital.",
      image: newsletter,
      avatar: ppicon,
      author: "John Doe",
      role: "Digital Marketer",
      rating: "4.5 (120)",
      price: "Rp 250K",
      category: "Pemasaran",
      date: "2026-11-05",
    },
    {
      id: 12,
      title: "Belajar UI UX Design",
      description: "Membuat desain aplikasi yang menarik.",
      image: hero2,
      avatar: iconpp,
      author: "Sarah Putri",
      role: "UI UX Designer",
      rating: "4.8 (95)",
      price: "Rp 200K",
      category: "Digital & Teknologi",
      date: "2026-11-01",
    },
  ];

  // FILTER SEARCH DAN KATEGORI//
    const filteredVideos = videoData.filter((item) => {
    const cocokSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const cocokKategori = selectedCategory === "Semua" || item.category === selectedCategory;
    return cocokSearch && cocokKategori;
  });

  // PAGINATION
  const cardsPerPage = 10;
  const totalPages = Math.ceil(filteredVideos.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const currentVideos = filteredVideos.slice(
    startIndex,
    startIndex + cardsPerPage,
  );

  return (
    <>
      {/* NAVBAR */}
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
                  <p>Pemasaran</p>
                  <p>Digital & Teknologi</p>
                  <p>Pengembangan Diri</p>
                  <p>Bisnis Manajemen</p>
                </div>
              </div>
              <div className="menu">
                <h3>Harga</h3>
                <div className="listmenu">
                  <p>Pemasaran</p>
                  <p>Digital & Teknologi</p>
                  <p>Pengembangan Diri</p>
                  <p>Bisnis Manajemen</p>
                </div>
              </div>

              <div className="menu">
                <h3>Durasi</h3>
                <div className="listmenu">
                  <p>Kurang dari 4 jam</p>
                  <p>4-8 Jam</p>
                  <p>Lebih dari 8 jam</p>
                </div>
              </div>
            </div>
          </div>

          <div className="category-course-area">
            <div className="course-tools">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="Semua">Semua Kategori</option>
                <option value="Bisnis Manajemen">Bisnis Manajemen</option>
                <option value="Pemasaran">Pemasaran</option>
                <option value="Digital & Teknologi">Digital & Teknologi</option>
              </select>

              <div className="search-box">
                <input
                  type="text"
                  placeholder="Cari course..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                />

                <button type="button">🔍</button>
              </div>
            </div>
            <div className="category-course-grid">
              {currentVideos.length > 0 ? (
                currentVideos.map((item) => (
                  <VideoCard key={item.id} course={item} />
                ))
              ) : (
                <p>Course tidak ditemukan.</p>
              )}
            </div>

            {/* PAGINATION */}
            <div className="category-pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                ‹
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={currentPage === index + 1 ? "active" : ""}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                ›
              </button>
            </div>
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
            <div className="footer-column">
              <h3 onClick={() => setPerusahaanOpen(!perusahaanOpen)}>
                Perusahaan
                <span className="footer-arrow">
                  {perusahaanOpen ? "⌃" : "⌄"}
                </span>
              </h3>

              <div className={`footer-links ${perusahaanOpen ? "active" : ""}`}>
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

              <div className={`footer-links ${komunitasOpen ? "active" : ""}`}>
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
