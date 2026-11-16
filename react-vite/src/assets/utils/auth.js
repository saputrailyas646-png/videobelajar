const USERS_KEY = "videobelajar_users";
const SESSION_KEY = "videobelajar_session";
const SESSION_DURATION = 60 * 60 * 1000; // 2 menit (untuk tes)

async function hashPassword(password) {
  const data = new TextEncoder().encode(password);
  const buffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}

export async function registerUser({ name, email, phone, password }) {
  const users = getUsers();
  const emailLower = email.trim().toLowerCase();

  if (users.some((u) => u.email === emailLower)) {
    return { ok: false, error: "Email sudah terdaftar." };
  }

  users.push({
    name: name.trim(),
    email: emailLower,
    phone,
    passwordHash: await hashPassword(password),
  });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  return { ok: true };
}

export async function loginUser(email, password) {
  const emailLower = email.trim().toLowerCase();
  const user = getUsers().find((u) => u.email === emailLower);
  const hash = await hashPassword(password);

  if (!user || user.passwordHash !== hash) {
    return { ok: false, error: "Email atau kata sandi salah." };
  }

  const session = {
    name: user.name,
    email: user.email,
    expiresAt: Date.now() + SESSION_DURATION,
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));

  return { ok: true, user: session };
}

export function getCurrentUser() {
  try {
    const session = JSON.parse(localStorage.getItem(SESSION_KEY));
    if (!session) return null;

    if (!session.expiresAt || Date.now() > session.expiresAt) {
      localStorage.removeItem(SESSION_KEY); // hanya session, akun tetap aman
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export function getSessionRemainingMs() {
  const session = getCurrentUser();
  return session ? session.expiresAt - Date.now() : 0;
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}


// Data profil lengkap user yang sedang login (gabungan session + data register)
export function getProfile() {
  const session = getCurrentUser();
  if (!session) return null;

  const record = getUsers().find((u) => u.email === session.email);

  return {
    name: record?.name || session.name,
    email: session.email,
    phone: record?.phone || "",
    countryCode: record?.countryCode || "+62",
    photo: record?.photo || "",
  };
}

// Simpan perubahan profil. Email tidak bisa diubah (pesanan dan progres
// belajar terhubung ke email).
export function updateProfile({ name, phone, countryCode, photo }) {
  const session = getCurrentUser();
  if (!session) {
    return { ok: false, error: "Sesi berakhir, silakan login lagi." };
  }

  const cleanName = (name || "").trim();
  if (!cleanName) {
    return { ok: false, error: "Nama lengkap wajib diisi." };
  }

  const users = getUsers();
  const index = users.findIndex((u) => u.email === session.email);
  if (index === -1) {
    return { ok: false, error: "Akun tidak ditemukan." };
  }

  users[index] = {
    ...users[index],
    name: cleanName,
    phone: phone ?? users[index].phone,
    countryCode: countryCode || "+62",
    photo: photo ?? users[index].photo ?? "",
  };

  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    return { ok: false, error: "Penyimpanan penuh, coba foto yang lebih kecil." };
  }

  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ ...session, name: cleanName }),
  );

  // beri tahu Navbar supaya foto dan nama langsung ikut berubah
  window.dispatchEvent(new Event("videobelajar-profile-updated"));

  return { ok: true };
}

// Akun admin tetap untuk latihan (tanpa backend)
export const ADMIN_EMAIL = "admin@videobelajar.com";
const ADMIN_PASSWORD = "admin123";

// Buat akun admin otomatis kalau belum ada
export async function seedAdmin() {
  const users = getUsers();
  if (users.some((u) => u.email === ADMIN_EMAIL)) return;

  users.push({
    name: "Admin",
    email: ADMIN_EMAIL,
    phone: "",
    passwordHash: await hashPassword(ADMIN_PASSWORD),
  });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function isAdmin() {
  const user = getCurrentUser();
  return !!user && user.email === ADMIN_EMAIL;
}