import { useState } from "react";
import { useNavigate } from "react-router-dom";


import Navbar from "../component/navbar";
import Footer from "../component/footer";

import tutorImage from "../iconpp.png";

import "../styles/information.css";

function InformationProduct() {
  const [openIndex, setOpenIndex] = useState(0);

    const navigate = useNavigate();


  const curriculumData = [
    {
      title: "Introduction to HR",
      lessons: [
        {
          title: "Introduction to HR",
          duration: "12 Menit",
        },
        {
          title: "Introduction to HR",
          duration: "12 Menit",
        },
        {
          title: "Introduction to HR",
          duration: "12 Menit",
        },
      ],
    },
    {
      title: "Introduction to HR",
      lessons: [
        {
          title: "Introduction to HR",
          duration: "12 Menit",
        },
        {
          title: "Introduction to HR",
          duration: "12 Menit",
        },
      ],
    },
  ];

  return (
    <>
      <Navbar />

      <main className="main">
        <p>
          <span>Beranda /</span>
          <span>Desain /</span>
          Gapai Karier Impianmu sebagai Seorang UI/UX Designer & Product
          Manager.
        </p>

        {/* HERO */}
        <section className="hero">
          <div className="hero-">
            <h1>
              Gapai Karier Impianmu sebagai Seorang UI/UX Designer & Product
              Manager.
            </h1>

            <p>
              Belajar bersama tutor profesional di Video Course. Kapanpun, di
              manapun.
            </p>

            <p>⭐⭐⭐⭐⭐</p>
          </div>
        </section>

        {/* CONTENT INFORMATION */}
        <div className="conten-information">
          {/* CONTENT KIRI */}
          <div className="conten-kiri">
            {/* DESKRIPSI */}
            <div className="box-deskripsion">
              <span>Deskripsi</span>

              <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
                est saepe inventore ducimus temporibus quod non delectus ad
                labore atque, ipsum perspiciatis? Eum, voluptatibus temporibus
                esse necessitatibus, amet nostrum repellendus delectus, est
                culpa quam reiciendis magnam fugiat incidunt. Excepturi, soluta
                illum iste error ipsam saepe atque ut quas, ullam quidem sequi
                nemo maxime deserunt vero et labore excepturi impedit, tenetur
                libero magnam minus. Iste molestiae dolores maiores sapiente.
                Quod ut excepturi labore laborum rem aliquam, praesentium neque
                earum?
              </div>
            </div>

            {/* TUTOR */}
            <div className="box-deskripsion">
              <span>Belajar bersama Tutor Profesional</span>

              <div className="mini-card">
                {/* CARD KIRI */}
                <div className="card-tutor">
                  <div className="tutor-profile">
                    <img src={tutorImage} alt="Tutor" />

                    <div>
                      <h4>Gregorius Edrik Lawanto</h4>
                      <p>Senior Talent Acquisition di WingsGroup</p>
                    </div>
                  </div>

                  <p className="tutor-description">
                    Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini
                    bekerja sebagai Senior Talent Acquisition Specialist di
                    Wings Group Indonesia (Sayap Mas Utama) selama hampir 1
                    tahun.
                  </p>
                </div>

                {/* CARD KANAN */}
                <div className="card-tutor">
                  <div className="tutor-profile">
                    <img src={tutorImage} alt="Tutor" />

                    <div>
                      <h4>Gregorius Edrik Lawanto</h4>
                      <p>Senior Talent Acquisition di WingsGroup</p>
                    </div>
                  </div>

                  <p className="tutor-description">
                    Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini
                    bekerja sebagai Senior Talent Acquisition Specialist di
                    Wings Group Indonesia (Sayap Mas Utama) selama hampir 1
                    tahun.
                  </p>
                </div>
              </div>
            </div>

            {/* CURRICULUM / ACCORDION */}
            <section className="curriculum">
              <h3>Kamu akan Mempelajari</h3>

              {curriculumData.map((item, index) => (
                <div className="accordion" key={index}>
                  {/* HEADER ACCORDION */}
                  <button
                    className="accordion-header"
                    onClick={() =>
                      setOpenIndex(openIndex === index ? null : index)
                    }
                  >
                    <h4>{item.title}</h4>

                    <span>{openIndex === index ? "⌃" : "⌄"}</span>
                  </button>

                  {/* CONTENT ACCORDION */}
                  {openIndex === index && (
                    <div className="accordion-content">
                      {item.lessons.map((lesson, lessonIndex) => (
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

            <div className="box-deskripsion">
              <span>Rating dan Review</span>

              <div className="mini-card">
                {/* CARD KIRI */}
                <div className="card-tutor">
                  <div className="tutor-profile">
                    <img src={tutorImage} alt="Tutor" />

                    <div>
                      <h4>Gregorius Edrik Lawanto</h4>
                      <p>Senior Talent Acquisition di WingsGroup</p>
                    </div>
                  </div>

                  <p className="tutor-description">
                    Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini
                    bekerja sebagai Senior Talent Acquisition Specialist di
                    Wings Group Indonesia (Sayap Mas Utama) selama hampir 1
                    tahun.
                  </p>
                  <div className="video-card-rating">
                    <span className="stars">★★★</span>
                    <span className="empty-stars">★★</span>
                  </div>
                </div>

                {/* CARD KANAN */}
                <div className="card-tutor">
                  <div className="tutor-profile">
                    <img src={tutorImage} alt="Tutor" />

                    <div>
                      <h4>Gregorius Edrik Lawanto</h4>
                      <p>Senior Talent Acquisition di WingsGroup</p>
                    </div>
                  </div>

                  <p className="tutor-description">
                    Berkarier di bidang HR selama lebih dari 3 tahun. Saat ini
                    bekerja sebagai Senior Talent Acquisition Specialist di
                    Wings Group Indonesia (Sayap Mas Utama) selama hampir 1
                    tahun.
                  </p>
                  <div className="video-card-rating">
                    <span className="stars">★★★</span>
                    <span className="empty-stars">★★</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CONTENT KANAN */}
          <div className="conten-kanan">
            <div className="conten-kanan">
              <div className="card-purchase">
                {/* THUMBNAIL */}
                {/* <div className="purchase-thumbnail">
                  <img src={tutorImage} alt="Preview course" />
                </div> */}

                {/* CONTENT */}
                <div className="purchase-content">
                  <h3 className="purchase-title">
                    Gapai Karier Impianmu sebagai Seorang UI/UX Designer &
                    Product Manager.
                  </h3>

                  {/* PRICE */}
                  <div className="purchase-price">
                    <div className="price-group">
                      <span className="price-current">Rp 250K</span>
                      <span className="price-old">Rp 500K</span>
                    </div>

                    <span className="discount-badge">Diskon 50%</span>
                  </div>

                  <p className="purchase-promo">
                    Penawaran spesial tersisa 2 hari lagi!
                  </p>

                  {/* BUTTONS */}
                  <div className="purchase-buttons">
                    <button
                      className="btn-buy"
                      onClick={() => navigate("/login")}
                    >
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
        </div>
      </main>

      <Footer />
    </>
  );
}

export default InformationProduct;
