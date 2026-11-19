import hero from "../hero.jpg";
import hero2 from "../hero.png";
import newsletter from "../newsletter.jpg";
import iconpp from "../iconpp.png";
import ppicon from "../ppicon.png";

export const IMAGES = { hero, hero2, newsletter, iconpp, ppicon };

// ---------- Helper untuk kursus tambahan ----------
const lesson = (title, minutes = 10) => ({
  title,
  duration: `${minutes} Menit`,
  videoUrl: "", // admin isi lewat Kelola Kursus > Isi Materi
});

const soal = (text, options, answer) => ({ text, options, answer });

const buatKursus = (id, data, curriculum) => ({
  id,
  rating: "4.5 (120)",
  tutor: data.author,
  tutorRole: data.role,
  tutorDescription: `Pengajar berpengalaman di bidang ${data.category}.`,
  ...data,
  image: IMAGES[data.imageKey],
  avatar: IMAGES[data.avatarKey],
  curriculum,
});

// DATA COURSE
export const courseData = [
  {
    id: 1,
    title: "Big 4 Auditor Financial Analyst",
    category: "Bisnis Manajemen",
    description:
      "Belajar analisis keuangan bersama instruktur profesional. Pelajari keterampilan yang dibutuhkan untuk menjadi financial analyst.",
    image: hero,
    avatar: iconpp,
    imageKey: "hero",
    avatarKey: "iconpp",
    author: "Jenna Ortega",
    role: "Senior Accountant",
    rating: "3.5 (86)",
    price: "Rp 300K",
    oldPrice: "Rp 600K",
    tutor: "Jenna Ortega",
    tutorRole: "Senior Accountant",
    tutorDescription:
      "Berpengalaman dalam analisis keuangan, audit, dan pengelolaan laporan keuangan perusahaan.",
    curriculum: [
      {
        title: "Introduction to Financial Analysis",
        lessons: [
          { title: "Pengenalan Financial Analyst", duration: "12 Menit" },
          { title: "Dasar Analisis Keuangan", duration: "15 Menit" },
          { title: "Memahami Laporan Keuangan", duration: "20 Menit" },
        ],
      },
      {
        title: "Financial Reporting",
        lessons: [
          { title: "Analisis Laporan Keuangan", duration: "18 Menit" },
          { title: "Financial Statement", duration: "20 Menit" },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Digital Marketing untuk Pemula",
    category: "Pemasaran",
    description:
      "Pelajari strategi pemasaran digital, pengelolaan media sosial, dan cara meningkatkan jangkauan bisnis secara online.",
    image: newsletter,
    avatar: ppicon,
    imageKey: "newsletter",
    avatarKey: "ppicon",
    author: "John Doe",
    role: "Digital Marketer",
    rating: "4.5 (120)",
    price: "Rp 250K",
    oldPrice: "Rp 500K",
    tutor: "John Doe",
    tutorRole: "Digital Marketing Specialist",
    tutorDescription:
      "Berpengalaman dalam strategi digital marketing, pengelolaan media sosial, dan pengembangan brand secara online.",
    curriculum: [
      {
        title: "Introduction to Digital Marketing",
        lessons: [
          { title: "Pengenalan Digital Marketing", duration: "12 Menit" },
          { title: "Strategi Pemasaran Digital", duration: "15 Menit" },
          { title: "Mengenal Social Media Marketing", duration: "20 Menit" },
        ],
      },
      {
        title: "Social Media Strategy",
        lessons: [
          { title: "Membuat Konten Digital", duration: "18 Menit" },
          { title: "Optimasi Media Sosial", duration: "20 Menit" },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Belajar UI UX Design",
    category: "Digital & Teknologi",
    description:
      "Pelajari cara membuat desain aplikasi yang menarik, mudah digunakan, serta memahami dasar UI UX Design.",
    image: hero2,
    avatar: iconpp,
    imageKey: "hero2",
    avatarKey: "iconpp",
    author: "Sarah Putri",
    role: "UI UX Designer",
    rating: "4.8 (95)",
    price: "Rp 200K",
    oldPrice: "Rp 400K",
    tutor: "Sarah Putri",
    tutorRole: "UI UX Designer",
    tutorDescription:
      "Berpengalaman dalam desain antarmuka aplikasi, user experience, dan pembuatan prototype produk digital.",
    curriculum: [
      {
        title: "Introduction to UI UX Design",
        lessons: [
          { title: "Pengenalan UI UX Design", duration: "12 Menit" },
          { title: "Memahami User Experience", duration: "15 Menit" },
          { title: "Dasar User Interface", duration: "20 Menit" },
        ],
      },
      {
        title: "Design and Prototyping",
        lessons: [
          { title: "Membuat Wireframe", duration: "18 Menit" },
          { title: "Membuat Prototype", duration: "20 Menit" },
        ],
      },
    ],
  },

  // ---------- Kursus 4 sampai 12 ----------
  buatKursus(
    4,
    {
      title: "Strategi Pemasaran Retail",
      category: "Pemasaran",
      description:
        "Pelajari cara menarik pelanggan dan meningkatkan penjualan di dunia retail.",
      imageKey: "hero",
      avatarKey: "iconpp",
      author: "Rina Wijaya",
      role: "Retail Marketing Manager",
      price: "Rp 280K",
      oldPrice: "Rp 450K",
    },
    [
      {
        title: "Dasar Pemasaran Retail",
        lessons: [
          lesson("Pengenalan Bauran Pemasaran 4P", 10),
          lesson("Visual Merchandising", 15),
          lesson("Upselling dan Cross-selling", 12),
        ],
        quiz: [
          soal(
            "Apa kepanjangan 4P dalam bauran pemasaran?",
            [
              "Product, Price, Place, Promotion",
              "People, Process, Profit, Packaging",
              "Product, Profit, Planning, Promotion",
              "Place, Payment, People, Price",
            ],
            0,
          ),
          soal(
            "Kasir menawarkan casing saat pelanggan membeli ponsel. Teknik ini disebut...",
            ["Upselling", "Cross-selling", "Dumping", "Cashback"],
            1,
          ),
        ],
      },
    ],
  ),

  buatKursus(
    5,
    {
      title: "Social Media Marketing untuk Bisnis",
      category: "Pemasaran",
      description:
        "Bangun brand dan jangkau lebih banyak pelanggan lewat media sosial.",
      imageKey: "newsletter",
      avatarKey: "ppicon",
      author: "Dimas Pratama",
      role: "Social Media Strategist",
      price: "Rp 220K",
      oldPrice: "Rp 400K",
    },
    [
      {
        title: "Strategi Konten Media Sosial",
        lessons: [
          lesson("Memilih Platform yang Tepat", 10),
          lesson("Membuat Content Calendar", 15),
          lesson("Mengukur Hasil Kampanye", 12),
        ],
        quiz: [
          soal(
            "Apa tujuan utama content calendar?",
            [
              "Menghitung pajak",
              "Merencanakan jadwal dan topik unggahan",
              "Mengganti password akun",
              "Menghapus komentar",
            ],
            1,
          ),
          soal(
            "Engagement rate mengukur...",
            [
              "Jumlah produk",
              "Interaksi audiens terhadap konten",
              "Harga iklan",
              "Kecepatan internet",
            ],
            1,
          ),
        ],
      },
    ],
  ),

  buatKursus(
    6,
    {
      title: "Public Speaking Percaya Diri",
      category: "Pengembangan Diri",
      description:
        "Latih keberanian dan teknik berbicara di depan umum dengan percaya diri.",
      imageKey: "hero2",
      avatarKey: "iconpp",
      author: "Maya Anggraini",
      role: "Communication Coach",
      price: "Rp 180K",
      oldPrice: "Rp 350K",
    },
    [
      {
        title: "Dasar Berbicara di Depan Umum",
        lessons: [
          lesson("Mengatasi Rasa Gugup", 10),
          lesson("Struktur Presentasi yang Menarik", 15),
          lesson("Bahasa Tubuh dan Intonasi", 12),
        ],
        quiz: [
          soal(
            "Cara efektif mengurangi gugup sebelum berbicara adalah...",
            [
              "Menghindari latihan",
              "Berlatih dan mengatur napas",
              "Berbicara secepat mungkin",
              "Tidak menatap audiens",
            ],
            1,
          ),
          soal(
            "Kontak mata saat presentasi berguna untuk...",
            [
              "Menyembunyikan slide",
              "Membangun kedekatan dengan audiens",
              "Menghemat waktu",
              "Menghindari pertanyaan",
            ],
            1,
          ),
        ],
      },
    ],
  ),

  buatKursus(
    7,
    {
      title: "Manajemen Waktu dan Produktivitas",
      category: "Pengembangan Diri",
      description:
        "Atur prioritas dan kebiasaan kerja supaya lebih produktif setiap hari.",
      imageKey: "hero",
      avatarKey: "ppicon",
      author: "Andi Saputra",
      role: "Productivity Trainer",
      price: "Rp 150K",
      oldPrice: "Rp 300K",
    },
    [
      {
        title: "Mengatur Prioritas",
        lessons: [
          lesson("Menyusun Target Harian", 10),
          lesson("Matriks Eisenhower", 12),
          lesson("Teknik Pomodoro", 10),
        ],
        quiz: [
          soal(
            "Matriks Eisenhower membagi tugas berdasarkan...",
            [
              "Warna dan ukuran",
              "Tingkat penting dan mendesak",
              "Nama dan tanggal",
              "Jumlah halaman",
            ],
            1,
          ),
          soal(
            "Teknik Pomodoro bekerja dengan cara...",
            [
              "Bekerja 25 menit lalu istirahat singkat",
              "Bekerja 8 jam tanpa henti",
              "Istirahat 1 jam dulu",
              "Mengerjakan semua tugas sekaligus",
            ],
            0,
          ),
        ],
      },
    ],
  ),

  buatKursus(
    8,
    {
      title: "Dasar Manajemen Bisnis UMKM",
      category: "Bisnis Manajemen",
      description:
        "Mulai dan kelola usaha kecil dengan perencanaan bisnis yang rapi.",
      imageKey: "newsletter",
      avatarKey: "iconpp",
      author: "Hendra Kusuma",
      role: "Business Consultant",
      price: "Rp 260K",
      oldPrice: "Rp 500K",
    },
    [
      {
        title: "Memulai Usaha",
        lessons: [
          lesson("Mengenal UMKM", 10),
          lesson("Business Model Canvas", 15),
          lesson("Menyusun Rencana Keuangan Sederhana", 15),
        ],
        quiz: [
          soal(
            "UMKM adalah singkatan dari...",
            [
              "Usaha Mikro, Kecil, dan Menengah",
              "Unit Manajemen Keuangan Modern",
              "Usaha Mandiri Kerja Mitra",
              "Usaha Mikro Kota Menengah",
            ],
            0,
          ),
          soal(
            "Business Model Canvas digunakan untuk...",
            [
              "Memetakan model bisnis secara ringkas",
              "Mencetak laporan pajak",
              "Mengatur gaji karyawan",
              "Mendesain logo",
            ],
            0,
          ),
        ],
      },
    ],
  ),

  buatKursus(
    9,
    {
      title: "Analisis Laporan Keuangan",
      category: "Bisnis Manajemen",
      description:
        "Pahami cara membaca laporan keuangan untuk mengambil keputusan bisnis.",
      imageKey: "hero2",
      avatarKey: "ppicon",
      author: "Lestari Dewi",
      role: "Financial Analyst",
      price: "Rp 320K",
      oldPrice: "Rp 600K",
    },
    [
      {
        title: "Membaca Laporan Keuangan",
        lessons: [
          lesson("Persamaan Dasar Akuntansi", 12),
          lesson("Laporan Laba Rugi", 15),
          lesson("Neraca dan Arus Kas", 15),
        ],
        quiz: [
          soal(
            "Laporan yang menunjukkan pendapatan dan beban dalam satu periode adalah...",
            ["Neraca", "Laporan laba rugi", "Laporan arus kas", "Catatan kaki"],
            1,
          ),
          soal(
            "Persamaan dasar akuntansi adalah...",
            [
              "Aset = Kewajiban + Ekuitas",
              "Aset = Pendapatan - Beban",
              "Ekuitas = Aset + Kewajiban",
              "Kewajiban = Aset + Ekuitas",
            ],
            0,
          ),
        ],
      },
    ],
  ),

  buatKursus(
    10,
    {
      title: "Dasar Pemrograman Web",
      category: "Digital & Teknologi",
      description:
        "Belajar HTML, CSS, dan JavaScript untuk membuat website pertamamu.",
      imageKey: "hero",
      avatarKey: "iconpp",
      author: "Fajar Nugroho",
      role: "Frontend Engineer",
      price: "Rp 240K",
      oldPrice: "Rp 450K",
    },
    [
      {
        title: "Fondasi Web",
        lessons: [
          lesson("Struktur Halaman dengan HTML", 15),
          lesson("Mempercantik Tampilan dengan CSS", 15),
          lesson("Interaksi Dasar dengan JavaScript", 18),
        ],
        quiz: [
          soal(
            "HTML berfungsi untuk...",
            [
              "Menata struktur halaman web",
              "Mengatur database",
              "Mengompres gambar",
              "Mengirim email",
            ],
            0,
          ),
          soal(
            "CSS digunakan untuk...",
            [
              "Menentukan tampilan halaman",
              "Menyimpan data pengguna",
              "Menjalankan server",
              "Menghitung pajak",
            ],
            0,
          ),
        ],
      },
    ],
  ),

  buatKursus(
    11,
    {
      title: "Analisis Data dengan Excel",
      category: "Digital & Teknologi",
      description:
        "Olah dan visualisasikan data bisnis dengan rumus dan fitur Excel.",
      imageKey: "newsletter",
      avatarKey: "ppicon",
      author: "Putri Maharani",
      role: "Data Analyst",
      price: "Rp 200K",
      oldPrice: "Rp 380K",
    },
    [
      {
        title: "Dasar Pengolahan Data",
        lessons: [
          lesson("Rumus Dasar Excel", 12),
          lesson("Membersihkan Data", 15),
          lesson("PivotTable dan Grafik", 18),
        ],
        quiz: [
          soal(
            "Rumus Excel untuk menjumlahkan sekelompok sel adalah...",
            ["=SUM()", "=COUNT()", "=MAX()", "=LEN()"],
            0,
          ),
          soal(
            "Fitur Excel untuk meringkas data berukuran besar adalah...",
            ["PivotTable", "Spell Check", "Freeze Pane", "WordArt"],
            0,
          ),
        ],
      },
    ],
  ),

  buatKursus(
    12,
    {
      title: "Kepemimpinan untuk Pemula",
      category: "Pengembangan Diri",
      description:
        "Kenali gaya kepemimpinan dan cara memimpin tim dengan efektif.",
      imageKey: "hero2",
      avatarKey: "iconpp",
      author: "Bagas Wicaksono",
      role: "HR Manager",
      price: "Rp 270K",
      oldPrice: "Rp 480K",
    },
    [
      {
        title: "Dasar Kepemimpinan",
        lessons: [
          lesson("Gaya Kepemimpinan", 12),
          lesson("Komunikasi dengan Tim", 15),
          lesson("Delegasi dan Umpan Balik", 15),
        ],
        quiz: [
          soal(
            "Pemimpin yang baik sebaiknya...",
            [
              "Mendengarkan dan memberi arahan yang jelas",
              "Menghindari umpan balik",
              "Mengerjakan semuanya sendiri",
              "Menyalahkan anggota tim",
            ],
            0,
          ),
          soal(
            "Delegasi tugas bertujuan untuk...",
            [
              "Membagi pekerjaan sesuai kemampuan tim",
              "Menghindari tanggung jawab",
              "Menambah beban pemimpin",
              "Mengurangi komunikasi",
            ],
            0,
          ),
        ],
      },
    ],
  ),
];
