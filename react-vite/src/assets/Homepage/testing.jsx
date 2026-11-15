import Navbar from "../component/navbar"
import Card from "../component/card"


import hero from "../hero.jpg";
import hero2 from "../hero.png";
import newsletter from "../newsletter.jpg";
import iconpp from "../iconpp.png";
import ppicon from "../ppicon.png";

function Testing() {

     // DATA VIDEO COURSE
      const videoData = [
        {
          id: 1,
          title: "Big 4 Auditor Financial Analyst",
          description: "Belajar analisis keuangan bersama instruktur profesional.",
          image: hero,
          avatar: iconpp,
          author: "Jenna Ortega",
          role: "Senior Accountant",
          rating: "3.5 (86)",
          price: "Rp 300K",
          category: "Bisnis Manajemen",
          date: "2026-11-08",
        },
        {
          id: 2,
          title: "Digital Marketing untuk Pemula",
          description: "Pelajari strategi pemasaran digital.",
          image: newsletter,
          avatar: ppicon,
          author: "John Doe",
          role: "Digital Marketer",
          rating: "4.5 (120)",
          price: "Rp 250K",
          category: "Pemasaran",
          date: "2026-11-05",
        },
        {
          id: 3,
          title: "Belajar UI UX Design",
          description: "Membuat desain aplikasi yang menarik.",
          image: hero2,
          avatar: iconpp,
          author: "Sarah Putri",
          role: "UI UX Designer",
          rating: "4.8 (95)",
          price: "Rp 200K",
          category: "Digital & Teknologi",
          date: "2026-11-01",
        },
        {
          id: 4,
          title: "Big 4 Auditor Financial Analyst",
          description: "Belajar analisis keuangan bersama instruktur profesional.",
          image: hero,
          avatar: iconpp,
          author: "Jenna Ortega",
          role: "Senior Accountant",
          rating: "3.5 (86)",
          price: "Rp 300K",
          category: "Bisnis Manajemen",
          date: "2026-11-08",
        },
        {
          id: 5,
          title: "Digital Marketing untuk Pemula",
          description: "Pelajari strategi pemasaran digital.",
          image: newsletter,
          avatar: ppicon,
          author: "John Doe",
          role: "Digital Marketer",
          rating: "4.5 (120)",
          price: "Rp 250K",
          category: "Pemasaran",
          date: "2026-11-05",
        },
        {
          id: 6,
          title: "Belajar UI UX Design",
          description: "Membuat desain aplikasi yang menarik.",
          image: hero2,
          avatar: iconpp,
          author: "Sarah Putri",
          role: "UI UX Designer",
          rating: "4.8 (95)",
          price: "Rp 200K",
          category: "Digital & Teknologi",
          date: "2026-11-01",
        },
        {
          id: 7,
          title: "Big 4 Auditor Financial Analyst",
          description: "Belajar analisis keuangan bersama instruktur profesional.",
          image: hero,
          avatar: iconpp,
          author: "Jenna Ortega",
          role: "Senior Accountant",
          rating: "3.5 (86)",
          price: "Rp 300K",
          category: "Bisnis Manajemen",
          date: "2026-11-08",
        },
        {
          id: 8,
          title: "Digital Marketing untuk Pemula",
          description: "Pelajari strategi pemasaran digital.",
          image: newsletter,
          avatar: ppicon,
          author: "John Doe",
          role: "Digital Marketer",
          rating: "4.5 (120)",
          price: "Rp 250K",
          category: "Pemasaran",
          date: "2026-11-05",
        },
        {
          id: 9,
          title: "Belajar UI UX Design",
          description: "Membuat desain aplikasi yang menarik.",
          image: hero2,
          avatar: iconpp,
          author: "Sarah Putri",
          role: "UI UX Designer",
          rating: "4.8 (95)",
          price: "Rp 200K",
          category: "Digital & Teknologi",
          date: "2026-11-01",
        },
        {
          id: 10,
          title: "Big 4 Auditor Financial Analyst",
          description: "Belajar analisis keuangan bersama instruktur profesional.",
          image: hero,
          avatar: iconpp,
          author: "Jenna Ortega",
          role: "Senior Accountant",
          rating: "3.5 (86)",
          price: "Rp 300K",
          category: "Bisnis Manajemen",
          date: "2026-11-08",
        },
        {
          id: 11,
          title: "Digital Marketing untuk Pemula",
          description: "Pelajari strategi pemasaran digital.",
          image: newsletter,
          avatar: ppicon,
          author: "John Doe",
          role: "Digital Marketer",
          rating: "4.5 (120)",
          price: "Rp 250K",
          category: "Pemasaran",
          date: "2026-11-05",
        },
        {
          id: 12,
          title: "Belajar UI UX Design",
          description: "Membuat desain aplikasi yang menarik.",
          image: hero2,
          avatar: iconpp,
          author: "Sarah Putri",
          role: "UI UX Designer",
          rating: "4.8 (95)",
          price: "Rp 200K",
          category: "Digital & Teknologi",
          date: "2026-11-01",
        },
      ];

    return (
      <>
        <Navbar />
        <main className="main">
          <div className="card-container">
            {videoData.map((course) => (
              <Card key={course.id} course={course} />
            ))}
          </div>
        </main>
      </>
    );
    
}
export default Testing;