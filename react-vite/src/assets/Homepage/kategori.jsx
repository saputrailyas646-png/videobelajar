import { useState } from "react";

import Navbar from "../component/navbar";
import Footer from "../component/footer";

import "../styles/category.css";
import "../styles/global.css";

import VideoCard from "../component/card";

import hero from "../hero.jpg";
import hero2 from "../hero.png";
import newsletter from "../newsletter.jpg";
import iconpp from "../iconpp.png";
import ppicon from "../ppicon.png";

function CategoriPage() {
  // STATE PAGINATION
  const [currentPage, setCurrentPage] = useState(1);

  // STATE SEARCH
  const [search, setSearch] = useState("");

  // STATE FILTER KATEGORI
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  // STATE FILTER HARGA
  const [selectedPrice, setSelectedPrice] = useState("Semua");

  // STATE ACCORDION
  const [openFilter, setOpenFilter] = useState(() => {
    if (window.innerWidth > 600) {
      return {
        bidang: true,
        harga: true,
        durasi: true,
      };
    }

    return {
      bidang: false,
      harga: false,
      durasi: false,
    };
  });

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

  // TOGGLE ACCORDION
  const toggleFilter = (filterName) => {
    setOpenFilter((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  // RESET FILTER
  const handleReset = () => {
    setSearch("");
    setSelectedCategory("Semua");
    setSelectedPrice("Semua");
    setCurrentPage(1);
  };

  // FILTER SEARCH, KATEGORI, DAN HARGA
  const filteredVideos = videoData.filter((item) => {
    const cocokSearch = item.title.toLowerCase().includes(search.toLowerCase());

    const cocokKategori =
      selectedCategory === "Semua" || item.category === selectedCategory;

    const priceNumber = Number(item.price.replace("Rp ", "").replace("K", ""));

    let cocokHarga = true;

    if (selectedPrice === "under200") {
      cocokHarga = priceNumber < 200;
    } else if (selectedPrice === "200-300") {
      cocokHarga = priceNumber >= 200 && priceNumber <= 300;
    } else if (selectedPrice === "above300") {
      cocokHarga = priceNumber > 300;
    }

    return cocokSearch && cocokKategori && cocokHarga;
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
      <Navbar />

      <main className="main">
        <div className="heding">
          <h1>Koleksi Video Pembelajaran Unggulan</h1>
          <p>Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!</p>
        </div>

        <div className="counten">
          {/* SIDEBAR FILTER */}
          <aside className="sidebarbox">
            <div className="span-side">
              <span>Filter</span>

              <button type="button" className="reset" onClick={handleReset}>
                Reset
              </button>
            </div>

            <div className="menu-sidebar">
              {/* BIDANG STUDI */}
              <div className="menu">
                <button
                  type="button"
                  className="filter-heading"
                  onClick={() => toggleFilter("bidang")}
                >
                  <span>Bidang Studi</span>
                  <span
                    className={`filter-arrow ${openFilter.bidang ? "open" : ""}`}
                  >
                    ⌄
                  </span>
                </button>

                {openFilter.bidang && (
                  <div className="listmenu">
                    {[
                      "Pemasaran",
                      "Digital & Teknologi",
                      "Pengembangan Diri",
                      "Bisnis Manajemen",
                    ].map((category) => (
                      <label className="filter-option" key={category}>
                        <input
                          type="checkbox"
                          checked={selectedCategory === category}
                          onChange={() => {
                            setSelectedCategory(
                              selectedCategory === category
                                ? "Semua"
                                : category,
                            );
                            setCurrentPage(1);
                          }}
                        />

                        <span>{category}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* HARGA */}
              <div className="menu">
                <button
                  type="button"
                  className="filter-heading"
                  onClick={() => toggleFilter("harga")}
                >
                  <span>Harga</span>
                  <span
                    className={`filter-arrow ${openFilter.harga ? "open" : ""}`}
                  >
                    ⌄
                  </span>
                </button>

                {openFilter.harga && (
                  <div className="listmenu">
                    {[
                      { label: "Di bawah Rp 200K", value: "under200" },
                      { label: "Rp 200K – Rp 300K", value: "200-300" },
                      { label: "Di atas Rp 300K", value: "above300" },
                    ].map((price) => (
                      <label className="filter-option" key={price.value}>
                        <input
                          type="checkbox"
                          checked={selectedPrice === price.value}
                          onChange={() => {
                            setSelectedPrice(
                              selectedPrice === price.value
                                ? "Semua"
                                : price.value,
                            );
                            setCurrentPage(1);
                          }}
                        />

                        <span>{price.label}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* DURASI */}
              <div className="menu">
                <button
                  type="button"
                  className="filter-heading"
                  onClick={() => toggleFilter("durasi")}
                >
                  <span>Durasi</span>
                  <span
                    className={`filter-arrow ${openFilter.durasi ? "open" : ""}`}
                  >
                    ⌄
                  </span>
                </button>

                {openFilter.durasi && (
                  <div className="listmenu">
                    {["Kurang dari 4 jam", "4–8 Jam", "Lebih dari 8 jam"].map(
                      (duration) => (
                        <label className="filter-option" key={duration}>
                          <input type="checkbox" />

                          <span>{duration}</span>
                        </label>
                      ),
                    )}
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* AREA COURSE */}
          <section className="category-course-area">
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
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default CategoriPage;
