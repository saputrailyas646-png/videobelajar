const ORDERS_KEY = "videobelajar_orders";

const ROMAN = [
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
  "X",
  "XI",
  "XII",
];
const pad = (n, len = 2) => String(n).padStart(len, "0");

function readOrders() {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
  } catch {
    return [];
  }
}

function writeOrders(orders) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

// Nomor invoice unik: HEL/<bulan romawi>/<ddmmyyyy>/<urutan 4 digit per hari>
function makeInvoiceNumber(orders, date = new Date()) {
  const prefix = `HEL/${ROMAN[date.getMonth()]}/${pad(date.getDate())}${pad(
    date.getMonth() + 1,
  )}${date.getFullYear()}`;

  const used = new Set(orders.map((o) => o.invoice).filter(Boolean));

  let seq =
    orders.filter((o) => o.invoice && o.invoice.startsWith(prefix + "/"))
      .length + 1;
  let invoice = `${prefix}/${pad(seq, 4)}`;

  while (used.has(invoice)) {
    seq += 1;
    invoice = `${prefix}/${pad(seq, 4)}`;
  }
  return invoice;
}

// Pesanan lama yang belum punya invoice diberi nomor (sekali saja)
function ensureInvoices(orders) {
  let changed = false;
  const result = orders.map((o) => ({ ...o }));
  result.forEach((o) => {
    if (!o.invoice) {
      o.invoice = makeInvoiceNumber(result, new Date(o.createdAt));
      changed = true;
    }
  });
  return { orders: result, changed };
}

// Ambil pesanan. Pesanan "tertunda" yang sudah lewat batas waktu
// otomatis berubah jadi "gagal". Isi email untuk memfilter per user.
export function getOrders(email) {
  const now = Date.now();

  const fixed = ensureInvoices(readOrders());
  let changed = fixed.changed;

  const all = fixed.orders.map((o) => {
    if (o.status === "tertunda" && o.expiresAt && now > o.expiresAt) {
      changed = true;
      return { ...o, status: "gagal" };
    }
    return o;
  });

  if (changed) writeOrders(all);
  return email ? all.filter((o) => o.email === email) : all;
}

// Kelas Saya = pesanan yang berhasil
export function getMyCourses(email) {
  return getOrders(email).filter((o) => o.status === "berhasil");
}

// Pesanan yang masih menunggu untuk kelas tertentu (kalau ada)
export function findPendingOrder(email, courseId) {
  return (
    getOrders(email).find(
      (o) => String(o.courseId) === String(courseId) && o.status === "tertunda",
    ) || null
  );
}

export function createOrder({
  email,
  courseId,
  courseTitle,
  payment,
  total,
  status = "tertunda",
  expiresInSeconds,
}) {
  const now = Date.now();
  const existing = getOrders(); // semua pesanan, semua user

  const order = {
    id: "ORD-" + now + "-" + Math.random().toString(36).slice(2, 6),
    invoice: makeInvoiceNumber(existing, new Date(now)),
    email,
    courseId,
    courseTitle,
    payment,
    total,
    status, // "tertunda" | "berhasil" | "gagal"
    createdAt: new Date(now).toISOString(),
    expiresAt: expiresInSeconds ? now + expiresInSeconds * 1000 : null,
    paidAt: null,
  };
  writeOrders([...existing, order]);
  return order;
}

// Ubah sebagian isi pesanan, mengembalikan pesanan yang sudah diperbarui
export function updateOrder(id, changes) {
  let updated = null;
  const all = readOrders().map((o) => {
    if (o.id === id) {
      updated = { ...o, ...changes };
      return updated;
    }
    return o;
  });
  writeOrders(all);
  return updated;
}

// Simulasi pembayaran: pura-pura menghubungi bank 1,5 detik.
// Nanti kalau pakai Midtrans, cukup ganti isi fungsi ini.
export function simulatePayment(orderId, status) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const changes = { status };
      if (status === "berhasil") changes.paidAt = new Date().toISOString();
      resolve(updateOrder(orderId, changes));
    }, 1500);
  });
}
