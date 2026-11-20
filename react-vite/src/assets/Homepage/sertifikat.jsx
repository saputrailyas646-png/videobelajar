import { Navigate, useNavigate, useParams } from "react-router-dom";
import Navbar from "../component/navbar";
import Footer from "../component/footer";
import { getCurrentUser } from "../utils/auth";
import { getSummary } from "../utils/learning";
import { getCourseById } from "../utils/courseLookup";
import "../styles/sertifikatpage.css";

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

export default function SertifikatPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = getCurrentUser();

  if (!user) {
    return (
      <Navigate to="/login" replace state={{ from: `/sertifikat/${id}` }} />
    );
  }

  const course = getCourseById(id);
  const summary = getSummary(id);

  // sertifikat hanya untuk kelas yang sudah selesai
  if (!summary.finished) {
    return <Navigate to={`/belajar/${id}`} replace />;
  }

  const date = formatDate(summary.finishedAt || new Date().toISOString());

  return (
    <>
      <Navbar />

      <main className="sp-page">
        <div className="sp-wrap">
          {/* BREADCRUMB */}
          <nav className="sp-crumb">
            <button onClick={() => navigate("/")}>Beranda</button> /{" "}
            <button onClick={() => navigate("/kelas")}>Kelas Saya</button> /{" "}
            <strong>Sertifikat</strong>
          </nav>

          <section className="sp-card">
            {/* SERTIFIKAT */}
            <div className="sp-cert" id="sertifikat">
              <span className="sp-brand">videobelajar</span>
              <h2 className="sp-title">Certificate</h2>
              <p className="sp-sub">of Completion</p>

              <p className="sp-small">Proudly presented to</p>
              <p className="sp-name">{user.name}</p>

              <p className="sp-small">for successfully completing</p>
              <p className="sp-course">{course.title}</p>

              <div className="sp-sign">
                <div>
                  <strong>{date}</strong>
                  <span>Tanggal</span>
                </div>
                <div>
                  <strong>{course.author}</strong>
                  <span>Mentor</span>
                </div>
              </div>
            </div>

            {/* INFO KELAS */}
            <div className="sp-info">
              <div>
                <h3>{course.title}</h3>
                <p className="sp-desc">{course.description}</p>

                <div className="sp-mentor">
                  {course.avatar && (
                    <img src={course.avatar} alt={course.author} />
                  )}
                  <div>
                    <strong>{course.author}</strong>
                    <span>{course.role}</span>
                  </div>
                </div>

                <p className="sp-rating">
                  <span>★★★★★</span> {course.rating}
                </p>
              </div>

              <button className="sp-download" onClick={() => window.print()}>
                ⬇ Download Sertifikat
              </button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
