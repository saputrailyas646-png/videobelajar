import { useMemo, useState } from "react";

import VideoCard from "../component/card";
import Navbar from "../component/navbar";
import Footer from "../component/footer";

import "../styles/global.css";
import "../styles/home.css";

import { getCourses } from "../utils/courseStore";

function HomePage() {
  // STATE PAGINATION / SLIDE
  const [currentPage, setCurrentPage] = useState(1);

  // DATA KURSUS: dibaca dari courseStore (hasil Kelola Kursus).
  // company & date diberi nilai bawaan karena kursus baru belum punya.
  const [courses] = useState(() =>
    getCourses().map((c) => ({
      company: "Gojek",
      date: "2026-11-01",
      ...c,
    })),
  );

  // FILTER KATEGORI: daftar tombol dibuat dari kategori yang ada di data kursus
  const [activeCategory, setActiveCategory] = useState("Semua Kelas");

  const categories = useMemo(
    () => [
      "Semua Kelas",
      ...new Set(courses.map((c) => c.category).filter(Boolean)),
    ],
    [courses],
  );

  const filteredCourses =
    activeCategory === "Semua Kelas"
      ? courses
      : courses.filter((c) => c.category === activeCategory);

  const handleCategory = (e, cat) => {
    e.preventDefault();
    setActiveCategory(cat);
    setCurrentPage(1); // kembali ke slide pertama saat filter berganti
  };

  // LOGIC SLIDE: 1 page = 4 baris x 3 card = 12 card
  const cardsPerPage = 12;
  const totalPages = Math.ceil(filteredCourses.length / cardsPerPage);

  // pecah data hasil filter jadi beberapa page
  const pages = Array.from({ length: totalPages }, (_, index) =>
    filteredCourses.slice(index * cardsPerPage, (index + 1) * cardsPerPage),
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

          {/* CATEGORY MENU: otomatis dari kategori kursus */}
          <div className="category">
            {categories.map((cat) => (
              <a
                key={cat}
                href="#video-section"
                className={activeCategory === cat ? "active" : ""}
                onClick={(e) => handleCategory(e, cat)}
              >
                {cat}
              </a>
            ))}
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

          {filteredCourses.length === 0 && (
            <p style={{ textAlign: "center", padding: "24px 0" }}>
              Belum ada kursus di kategori ini.
            </p>
          )}
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
