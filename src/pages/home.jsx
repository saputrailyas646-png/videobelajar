import "../assets/styles/home.css";
import logo from "../assets/logo.png";
import video from "../assets/video1.mp4"
import IconPp from "../assets/iconpp.png"



function HomePage() {
  return (
    <>
      <header>
        <nav className="navbar">
          <img className="imglogo" src={logo} alt="profile" />
          <div className="nav-menu">
            <a href="#">
              <b>Kategori</b>
            </a>
            <a href="#">{/* <img src= {profile} alt="profile" /> */}</a>
          </div>
        </nav>
      </header>
      <main className="container">
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
            <button>Temukan Video Course untuk Dipelajari!</button>
          </div>
        </section>
        <section className="video-section">
          <div className="section-title">
            <h2> Koleksi Video Pembelajaran Unggulan</h2>
            <p>Jelajahi Dunia Pengetahuan Melalui Pilihan Kami</p>
          </div>
          <div className="category">
            <a href="#" className="ative">
              Semua Kelas
            </a>
            <a href="#">Pemasaran</a>
            <a href="#"> Pengembangan Diri</a>
            <a href="#"> Bisnis</a>
          </div>
          <div className="video-grid">
            <article className="video-card">
              <video src={video} controls="a" />
              <div className="video-content">
                <h3> Big 4 Auditor Financial Analyst</h3>
                <p>
                  Mulai transformasi dengan instruktur profesional dan
                  berpengalaman.{" "}
                </p>
                <div className="author">
                  <img src={IconPp} alt="Jenna Ortega" />
                  <div>
                    <span>Jenna Ortega</span>
                    <small>Senior Accountant</small>
                  </div>
                </div>
                <div className="rating">⭐⭐⭐⭐⭐</div>
                <strong className="price"> Rp 300K</strong>
              </div>
            </article>
            <article className="video-card">
              <video src={video} controls="a" />
              <div className="video-content">
                <h3> Big 4 Auditor Financial Analyst</h3>
                <p>Tingkatkan kemampuan analisisdan pemahaman bisnis.</p>
                <div className="author">
                  <img src={IconPp} alt="Jenna Ortega" />
                  <div>
                    <span>Jenna Ortega</span>
                    <small>Senior Accountant</small>
                  </div>
                </div>
                <div className="rating">⭐⭐⭐⭐⭐</div>
                <strong className="price">Rp 300K</strong>
              </div>
            </article>
            <article className="video-card">
              <video src={video} controls="a" />
              <div className="video-content">
                <h3> Big 4 Auditor Financial Analyst</h3>
                <p>Tingkatkan kemampuan analisisdan pemahaman bisnis.</p>
                <div className="author">
                  <img src={IconPp} alt="Jenna Ortega" />
                  <div>
                    <span>Jenna Ortega</span>
                    <small>Senior Accountant</small>
                  </div>
                </div>
                <div className="rating">⭐⭐⭐⭐⭐</div>
                <strong className="price">Rp 300K</strong>
              </div>
            </article>
            <article className="video-card">
              <video src={video} controls="a" />
              <div className="video-content">
                <h3>Big 4 Auditor Financial Analyst </h3>
                <p>Belajar strategi bisnis dan pengembangan diri. </p>
                <div className="author">
                  <img src={IconPp} alt="Jenna Ortega" />
                  <div>
                    <span>Jenna Ortega</span>
                    <small>Senior Accountant</small>
                  </div>
                </div>
                <div className="rating">⭐⭐⭐⭐⭐</div>
                <strong className="price">Rp 300K</strong>
              </div>
            </article>
            <article className="video-card">
              <video src={video} controls="a" />
              <div className="video-content">
                <h3>Big 4 Auditor Financial Analyst</h3>
                <p>Pelajari dasar pengelolaan keuangan secara praktis.</p>
                <div className="author">
                  <img src={IconPp} alt="Jenna Ortega" />
                  <div>
                    <span>Jenna Ortega</span>
                    <small>Senior Accountant</small>
                  </div>
                </div>
                <div className="rating">⭐⭐⭐⭐⭐</div>
                <strong className="price">Rp 300K</strong>
              </div>
            </article>
            <article className="video-card">
              <video src={video} controls="a" />
              <div className="video-content">
                <h3>Big 4 Auditor Financial Analyst</h3>
                <p>Kuasai skill baru dengan materi yang mudah dipahami.</p>
                <div className="author">
                  <img src={IconPp} alt="Jenna Ortega" />
                  <div>
                    <span>Jenna Ortega</span>
                    <small>Senior Accountant</small>
                  </div>
                </div>
                <div className="rating">⭐⭐⭐⭐⭐</div>
                <strong className="price">Rp 300K</strong>
              </div>
            </article>
            <article className="video-card">
              <video src={video} controls="a" />
              <div className="video-content">
                <h3> Big 4 Auditor Financial Analyst</h3>
                <p>Belajar lebih mudah dengan materi yang terstruktur.</p>
                <div className="author">
                  <img src={IconPp} alt="Jenna Ortega" />
                  <div>
                    <span>Jenna Ortega</span>
                    <small>Senior Accountant</small>
                  </div>
                </div>
                <div className="rating">⭐⭐⭐⭐⭐</div>
                <strong className="price">Rp 300K</strong>
              </div>
            </article>
          </div>
        </section>
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
              <button>Subscribe</button>
            </form>
          </div>
        </section>
      </main>
      <footer>
        <div className="footer-container">
          <div className="footer-column">
            <h3 className="footer-logo"> videobelajar</h3>
            <p>Platform Video Pembelajaranuntuk meningkatkan skill.</p>
            <p>Jl. Pendidikan No. 50,Indonesia</p>
            <p>+62-812-3456-7890</p>
          </div>
          <div className="footer-column">
            <h3>Kategori</h3>
            <a href="#">Digital &amp; Teknologi</a>
            <a href="#">Pemasaran</a>
            <a href="#">Manajemen Bisnis</a>
            <a href="#">Pengembangan Diri</a>
            <a href="#">Desain</a>
          </div>
          <div className="footer-column">
            <h3>Perusahaan</h3>
            <a href="#">Tentang Kami</a>
            <a href="#">FAQ</a>
            <a href="#">Kebijakan Privasi</a>
            <a href="#">Bantuan</a>
          </div>
          <div className="footer-column">
            <h3>Komunitas</h3>
            <a href="#">Tips Sukses</a>
            <a href="#">Blog</a>
            <a href="#">Event</a>
          </div>
        </div>
        <div className="copyright">
          <p>© 2026 Copyright Sayur All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default HomePage ;
