import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import "../styles/kelas.css";
import hero from "../hero.jpg";
import iconpp from "../iconpp.png";
import Navbar from "../component/navbar";
import Footer from "../component/footer";
import { getCurrentUser } from "../utils/auth";
import { getMyCourses } from "../utils/payments";
import { getSummary } from "../utils/learning";
import { getCourseById } from "../utils/courseStore";
const MONTHS = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const formatDate = (iso) => {
  const d = new Date(iso);
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
};

// Gabungkan pesanan berhasil + data kelas + progres belajar
function loadKelas(user) {
  if (!user) return [];

  const seen = new Set();

  return getMyCourses(user.email)
    .reverse() // pembelian terbaru di atas
    .filter((o) => {
      const key = String(o.courseId);
      if (seen.has(key)) return false; // satu kelas tampil sekali
      seen.add(key);
      return true;
    })
    .map((o) => {
      const course = getCourseById(o.courseId);
      const s = getSummary(o.courseId);

      return {
        id: String(o.courseId),
        title: o.courseTitle,
        image: course?.image || hero,
        description:
          course?.description ||
          "Belajar bertahap lewat video, dokumen, dan latihan, lalu uji pemahamanmu di ujian akhir.",
        tutor: course?.author || "Jenna Ortega",
        role: course?.role || "Senior Accountant",
        avatar: course?.avatar || iconpp,
        rating: course?.rating || "4.9",
        modules: s.total,
        minutes: s.minutes,
        done: s.done,
        progress: s.percent,
        finishedAt: s.finishedAt,
        status: s.finished ? "Selesai" : "Sedang Berjalan",
      };
    });
}

