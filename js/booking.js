import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

import { db } from "./firebase.js";

const params = new URLSearchParams(window.location.search);

const teacherId = params.get("teacher");

const subjects = document.getElementById("subjects");

const modal = document.getElementById("bookingModal");

let selectedSubject = null;

/* =========================
   CHECK TEACHER
========================= */

if (!teacherId) {
  subjects.innerHTML = `
        <div class="empty">
            Link tutor tidak valid.
        </div>
    `;
} else {
  loadTeacher();
}

/* =========================
   LOAD TEACHER
========================= */

async function loadTeacher() {
  const q = query(
    collection(db, "subjects"),
    where("teacherId", "==", teacherId),
  );

  const snapshot = await getDocs(q);

  subjects.innerHTML = "";

  if (snapshot.empty) {
    subjects.innerHTML = `
            <div class="empty">
                Tutor belum memiliki
                mata pelajaran.
            </div>
        `;

    return;
  }

  let first = true;

  snapshot.forEach((doc) => {
    const data = doc.data();

    if (first) {
      document.getElementById("teacherName").textContent =
        data.teacherName || "Tutor";

      first = false;
    }

    const card = document.createElement("div");

    card.className = "booking-card";

    card.innerHTML = `

            <div class="feature-icon">
                📚
            </div>

            <h2>
                ${escapeHtml(data.name)}
            </h2>

            <p>
                Durasi:
                ${data.duration} menit
            </p>

            <strong>
                Rp ${formatPrice(data.price)}
            </strong>

            <button
                class="btn-primary"
            >
                Pilih jadwal
            </button>

        `;

    card.querySelector("button").addEventListener("click", () => {
      selectedSubject = {
        id: doc.id,
        ...data,
      };

      document.getElementById("selectedSubject").textContent =
        data.name + " · " + data.duration + " menit";

      modal.classList.remove("hidden");
    });

    subjects.appendChild(card);
  });
}

/* =========================
   BOOKING
========================= */

document.getElementById("cancelBooking").addEventListener("click", () => {
  modal.classList.add("hidden");
});

document
  .getElementById("confirmBooking")
  .addEventListener("click", async () => {
    const studentName = document.getElementById("studentName").value.trim();

    const studentEmail = document.getElementById("studentEmail").value.trim();

    const date = document.getElementById("bookingDate").value;

    const time = document.getElementById("bookingTime").value;

    if (!studentName || !studentEmail || !date || !time) {
      alert("Semua data harus diisi.");

      return;
    }

    try {
      /*
       * CEK APAKAH SLOT SUDAH DIPESAN
       */

      const bookingQuery = query(
        collection(db, "bookings"),

        where("teacherId", "==", teacherId),

        where("date", "==", date),

        where("time", "==", time),
      );

      const existing = await getDocs(bookingQuery);

      if (!existing.empty) {
        alert("Maaf, slot tersebut sudah dipesan.");

        return;
      }

      /*
       * SIMPAN BOOKING
       */

      await addDoc(collection(db, "bookings"), {
        teacherId,

        teacherName: selectedSubject.teacherName,

        subjectId: selectedSubject.id,

        subjectName: selectedSubject.name,

        duration: selectedSubject.duration,

        price: selectedSubject.price,

        studentName,

        studentEmail,

        date,

        time,

        status: "confirmed",

        createdAt: serverTimestamp(),
      });

      alert("Booking berhasil!");

      modal.classList.add("hidden");
    } catch (error) {
      console.error(error);

      alert("Booking gagal: " + error.message);
    }
  });

/* =========================
   HELPERS
========================= */

function formatPrice(price) {
  return new Intl.NumberFormat("id-ID").format(price);
}

function escapeHtml(text) {
  const div = document.createElement("div");

  div.textContent = text;

  return div.innerHTML;
}
