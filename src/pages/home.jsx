import VideoCard from "./videocard";

import "../assets/styles/home.css";
import logo from "../assets/logo.png";
import video from "../assets/video1.mp4";
import IconPp from "../assets/iconpp.png";

function HomePage() {

const videoData = [
  {
    id: 1,
    title: "Big 4 Auditor Financial Analyst",
    description:
      "Mulai transformasi dengan instruktur profesional dan berpengalaman.",
    author: "Jenna Ortega",
    role: "Senior Accountant",
    price: "Rp 300K",
  },
  {
    id: 2,
    title: "Big 4 Auditor Financial Analyst",
    description: "Tingkatkan kemampuan analisis dan pemahaman bisnis.",
    author: "Jenna Ortega",
    role: "Senior Accountant",
    price: "Rp 300K",
  },
  {
    id: 3,
    title: "Big 4 Auditor Financial Analyst",
    description: "Tingkatkan kemampuan analisis dan pemahaman bisnis.",
    author: "Jenna Ortega",
    role: "Senior Accountant",
    price: "Rp 300K",
  },
  {
    id: 4,
    title: "Big 4 Auditor Financial Analyst",
    description: "Belajar strategi bisnis dan pengembangan diri.",
    author: "Jenna Ortega",
    role: "Senior Accountant",
    price: "Rp 300K",
  },
  {
    id: 5,
    title: "Big 4 Auditor Financial Analyst",
    description: "Pelajari dasar pengelolaan keuangan secara praktis.",
    author: "Jenna Ortega",
    role: "Senior Accountant",
    price: "Rp 300K",
  },
  {
    id: 6,
    title: "Big 4 Auditor Financial Analyst",
    description: "Kuasai skill baru dengan materi yang mudah dipahami.",
    author: "Jenna Ortega",
    role: "Senior Accountant",
    price: "Rp 300K",
  },
  {
    id: 7,
    title: "Big 4 Auditor Financial Analyst",
    description: "Belajar lebih mudah dengan materi yang terstruktur.",
    author: "Jenna Ortega",
    role: "Senior Accountant",
    price: "Rp 300K",
  },
];

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
            {videoData.map((item) => (
              <VideoCard
                key={item.id}
                video={video}
                title={item.title}
                description={item.description}
                iconPp={IconPp}
                author={item.author}
                role={item.role}
                price={item.price}
              />
            ))}
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

export default HomePage;
