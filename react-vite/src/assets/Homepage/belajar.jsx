// Sesuaikan path import dengan struktur foldermu.
import { useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getCourseById } from "./courseData";
import { getCurrentUser } from "../utils/auth";
import {
  buildSteps,
  getProgress,
  getQuizResult,
  getReview,
  getSummary,
  markDone,
  saveReview,
  setCurrent,
} from "../utils/learning";
import "../styles/belajar.css";
import Quiz from "./quiz";
import ReviewModal from "./reviewmodal";

const ICON = { video: "▶", summary: "≡", quiz: "?" };

export default function BelajarPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = getCurrentUser();

  const course = getCourseById(id);
  const steps = useMemo(() => buildSteps(id), [id]);

  const [progress, setProgress] = useState(() => getProgress(id));
  const [currentId, setCurrentId] = useState(() => {
    const p = getProgress(id);
    if (p.current && steps.some((s) => s.id === p.current)) return p.current;
    const firstUndone = steps.find((s) => !p.done.includes(s.id));
    return (firstUndone || steps[0]).id;
  });
  const [showProgress, setShowProgress] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [review, setReview] = useState(() => getReview(id));

  const currentIndex = steps.findIndex((s) => s.id === currentId);
  const current = steps[currentIndex];
  const prev = steps[currentIndex - 1];
  const next = steps[currentIndex + 1];

  const [openModules, setOpenModules] = useState(() => ({
    [current.module]: true,
  }));

  // Belum login -> ke halaman login
  if (!user) {
    return <Navigate to="/login" state={{ from: `/belajar/${id}` }} replace />;
  }

  const { done, total, percent, finished } = getSummary(id);

  const goTo = (stepId) => {
    setCurrent(id, stepId);
    setCurrentId(stepId);
    const target = steps.find((s) => s.id === stepId);
    setOpenModules((m) => ({ ...m, [target.module]: true }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = () => {
    // langkah quiz baru dihitung selesai kalau sudah lulus
    const locked =
      current.type === "quiz" && !getQuizResult(id, current.id).passed;
    if (!locked) setProgress(markDone(id, current.id));
    if (next) goTo(next.id);
    else navigate("/kelas");
  };

  const handlePrev = () => {
    if (prev) goTo(prev.id);
  };

  // Download rangkuman modul (file teks berisi daftar materi modul)
  const handleDownload = () => {
    const mod = course.curriculum[current.module];
    const lines = [
      `RANGKUMAN MODUL: ${mod.title}`,
      `Kelas : ${course.title}`,
      `Mentor: ${course.author}`,
      "",
      "Materi yang dipelajari:",
      ...mod.lessons.map((l, i) => `${i + 1}. ${l.title} (${l.duration})`),
      "",
      "Selamat belajar! - videobelajar",
    ];
    const blob = new Blob([lines.join("\n")], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Rangkuman - ${mod.title}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const modules = steps.reduce((acc, s) => {
    (acc[s.module] = acc[s.module] || {
      title: s.moduleTitle,
      items: [],
    }).items.push(s);
    return acc;
  }, {});

  const isDone = (sid) => progress.done.includes(sid);
  const photo = user.photo || user.avatar;

  return (
    <div className="bl-page">
      {/* HEADER */}
      <header className="bl-header">
        <button className="bl-back" onClick={() => navigate("/kelas")}>
          ←<span className="bl-back-text">{course.title}</span>
        </button>

        <div className="bl-header-right">
          <div className="bl-progress-bar">
            <div
              className="bl-progress-fill"
              style={{ width: `${percent}%` }}
            />
          </div>
          <button
            className="bl-progress-btn"
            onClick={() => setShowProgress((v) => !v)}
          >
            {done}/{total} ▾
          </button>
          {photo ? (
            <img className="bl-avatar" src={photo} alt="Profil" />
          ) : (
            <span className="bl-avatar bl-avatar-fallback">
              {(user.name || "U").charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        {showProgress && (
          <div className="bl-progress-panel">
            <p className="bl-panel-title">{percent}% Modul Telah Selesai</p>
            <p className="bl-panel-text">
              Selesaikan Semua Modul Untuk Mendapatkan Sertifikat
            </p>
            <button className="bl-cert-btn" disabled={!finished}>
              Ambil Sertifikat
            </button>
          </div>
        )}
      </header>

      <div className="bl-body">
        {/* KIRI: KONTEN */}
        <main className="bl-main">
          {current.type === "quiz" ? (
            <Quiz
              key={current.id}
              cardId={id}
              step={current}
              onChange={() => setProgress(getProgress(id))}
              onContinue={() => (next ? goTo(next.id) : navigate("/kelas"))}
            />
          ) : current.type === "summary" ? (
            <>
              <div className="bl-video">
                <div className="bl-video-empty">{current.moduleTitle}</div>
              </div>

              <section className="bl-info">
                <h2>Download Rangkuman Modul</h2>
                <p className="bl-desc">
                  Silakan download rangkuman modul dan materi yang telah kamu
                  pelajari.
                </p>
                <button className="bl-download" onClick={handleDownload}>
                  ⬇ Download Rangkuman
                </button>
              </section>
            </>
          ) : (
            <>
              <div className="bl-video">
                {current.videoUrl ? (
                  <iframe
                    key={current.id}
                    src={current.videoUrl}
                    title={current.title}
                    allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="bl-video-empty">Video belum tersedia</div>
                )}
              </div>

              <section className="bl-info">
                <h2>{current.title}</h2>
                <p className="bl-desc">{course.description}</p>

                <div className="bl-mentor">
                  {course.avatar && (
                    <img src={course.avatar} alt={course.author} />
                  )}
                  <div>
                    <strong>{course.author}</strong>
                    <span>{course.role}</span>
                  </div>
                </div>

                <div className="bl-rating">
                  <span className="bl-stars">★★★★★</span> {course.rating}
                </div>
              </section>
            </>
          )}

          {/* BAR HIJAU: sebelumnya / selanjutnya */}
          <nav className="bl-bar">
            <button onClick={handlePrev} disabled={!prev}>
              ‹{" "}
              <span className="bl-only-desktop">{prev ? prev.title : ""}</span>
              <span className="bl-only-mobile">Sebelumnya</span>
            </button>
            <button onClick={handleNext}>
              <span className="bl-only-desktop">
                {next ? next.title : "Selesai"}
              </span>
              <span className="bl-only-mobile">
                {next ? "Selanjutnya" : "Selesai"}
              </span>{" "}
              ›
            </button>
          </nav>
        </main>

        {/* KANAN: DAFTAR MODUL */}
        <aside className="bl-side">
          <h3 className="bl-side-title">Daftar Modul</h3>

          {Object.entries(modules).map(([mi, mod]) => {
            const open = !!openModules[mi];
            return (
              <div className="bl-module" key={mi}>
                <button
                  className="bl-module-head"
                  onClick={() =>
                    setOpenModules((m) => ({ ...m, [mi]: !m[mi] }))
                  }
                >
                  <span>{mod.title}</span>
                  <span>{open ? "⌃" : "⌄"}</span>
                </button>

                {open &&
                  mod.items.map((s) => (
                    <button
                      key={s.id}
                      className={`bl-step ${s.id === currentId ? "active" : ""}`}
                      onClick={() => goTo(s.id)}
                    >
                      <span
                        className={`bl-step-icon ${isDone(s.id) ? "done" : ""}`}
                      >
                        {isDone(s.id) ? "✓" : ICON[s.type]}
                      </span>
                      <span className="bl-step-text">
                        <strong>{s.label}</strong>
                        <small>{s.duration}</small>
                      </span>
                    </button>
                  ))}
              </div>
            );
          })}

          <button className="bl-review" onClick={() => setShowReview(true)}>
            {review
              ? `★ Review kamu: ${review.rating}/5 · Ubah`
              : "☆ Beri Review & Rating"}
          </button>
        </aside>
      </div>

      {/* MODAL REVIEW */}
      {showReview && (
        <ReviewModal
          initial={review}
          onCancel={() => setShowReview(false)}
          onSubmit={(r) => {
            setReview(saveReview(id, r));
            setShowReview(false);
          }}
        />
      )}
    </div>
  );
}
