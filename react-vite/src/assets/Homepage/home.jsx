import { useState } from "react";

import VideoCard from "../component/card";
import Navbar from "../component/navbar";
import Footer from "../component/footer";

import "../styles/global.css";
import "../styles/home.css";

import hero from "../hero.jpg";
import hero2 from "../hero.png";
import newsletter from "../newsletter.jpg";
import iconpp from "../iconpp.png";
import ppicon from "../ppicon.png";

function HomePage() {

  // STATE PAGINATION / SLIDE
  const [currentPage, setCurrentPage] = useState(1);

  // DATA VIDEO COURSE
  const videoData = [
    {
      id: 1,
      title: "Big 4 Auditor Financial Analyst",
      description:
        "Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan sangat terpercaya.",
      image: hero,
      avatar: iconpp,
      author: "Jenna Ortega",
      role: "Senior Accountant",
      company: "Gojek",
      rating: "3.5 (86)",
      price: "Rp 300K",
      category: "Bisnis Manajemen",
      date: "2026-11-08",
    },
    {
      id: 2,
      title: "Digital Marketing untuk Pemula",
      description:
        "Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan sangat terpercaya.",
      image: newsletter,
      avatar: ppicon,
      author: "John Doe",
      role: "Digital Marketer",
      company: "Gojek",
      rating: "4.5 (120)",
      price: "Rp 250K",
      category: "Pemasaran",
      date: "2026-11-05",
    },
    {
      id: 3,
      title: "Belajar UI UX Design",
      description:
        "Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan sangat terpercaya.",
      image: hero2,
      avatar: iconpp,
      author: "Sarah Putri",
      role: "UI UX Designer",
      company: "Gojek",
      rating: "4.8 (95)",
      price: "Rp 200K",
      category: "Digital & Teknologi",
      date: "2026-11-01",
    },
    {
      id: 4,
      title: "Big 4 Auditor Financial Analyst",
      description:
        "Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan sangat terpercaya.",
      image: hero,
      avatar: iconpp,
      author: "Jenna Ortega",
      role: "Senior Accountant",
      company: "Gojek",
      rating: "3.5 (86)",
      price: "Rp 300K",
      category: "Bisnis Manajemen",
      date: "2026-11-08",
    },
    {
      id: 5,
      title: "Digital Marketing untuk Pemula",
      description:
        "Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan sangat terpercaya.",
      image: newsletter,
      avatar: ppicon,
      author: "John Doe",
      role: "Digital Marketer",
      company: "Gojek",
      rating: "4.5 (120)",
      price: "Rp 250K",
      category: "Pemasaran",
      date: "2026-11-05",
    },
    {
      id: 6,
      title: "Belajar UI UX Design",
      description:
        "Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan sangat terpercaya.",
      image: hero2,
      avatar: iconpp,
      author: "Sarah Putri",
      role: "UI UX Designer",
      company: "Gojek",
      rating: "4.8 (95)",
      price: "Rp 200K",
      category: "Digital & Teknologi",
      date: "2026-11-01",
    },
    {
      id: 7,
      title: "Big 4 Auditor Financial Analyst",
      description:
        "Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan sangat terpercaya.",
      image: hero,
      avatar: iconpp,
      author: "Jenna Ortega",
      role: "Senior Accountant",
      company: "Gojek",
      rating: "3.5 (86)",
      price: "Rp 300K",
      category: "Bisnis Manajemen",
      date: "2026-11-08",
    },
    {
      id: 8,
      title: "Digital Marketing untuk Pemula",
      description:
        "Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan sangat terpercaya.",
      image: newsletter,
      avatar: ppicon,
      author: "John Doe",
      role: "Digital Marketer",
      company: "Gojek",
      rating: "4.5 (120)",
      price: "Rp 250K",
      category: "Pemasaran",
      date: "2026-11-05",
    },
    {
      id: 9,
      title: "Belajar UI UX Design",
      description:
        "Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan sangat terpercaya.",
      image: hero2,
      avatar: iconpp,
      author: "Sarah Putri",
      role: "UI UX Designer",
      company: "Gojek",
      rating: "4.8 (95)",
      price: "Rp 200K",
      category: "Digital & Teknologi",
      date: "2026-11-01",
    },
    {
      id: 10,
      title: "Big 4 Auditor Financial Analyst",
      description:
        "Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan sangat terpercaya.",
      image: hero,
      avatar: iconpp,
      author: "Jenna Ortega",
      role: "Senior Accountant",
      company: "Gojek",
      rating: "3.5 (86)",
      price: "Rp 300K",
      category: "Bisnis Manajemen",
      date: "2026-11-08",
    },
    {
      id: 11,
      title: "Digital Marketing untuk Pemula",
      description:
        "Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan sangat terpercaya.",
      image: newsletter,
      avatar: ppicon,
      author: "John Doe",
      role: "Digital Marketer",
      company: "Gojek",
      rating: "4.5 (120)",
      price: "Rp 250K",
      category: "Pemasaran",
      date: "2026-11-05",
    },
    {
      id: 12,
      title: "Belajar UI UX Design",
      description:
        "Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan sangat terpercaya.",
      image: hero2,
      avatar: iconpp,
      author: "Sarah Putri",
      role: "UI UX Designer",
      company: "Gojek",
      rating: "4.8 (95)",
      price: "Rp 200K",
      category: "Digital & Teknologi",
      date: "2026-11-01",
    },
  ];

  // SEMENTARA UNTUK TES SLIDE: data diperbanyak jadi 36 card.
  // Hapus bagian ini dan pakai videoData langsung kalau data aslimu sudah lebih dari 12.
  const allVideos = [
    ...videoData,
    ...videoData.map((v) => ({ ...v, id: v.id + 12 })),
    ...videoData.map((v) => ({ ...v, id: v.id + 24 })),
  ];

  // LOGIC SLIDE: 1 page = 4 baris x 3 card = 12 card
  const cardsPerPage = 12;
  const totalPages = Math.ceil(allVideos.length / cardsPerPage);

  // pecah data jadi beberapa page
  const pages = Array.from({ length: totalPages }, (_, index) =>
    allVideos.slice(index * cardsPerPage, (index + 1) * cardsPerPage),
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
            <button
              onClick={() =>
                document
                  .getElementById("video-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
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
            <a href="#video-section" className="active">
              Semua Kelas
            </a>

            <a href="#video-section">Pemasaran</a>

            <a href="#video-section">Pengembangan Diri</a>

            <a href="#video-section">Bisnis</a>
          </div>

          {/* SLIDER: tiap slide = 1 page berisi 12 card */}
          <div className="slider">
            <div
              className="slider-track"
              style={{
                transform: `translateX(-${(currentPage - 1) * 100}%)`,
              }}
            >
              {pages.map((pageVideos, pageIndex) => (
                <div
                  className="slider-page category-course-grid"
                  key={pageIndex}
                  aria-hidden={currentPage !== pageIndex + 1}
                >
                  {pageVideos.map((item) => (
                    <VideoCard key={item.id} course={item} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PAGINATION (kontrol slide) */}
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

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Terima kasih sudah berlangganan!");
                e.target.reset();
              }}
            >
              <input type="email" placeholder="Masukkan Email" required />

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
