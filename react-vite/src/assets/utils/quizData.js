import { getCourseById } from "./courseLookup";
// Q(pertanyaan, [pilihan], indeks jawaban benar mulai dari 0)
const Q = (text, options, answer) => ({ text, options, answer });

// QUIZ[idKelas][indeksModul] = 10 soal
const QUIZ = {
  // ===== 1. Big 4 Auditor Financial Analyst =====
  1: [
    [
      Q(
        "Apa tugas utama seorang financial analyst?",
        [
          "Mengelola gudang barang",
          "Menganalisis data keuangan untuk membantu keputusan bisnis",
          "Merancang logo perusahaan",
          "Menulis kode program",
        ],
        1,
      ),
      Q(
        "Laporan yang menunjukkan aset, liabilitas, dan ekuitas pada waktu tertentu adalah…",
        [
          "Laporan laba rugi",
          "Laporan arus kas",
          "Neraca",
          "Laporan perubahan modal",
        ],
        2,
      ),
      Q(
        "Persamaan dasar akuntansi adalah…",
        [
          "Aset = Pendapatan − Beban",
          "Aset = Liabilitas + Ekuitas",
          "Ekuitas = Aset + Liabilitas",
          "Liabilitas = Aset + Ekuitas",
        ],
        1,
      ),
      Q(
        "Rasio yang mengukur kemampuan membayar utang jangka pendek adalah rasio…",
        ["Profitabilitas", "Aktivitas", "Pasar", "Likuiditas"],
        3,
      ),
      Q(
        "Current ratio dihitung dengan…",
        [
          "Laba bersih ÷ penjualan",
          "Aset lancar ÷ liabilitas lancar",
          "Total utang ÷ ekuitas",
          "Penjualan ÷ total aset",
        ],
        1,
      ),
      Q(
        "Laporan laba rugi menunjukkan…",
        [
          "Posisi aset pada akhir periode",
          "Daftar pemegang saham",
          "Pendapatan dan beban dalam suatu periode",
          "Hanya arus kas investasi",
        ],
        2,
      ),
      Q(
        "Net profit margin dihitung dari…",
        [
          "Pendapatan ÷ aset",
          "Aset ÷ ekuitas",
          "Beban ÷ laba kotor",
          "Laba bersih ÷ pendapatan",
        ],
        3,
      ),
      Q(
        "Manakah yang termasuk aset lancar?",
        ["Gedung kantor", "Mesin pabrik", "Hak paten", "Kas"],
        3,
      ),
      Q(
        "Tujuan utama analisis laporan keuangan adalah…",
        [
          "Menentukan warna merek",
          "Menilai kesehatan dan kinerja keuangan perusahaan",
          "Menyusun jadwal produksi",
          "Menghitung gaji karyawan saja",
        ],
        1,
      ),
      Q(
        "Analisis yang membandingkan angka antar periode untuk melihat tren disebut analisis…",
        ["Geografis", "Demografis", "Horizontal", "Psikografis"],
        2,
      ),
    ],
    [
      Q(
        "Tiga laporan keuangan utama adalah neraca, laba rugi, dan…",
        [
          "Laporan stok",
          "Laporan absensi",
          "Laporan penjualan harian",
          "Laporan arus kas",
        ],
        3,
      ),
      Q(
        "Laporan arus kas menggambarkan…",
        [
          "Nilai aset tetap",
          "Pergerakan kas masuk dan keluar",
          "Jumlah karyawan",
          "Harga saham",
        ],
        1,
      ),
      Q(
        "Contoh arus kas dari aktivitas operasi adalah…",
        [
          "Penerbitan saham",
          "Pembelian tanah",
          "Penerimaan kas dari pelanggan",
          "Pembayaran dividen",
        ],
        2,
      ),
      Q(
        "Return on Equity (ROE) mengukur…",
        [
          "Utang relatif terhadap aset",
          "Kas relatif terhadap beban",
          "Pendapatan relatif terhadap pelanggan",
          "Laba relatif terhadap ekuitas pemegang saham",
        ],
        3,
      ),
      Q(
        "Debt to equity ratio yang tinggi menunjukkan…",
        [
          "Perusahaan tanpa utang",
          "Perusahaan sangat likuid",
          "Ketergantungan yang besar pada utang",
          "Laba pasti tinggi",
        ],
        2,
      ),
      Q(
        "Laba kotor diperoleh dari…",
        [
          "Pendapatan ditambah beban",
          "Aset dikurangi liabilitas",
          "Pendapatan dikurangi harga pokok penjualan",
          "Laba bersih dikurangi pajak",
        ],
        2,
      ),
      Q(
        "Catatan atas laporan keuangan berfungsi untuk…",
        [
          "Menghias laporan",
          "Menggantikan neraca",
          "Memberi penjelasan rinci atas angka dalam laporan",
          "Menentukan harga saham",
        ],
        2,
      ),
      Q(
        "Standar akuntansi keuangan yang berlaku di Indonesia adalah…",
        ["KUHP", "SNI", "UUD", "PSAK"],
        3,
      ),
      Q(
        "Prinsip akrual mencatat transaksi ketika…",
        [
          "Kas diterima saja",
          "Kas dikeluarkan saja",
          "Transaksi terjadi, walaupun kas belum bergerak",
          "Akhir tahun saja",
        ],
        2,
      ),
      Q(
        "Laporan keuangan yang baik harus…",
        [
          "Rumit agar sulit dipahami",
          "Hanya berisi angka laba",
          "Relevan dan dapat diandalkan",
          "Disusun tanpa standar",
        ],
        2,
      ),
    ],
  ],

  // ===== 2. Digital Marketing untuk Pemula =====
  2: [
    [
      Q(
        "Digital marketing adalah pemasaran yang memanfaatkan…",
        [
          "Hanya brosur cetak",
          "Media dan platform digital",
          "Papan reklame saja",
          "Pameran dagang",
        ],
        1,
      ),
      Q(
        "SEO bertujuan untuk…",
        [
          "Menghapus iklan",
          "Mengirim email massal",
          "Meningkatkan peringkat situs di mesin pencari",
          "Mengganti domain",
        ],
        2,
      ),
      Q(
        "Target audiens adalah…",
        [
          "Semua orang tanpa kecuali",
          "Kelompok orang yang paling mungkin menjadi pelanggan",
          "Hanya pesaing",
          "Tim internal",
        ],
        1,
      ),
      Q(
        "CTR (click-through rate) menunjukkan…",
        [
          "Jumlah stok",
          "Persentase orang yang mengklik setelah melihat iklan",
          "Harga iklan",
          "Jumlah follower",
        ],
        1,
      ),
      Q(
        "Email marketing termasuk saluran…",
        [
          "Pemasaran konvensional saja",
          "Hubungan masyarakat luar ruang",
          "Pameran",
          "Pemasaran digital",
        ],
        3,
      ),
      Q(
        "Social media marketing memanfaatkan…",
        ["Radio", "Koran", "Platform seperti Instagram dan TikTok", "Spanduk"],
        2,
      ),
      Q(
        "Funnel pemasaran menggambarkan…",
        [
          "Struktur gedung",
          "Daftar harga",
          "Perjalanan calon pelanggan dari mengenal hingga membeli",
          "Jadwal rapat",
        ],
        2,
      ),
      Q(
        "Salah satu keunggulan digital marketing adalah…",
        [
          "Hasilnya tidak bisa diukur",
          "Jangkauan luas dengan hasil yang terukur",
          "Selalu gratis",
          "Hanya untuk perusahaan besar",
        ],
        1,
      ),
      Q(
        "Brand awareness berarti…",
        [
          "Pelanggan membeli berulang",
          "Tingkat orang mengenal sebuah merek",
          "Harga turun",
          "Jumlah cabang toko",
        ],
        1,
      ),
      Q(
        "Langkah awal menyusun strategi pemasaran digital adalah…",
        [
          "Langsung membeli iklan",
          "Menentukan tujuan dan target audiens",
          "Mengganti logo",
          "Menambah stok",
        ],
        1,
      ),
    ],
    [
      Q(
        "Content calendar berguna untuk…",
        [
          "Menghitung pajak",
          "Merencanakan jadwal dan jenis konten",
          "Mengatur gaji",
          "Mengunci akun",
        ],
        1,
      ),
      Q(
        "Engagement rate mengukur…",
        [
          "Jumlah produk terjual",
          "Kecepatan internet",
          "Harga iklan",
          "Interaksi audiens seperti like, komentar, dan share",
        ],
        3,
      ),
      Q(
        "Hashtag digunakan untuk…",
        [
          "Mengunci akun",
          "Mengelompokkan dan memudahkan konten ditemukan",
          "Menghapus komentar",
          "Mengganti nama akun",
        ],
        1,
      ),
      Q(
        "Konten yang baik bagi audiens biasanya…",
        [
          "Tidak berhubungan dengan audiens",
          "Relevan, bernilai, dan konsisten",
          "Selalu panjang dan rumit",
          "Hanya berisi promosi",
        ],
        1,
      ),
      Q(
        "Waktu posting terbaik sebaiknya ditentukan dengan…",
        [
          "Menebak tanpa data",
          "Menganalisis data aktivitas audiens",
          "Posting tengah malam saja",
          "Meniru pesaing secara buta",
        ],
        1,
      ),
      Q(
        "Call to action (CTA) adalah…",
        [
          "Nama akun",
          "Warna latar",
          "Ajakan agar audiens melakukan tindakan tertentu",
          "Jumlah follower",
        ],
        2,
      ),
      Q(
        "Insight akun media sosial membantu…",
        [
          "Mengganti nama",
          "Memahami performa konten dan audiens",
          "Menghapus pengikut",
          "Memblokir pesaing",
        ],
        1,
      ),
      Q(
        "User generated content adalah konten yang dibuat oleh…",
        ["Perusahaan saja", "Pengguna atau pelanggan", "Mesin", "Pesaing"],
        1,
      ),
      Q(
        "A/B testing pada konten dilakukan dengan…",
        [
          "Menghapus satu akun",
          "Memakai satu versi saja",
          "Menguji dua versi untuk melihat mana yang lebih efektif",
          "Menggandakan anggaran",
        ],
        2,
      ),
      Q(
        "Optimasi profil media sosial mencakup…",
        [
          "Mengosongkan bio",
          "Mengganti nama tiap hari",
          "Menyembunyikan kontak",
          "Foto profil, bio, dan tautan yang jelas",
        ],
        3,
      ),
    ],
  ],

  // ===== 3. Belajar UI UX Design =====
  3: [
    [
      Q(
        "UX adalah singkatan dari…",
        [
          "User Xylophone",
          "User Experience",
          "Unique Extra",
          "Universal Exchange",
        ],
        1,
      ),
      Q(
        "UI berfokus pada…",
        [
          "Tampilan antarmuka yang digunakan pengguna",
          "Infrastruktur server",
          "Pajak",
          "Logistik",
        ],
        0,
      ),
      Q(
        "Tujuan utama desain UX adalah…",
        [
          "Membuat tampilan seramai mungkin",
          "Menambah fitur sebanyak mungkin",
          "Membuat pengalaman penggunaan yang mudah dan menyenangkan",
          "Mengurangi kontras",
        ],
        2,
      ),
      Q(
        "User persona adalah…",
        [
          "Data server",
          "Gambaran pengguna ideal berdasarkan riset",
          "Nama aplikasi",
          "Jenis font",
        ],
        1,
      ),
      Q(
        "User research dilakukan untuk…",
        [
          "Memilih warna favorit tim",
          "Memahami kebutuhan dan masalah pengguna",
          "Menentukan harga saham",
          "Menghapus fitur",
        ],
        1,
      ),
      Q(
        "Manakah yang termasuk elemen UI?",
        ["Router dan kabel", "Database", "Tombol, ikon, dan form", "Server"],
        2,
      ),
      Q(
        "Hierarki visual berguna untuk…",
        [
          "Menyembunyikan konten",
          "Mengarahkan perhatian pengguna ke elemen penting",
          "Mempercepat internet",
          "Menambah iklan",
        ],
        1,
      ),
      Q(
        "Kontras warna yang cukup penting agar…",
        [
          "Gambar lebih berat",
          "Aplikasi lebih lambat",
          "Teks mudah dibaca",
          "Warna lebih sedikit",
        ],
        2,
      ),
      Q(
        "Konsistensi dalam desain berarti…",
        [
          "Setiap halaman memakai gaya berbeda",
          "Elemen dan pola yang sama dipakai di seluruh produk",
          "Memakai sebanyak mungkin font",
          "Mengubah tata letak tiap hari",
        ],
        1,
      ),
      Q(
        "Usability berarti…",
        [
          "Jumlah fitur",
          "Ukuran file",
          "Harga produk",
          "Seberapa mudah produk dipakai untuk mencapai tujuan",
        ],
        3,
      ),
    ],
    [
      Q(
        "Wireframe adalah…",
        [
          "Desain final lengkap dengan warna",
          "Kerangka dasar tata letak tanpa detail visual",
          "Kode program",
          "Dokumen kontrak",
        ],
        1,
      ),
      Q(
        "Prototype berfungsi untuk…",
        [
          "Menyimpan data pengguna",
          "Mensimulasikan interaksi produk sebelum dikembangkan",
          "Menghapus desain",
          "Menghitung biaya produksi",
        ],
        1,
      ),
      Q(
        "Wireframe low-fidelity biasanya…",
        [
          "Berisi kode final",
          "Memakai foto resolusi tinggi",
          "Sederhana dan tanpa detail visual",
          "Sudah berisi animasi lengkap",
        ],
        2,
      ),
      Q(
        "Tools yang umum dipakai untuk desain UI dan prototype adalah…",
        ["Excel", "Figma", "Notepad", "Paint 3D"],
        1,
      ),
      Q(
        "Tujuan usability testing adalah…",
        [
          "Menentukan harga",
          "Memilih nama",
          "Menghitung pajak",
          "Menemukan masalah penggunaan sebelum produk dirilis",
        ],
        3,
      ),
      Q(
        "Grid layout membantu…",
        [
          "Menghapus warna",
          "Menyusun elemen agar rapi dan seimbang",
          "Menambah file",
          "Mempercepat server",
        ],
        1,
      ),
      Q(
        "Design system berisi…",
        [
          "Kumpulan komponen, warna, dan aturan desain yang dipakai bersama",
          "Hanya satu gambar",
          "Daftar gaji",
          "Catatan rapat",
        ],
        0,
      ),
      Q(
        "User flow menggambarkan…",
        [
          "Warna merek",
          "Langkah yang dilalui pengguna untuk mencapai tujuan",
          "Harga produk",
          "Struktur database",
        ],
        1,
      ),
      Q(
        "Hasil feedback pengguna sebaiknya…",
        [
          "Diabaikan",
          "Dipakai untuk memperbaiki desain",
          "Dihapus",
          "Disembunyikan dari tim",
        ],
        1,
      ),
      Q(
        "Desain responsif berarti…",
        [
          "Hanya untuk layar desktop",
          "Tidak memakai gambar",
          "Tampilan menyesuaikan berbagai ukuran layar",
          "Selalu satu kolom tetap",
        ],
        2,
      ),
    ],
  ],
};
// Soal bawaan (dari data di atas) untuk kelas dan modul tertentu
export function getBuiltInQuestions(courseId, moduleIndex) {
  return (QUIZ[courseId] || [])[moduleIndex] || [];
}

// Soal sesuai kelas (id card) dan modul.
// Kalau admin sudah mengisi soal lewat Kelola Kursus (mod.quiz), itu yang dipakai.
export function getQuestions(cardId, moduleIndex) {
  const course = getCourseById(cardId);
  const mod = course.curriculum?.[moduleIndex];
  if (mod && Array.isArray(mod.quiz)) return mod.quiz;
  return getBuiltInQuestions(course.id, moduleIndex);
}
