
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import VideoCard from "../component/card";
import Navbar from "../component/navbar";
import Footer from "../component/footer";

import "../styles/home.css";
import "../styles/global.css";

import hero from "../hero.jpg";
import hero2 from "../hero.png";
import newsletter from "../newsletter.jpg";
import iconpp from "../iconpp.png";
import ppicon from "../ppicon.png";

function HomePage() {
  const navigate = useNavigate();

  // STATE NAVBAR

 
  // STATE PAGINATION
  const [currentPage, setCurrentPage] = useState(1);

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

  // LOGIC PAGINATION
  const cardsPerPage = 10;
  const totalPages = Math.ceil(videoData.length / cardsPerPage);

  const startIndex = (currentPage - 1) * cardsPerPage;

  const currentVideos = videoData.slice(
    startIndex,
    startIndex + cardsPerPage
  );

  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      <main className="main">
        {/* HERO SECTION */}
        <section className="hero">
          <div className="hero-content">
            <h1>
              Revolusi Pembelajaran: Temukan Ilmu Baru melalui Platform Video
              Interaktif!
            </h1>

            <p>
              Temukan ilmu baru yang menarik dan menyenangkan untuk dipelajari
              kapan saja dan di mana saja.
            </p>

            <button onClick={() => navigate("/home#video-section")}>
              Temukan Video Course untuk Dipelajari!
            </button>
          </div>
        </section>

        {/* VIDEO SECTION */}
        <section className="video-section" id="video-section">
          <div className="section-title">
            <h2>Koleksi Video Pembelajaran Unggulan</h2>

            <p>Jelajahi Dunia Pengetahuan Melalui Pilihan Kami</p>
          </div>

          {/* CATEGORY MENU */}
          <div className="category">
            <a href="#video-section" className="ative">
              Semua Kelas
            </a>

            <a href="#video-section">Pemasaran</a>

            <a href="#video-section">Pengembangan Diri</a>

            <a href="#video-section">Bisnis</a>
          </div>

          {/* VIDEO CARD */}
          <div className="category-course-grid">
            {currentVideos.length > 0 ? (
              currentVideos.map((item) => (
                <VideoCard key={item.id} course={item} />
              ))
            ) : (
              <p>Course tidak ditemukan.</p>
            )}
          </div>
        </section>

        {/* PAGINATION */}
        <div className="category-pagination">
          {/* BUTTON PREVIOUS */}
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            ‹
          </button>

          {/* NUMBER PAGE */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          {/* BUTTON NEXT */}
          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            ›
          </button>
        </div>

        {/* NEWSLETTER SECTION */}
        <section className="newsletter">
          <div className="newsletter-content">
            <small>NEWSLETTER</small>

            <h2>Mau Belajar Lebih Banyak?</h2>

            <p>
              Dapatkan informasi terbaru mengenai pembelajaran dan promo
              menarik.
            </p>

            <form>
              <input type="email" placeholder="Masukkan Email" />

              <button type="submit">Subscribe</button>
            </form>
          </div>
        </section>
      </main>

      
      <Footer />
    </>
  );
}

export default HomePage;