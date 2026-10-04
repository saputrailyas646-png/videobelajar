import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";

import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

import { app, db } from "./firebase.js";

const auth = getAuth(app);

let currentUser = null;

const userName = document.getElementById("userName");

const userPhoto = document.getElementById("userPhoto");

const profileName = document.getElementById("profileName");

const profileEmail = document.getElementById("profileEmail");

const profilePhoto = document.getElementById("profilePhoto");

const subjectList = document.getElementById("subjectList");

const subjectCount = document.getElementById("subjectCount");

/* =========================
   AUTH
========================= */

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";

    return;
  }

  currentUser = user;

  userName.textContent = user.displayName || "User";

  profileName.textContent = user.displayName || "User";

  profileEmail.textContent = user.email || "";

  if (user.photoURL) {
    userPhoto.src = user.photoURL;

    profilePhoto.src = user.photoURL;
  }

  await loadSubjects();
});

/* =========================
   LOAD SUBJECTS
========================= */

async function loadSubjects() {
  subjectList.innerHTML = "Loading...";

  const q = query(
    collection(db, "subjects"),
    where("teacherId", "==", currentUser.uid),
  );

  const snapshot = await getDocs(q);

  subjectList.innerHTML = "";

  subjectCount.textContent = snapshot.size;

  if (snapshot.empty) {
    subjectList.innerHTML = `
            <div class="empty">
                Belum ada mata pelajaran.
            </div>
        `;

    return;
  }

  snapshot.forEach((doc) => {
    const data = doc.data();

    const item = document.createElement("div");

    item.className = "subject-item";

    item.innerHTML = `

            <div>

                <strong>
                    ${escapeHtml(data.name)}
                </strong>

                <p class="muted">
                    ${data.duration} menit
                    · Rp ${formatPrice(data.price)}
                </p>

            </div>

            <span class="subject-status">
                Aktif
            </span>

        `;

    subjectList.appendChild(item);
  });
}

/* =========================
   ADD SUBJECT
========================= */

const modal = document.getElementById("modal");

document.getElementById("addSubject").addEventListener("click", () => {
  modal.classList.remove("hidden");
});

document.getElementById("cancelModal").addEventListener("click", () => {
  modal.classList.add("hidden");
});

document.getElementById("saveSubject").addEventListener("click", async () => {
  const name = document.getElementById("subjectName").value.trim();

  const price = Number(document.getElementById("subjectPrice").value);

  const duration = Number(document.getElementById("subjectDuration").value);

  if (!name) {
    alert("Nama pelajaran wajib diisi.");

    return;
  }

  if (!price || price < 0) {
    alert("Harga tidak valid.");

    return;
  }

  try {
    await addDoc(collection(db, "subjects"), {
      teacherId: currentUser.uid,

      teacherName: currentUser.displayName,

      name,

      price,

      duration,

      createdAt: serverTimestamp(),
    });

    document.getElementById("subjectName").value = "";

    document.getElementById("subjectPrice").value = "";

    modal.classList.add("hidden");

    await loadSubjects();
  } catch (error) {
    console.error(error);

    alert("Gagal menyimpan: " + error.message);
  }
});

/* =========================
   LOGOUT
========================= */

document.getElementById("logout").addEventListener("click", async () => {
  await signOut(auth);

  window.location.href = "index.html";
});

/* =========================
   SHARE
========================= */

document.getElementById("shareButton").addEventListener("click", async () => {
  const url =
    window.location.origin +
    window.location.pathname.replace("dashboard.html", "booking.html") +
    "?teacher=" +
    currentUser.uid;

  try {
    await navigator.clipboard.writeText(url);

    alert("Link booking berhasil disalin!");
  } catch {
    prompt("Salin link berikut:", url);
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
