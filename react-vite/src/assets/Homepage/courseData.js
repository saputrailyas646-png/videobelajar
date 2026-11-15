import hero from "../hero.jpg";
import hero2 from "../hero.png";
import newsletter from "../newsletter.jpg";
import iconpp from "../iconpp.png";
import ppicon from "../ppicon.png";

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
];

// ID COURSE
// Course pada kategori saat ini berulang setiap 3 card
export function getCourseById(id) {
  const courseId = ((Number(id) - 1) % 3) + 1;
  return courseData.find((item) => item.id === courseId) || courseData[0];
}