function KelasPage() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const [kelasData] = useState(() => loadKelas(user));
  const [activeTab, setActiveTab] = useState("Semua Kelas");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [certificate, setCertificate] = useState(null);

  // belum login -> ke halaman login, lalu kembali ke sini
  if (!user) {
    return <Navigate to="/login" replace state={{ from: "/kelas" }} />;
  }

  const tabs = ["Semua Kelas", "Sedang Berjalan", "Selesai"];

  const filteredKelas = kelasData.filter((kelas) => {
    const cocokTab = activeTab === "Semua Kelas" || kelas.status === activeTab;
    const cocokSearch = kelas.title
      .toLowerCase()
      .includes(search.toLowerCase());
    return cocokTab && cocokSearch;
  });

  const kelasPerPage = 3;
  const totalPages = Math.ceil(filteredKelas.length / kelasPerPage);

  const displayedKelas = filteredKelas.slice(
    (currentPage - 1) * kelasPerPage,
    currentPage * kelasPerPage,
  );

  return (
    <>
      <Navbar />
      <main className="kelas-page">
        <div className="kelas-container">
          {/* SIDEBAR */}
          <aside className="kelas-sidebar">
            <div className="kelas-sidebar-heading">
              <h2>Daftar Kelas</h2>
              <p>
                Akses Kelas Belajar dan Modul
                <br />
                Pembelajaran Anda
              </p>
            </div>

            <div className="kelas-sidebar-menu">
              <button
                className="kelas-sidebar-link"
                onClick={() => navigate("/profil")}
              >
                <span>♙</span>
                Profil Saya
              </button>

              <button className="kelas-sidebar-link active">
                <span>▣</span>
                Kelas Saya
              </button>

              <button
                className="kelas-sidebar-link"
                onClick={() => navigate("/pesanan")}
              >
                <span>♧</span>
                Pesanan Saya
              </button>
            </div>
          </aside>

          {/* CONTENT */}
          <section className="kelas-content">
            {/* TABS */}
            <div className="kelas-tabs">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`kelas-tab ${activeTab === tab ? "active" : ""}`}
                  onClick={() => {
                    setActiveTab(tab);
                    setCurrentPage(1);
                  }}
                >
                  {tab}
                </button>
              ))}

              <div className="kelas-search">
                <input
                  type="text"
                  placeholder="Cari Kelas"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                />

                <span>⌕</span>
              </div>
            </div>

            {/* LIST KELAS */}
            <div className="kelas-list">
              {displayedKelas.length > 0 ? (
                displayedKelas.map((kelas) => (
                  <article className="kelas-card" key={kelas.id}>
                    {/* CARD HEADER */}
                    <div className="kelas-card-header">
                      <span>
                        {kelas.done} / {kelas.modules} Modul Terselesaikan
                      </span>

                      <span
                        className={`kelas-status ${
                          kelas.status === "Selesai" ? "finished" : "ongoing"
                        }`}
                      >
                        {kelas.status}
                      </span>
                    </div>

                    {/* CARD BODY */}
                    <div className="kelas-card-body">
                      <img
                        className="kelas-thumbnail"
                        src={kelas.image}
                        alt={kelas.title}
                      />

                      <div className="kelas-card-info">
                        <h3>{kelas.title}</h3>

                        <p>{kelas.description}</p>

                        <div className="kelas-tutor">
                          <img src={kelas.avatar} alt={kelas.tutor} />

                          <div>
                            <strong>{kelas.tutor}</strong>
                            <span>{kelas.role}</span>
                          </div>
                        </div>

                        <div className="kelas-meta">
                          <span>⭐ {kelas.rating}</span>
                          <span>▣ {kelas.modules} Modul</span>
                          <span>◷ {kelas.minutes} Menit</span>
                        </div>
                      </div>
                    </div>

                    {/* PROGRESS */}
                    <div className="kelas-progress-section">
                      <div className="kelas-progress-info">
                        <span>Progress Kelas</span>

                        <strong>{kelas.progress}%</strong>
                      </div>

                      <div className="kelas-progress-bar">
                        <div
                          className="kelas-progress-fill"
                          style={{ width: `${kelas.progress}%` }}
                        />
                      </div>

                      {/* BUTTON */}
                      <div className="kelas-card-buttons">
                        {kelas.status === "Selesai" ? (
                          <>
                            <button
                              className="kelas-outline-button"
                              onClick={() =>
                                navigate(`/information/${kelas.id}`)
                              }
                            >
                              Detail Kelas
                            </button>

                          
                            <button
                              className="kelas-continue-button"
                              onClick={() =>
                                navigate(`/sertifikat/${kelas.id}`)
                              }
                            >
                              Sertifikat
                            </button>
                          </>
                        ) : (
                          <button
                            className="kelas-continue-button"
                            onClick={() => navigate(`/belajar/${kelas.id}`)}
                          >
                            Lanjutkan Pembelajaran
                          </button>
                        )}
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <div className="kelas-empty">
                  {kelasData.length === 0 ? (
                    <>
                      Kamu belum punya kelas.{" "}
                      <button
                        type="button"
                        className="kelas-continue-button"
                        onClick={() => navigate("/category")}
                      >
                        Cari Kelas
                      </button>
                    </>
                  ) : (
                    "Kelas tidak ditemukan."
                  )}
                </div>
              )}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="kelas-pagination">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  ‹
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      className={currentPage === page ? "active" : ""}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ),
                )}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  ›
                </button>
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />

      {/* SERTIFIKAT */}
      {certificate && (
        <div
          className="sertifikat-overlay"
          onClick={() => setCertificate(null)}
        >
          <div
            className="sertifikat-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sertifikat-print">
              <div className="sertifikat-paper">
                <p className="sertifikat-brand">videobelajar</p>
                <h2>Sertifikat Penyelesaian</h2>
                <p>Diberikan kepada</p>
                <h3>{user.name}</h3>
                <p>telah berhasil menyelesaikan kelas</p>
                <h4>{certificate.title}</h4>
                <p className="sertifikat-date">
                  {formatDate(
                    certificate.finishedAt || new Date().toISOString(),
                  )}
                </p>
                <p>Mentor: {certificate.tutor}</p>
              </div>
            </div>

            <div className="sertifikat-actions">
              <button
                type="button"
                className="kelas-outline-button"
                onClick={() => setCertificate(null)}
              >
                Tutup
              </button>
              <button
                type="button"
                className="kelas-continue-button"
                onClick={() => window.print()}
              >
                Cetak / Simpan PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default KelasPage;
