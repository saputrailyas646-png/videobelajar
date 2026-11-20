import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";
import { useCourseStore } from "../../store/useCourseStore";
import Navbar from "../component/navbar";
import Footer from "../component/footer";

import "../styles/information.css";

function InformationProduct() {
  const [openIndex, setOpenIndex] = useState(0);

  const navigate = useNavigate();
  const { id } = useParams();

  // DATA KURSUS: dicari dari Zustand store berdasarkan id di URL.
  // id dari URL berupa teks, id di store berupa angka, jadi diubah dulu.
  const course = useCourseStore((s) =>
    s.courses.find((c) => c.id === Number(id)),
  );
  const loading = useCourseStore((s) => s.loading);

  // TOMBOL BELI SEKARANG
  const handleBuy = () => {
    const user = getCurrentUser();

    if (!user) {
      navigate("/login", {
        state: {
          from: `/information/${id}`,
        },
      });
      return;
    }

    navigate(`/metode/${id}`);
  };

  // KURSUS BELUM ADA: sedang dimuat dari API, atau id tidak ditemukan
  if (!course) {
    return (
      <>
        <Navbar />
        <main className="main">
          <p style={{ textAlign: "center", padding: "48px 0" }}>
            {loading ? "Memuat kursus..." : "Kursus tidak ditemukan."}
          </p>
        </main>
        <Footer />
      </>
    );
  }

  // KOMPONEN TUTOR
  const TutorCard = () => (
    <div className="card-tutor">
      <div className="tutor-profile">
        <img src={course.avatar} alt={course.tutor} />

        <div>
          <h4>{course.tutor}</h4>
          <p>{course.tutorRole}</p>
        </div>
      </div>

      <p className="tutor-description">{course.tutorDescription}</p>
    </div>
  );

  // KOMPONEN REVIEW
  const ReviewCard = () => (
    <div className="card-tutor">
      <div className="tutor-profile">
        <img src={course.avatar} alt={course.author} />

        <div>
          <h4>{course.author}</h4>
          <p>{course.role}</p>
        </div>
      </div>

      <p className="tutor-description">
        Materi pembelajaran sangat menarik dan mudah dipahami. Course ini
        membantu meningkatkan keterampilan saya.
      </p>

      <div className="video-card-rating">
        <span className="stars">★★★★★</span>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />

      <main className="main">
        {/* BREADCRUMB */}
        <p>
          <span>Beranda /</span>
          <span>{course.category} /</span>
          {course.title}
        </p>

        {/* HERO */}
        <section className="hero">
          <div className="hero-">
            <h1>{course.title}</h1>

            <p>
              Belajar bersama tutor profesional di Video Course. Kapanpun, di
              manapun.
            </p>

            <p>{course.rating}</p>
          </div>
        </section>

        {/* CONTENT INFORMATION */}
        <div className="conten-information">
          {/* CONTENT KIRI */}
          <div className="conten-kiri">
            {/* DESKRIPSI */}
            <div className="box-deskripsion">
              <span>Deskripsi</span>

              <div>{course.description}</div>
            </div>

            {/* TUTOR */}
            <div className="box-deskripsion">
              <span>Belajar bersama Tutor Profesional</span>

              <div className="mini-card">
                <TutorCard />
                <TutorCard />
              </div>
            </div>

            {/* CURRICULUM / ACCORDION */}
            <section className="curriculum">
              <h3>Kamu akan Mempelajari</h3>

              {(course.curriculum ?? []).map((item, index) => (
                <div className="accordion" key={index}>
                  <button
                    className="accordion-header"
                    onClick={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                  >
                    <h4>{item.title}</h4>

                    <span>{openIndex === index ? "⌃" : "⌄"}</span>
                  </button>

                  {openIndex === index && (
                    <div className="accordion-content">
                      {(item.lessons ?? []).map((lesson, lessonIndex) => (
                        <div className="lesson-item" key={lessonIndex}>
                          <p>{lesson.title}</p>

                          <div className="lesson-info">
                            <span>⊙ Video</span>
                            <span>◷ {lesson.duration}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </section>

            {/* RATING DAN REVIEW */}
            <div className="box-deskripsion">
              <span>Rating dan Review</span>

              <div className="mini-card">
                <ReviewCard />
                <ReviewCard />
              </div>
            </div>
          </div>

          {/* CONTENT KANAN */}
          <div className="conten-kanan">
            <div className="card-purchase">
              <div className="purchase-content">
                <h3 className="purchase-title">{course.title}</h3>

                {/* PRICE */}
                <div className="purchase-price">
                  <div className="price-group">
                    <span className="price-current">{course.price}</span>

                    <span className="price-old">{course.oldPrice}</span>
                  </div>

                  <span className="discount-badge">Diskon 50%</span>
                </div>

                <p className="purchase-promo">
                  Penawaran spesial tersisa 2 hari lagi!
                </p>

                {/* BUTTONS */}
                <div className="purchase-buttons">
                  <button className="btn-buy" onClick={handleBuy}>
                    Beli Sekarang
                  </button>

                  <button className="btn-share">Bagikan Kelas</button>
                </div>

                {/* CLASS BENEFITS */}
                <div className="purchase-includes">
                  <h4>Kelas Ini Sudah Termasuk</h4>

                  <div className="includes-grid">
                    {[
                      { icon: "♧", text: "Ujian Akhir" },
                      { icon: "▣", text: "49 Video" },
                      { icon: "▤", text: "7 Dokumen" },
                      { icon: "♙", text: "Sertifikat" },
                      { icon: "♧", text: "Pretest" },
                    ].map((item, index) => (
                      <div className="includes-item" key={index}>
                        <span>{item.icon}</span>
                        <p>{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* LANGUAGE */}
                <div className="purchase-language">
                  <h4>Bahasa Pengantar</h4>

                  <div className="language-item">
                    <span>◎</span>
                    <p>Bahasa Indonesia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default InformationProduct;
