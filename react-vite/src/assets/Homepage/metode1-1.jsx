import { useState, useEffect, useRef } from "react";
import {
  useNavigate,
  useParams,
  useLocation,
  Navigate,
} from "react-router-dom";
import "../styles/metode1-1.css";
import Navbar from "../component/navbar";
import { getCourseById } from "../utils/courseLookup";
import { getCurrentUser } from "../utils/auth";
import {
  createOrder,
  findPendingOrder,
  updateOrder,
  simulatePayment,
} from "../utils/payments";

import bni from "/src/iconpayments/bni.jpg";
import bri from "/src/iconpayments/bri.jpg";
import bca from "/src/iconpayments/bca.jpg";
import mandiri from "/src/iconpayments/mandiri.jpg";
import dana from "/src/iconpayments/dana.jpg";
import ovo from "/src/iconpayments/ovo.jpg";
import link from "/src/iconpayments/link.jpg";
import shopee from "/src/iconpayments/shopee.jpg";
import visa from "/src/iconpayments/visa.jpg";
import jcb from "/src/iconpayments/jcb.jpg";
import mcs from "/src/iconpayments/mastercard.jpg";

const ADMIN_FEE = 7000;
const VIRTUAL_ACCOUNT = "11739 081234567890";

// waktu pembayaran: 1 jam. Untuk mengetes halaman gagal, ganti jadi 10
const PAYMENT_SECONDS = 59 * 60 + 59;

const STATUS_PAGES = {
  berhasil: "/pembayaran-berhasil",
  tertunda: "/pembayaran-tertunda",
  gagal: "/pembayaran-gagal",
};

const paymentIcons = {
  "Bank BCA": bca,
  "Bank BNI": bni,
  "Bank BRI": bri,
  "Bank Mandiri": mandiri,
  Dana: dana,
  OVO: ovo,
  LinkAja: link,
  "Shopee Pay": shopee,
  Visa: visa,
  Mastercard: mcs,
  JCB: jcb,
};

// "Rp 300K" -> 300000
const parsePrice = (text) => {
  const number = parseInt(text.replace(/\D/g, ""), 10) || 0;
  return text.toUpperCase().includes("K") ? number * 1000 : number;
};

// 300000 -> "Rp 300.000"
const formatRupiah = (value) => "Rp " + value.toLocaleString("id-ID");

const pad = (n) => String(n).padStart(2, "0");

function MetodePage1() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const user = getCurrentUser();

  const course = getCourseById(id);
  const price = parsePrice(course.price);
  const total = price + ADMIN_FEE;

  // Satu transaksi = satu pesanan. Kalau sudah ada pesanan "Menunggu" untuk
  // kelas ini, dipakai lagi (metodenya diperbarui). Kalau belum, dibuat baru.
  const [order] = useState(() => {
    if (!user) return null;

    const existing = findPendingOrder(user.email, id);
    if (existing) {
      return state?.payment && state.payment !== existing.payment
        ? updateOrder(existing.id, { payment: state.payment })
        : existing;
    }

    return createOrder({
      email: user.email,
      courseId: id,
      courseTitle: course.title,
      payment: state?.payment || "Bank BCA",
      total,
      expiresInSeconds: PAYMENT_SECONDS,
    });
  });

  const payment = order?.payment || state?.payment || "Bank BCA";
  const paymentIcon = paymentIcons[payment];

  // sisa waktu dihitung dari batas waktu pesanan, jadi tetap akurat
  // walau halaman ditutup lalu dibuka lagi lewat "Lanjutkan Pembayaran"
  const getSecondsLeft = () =>
    order?.expiresAt
      ? Math.max(Math.ceil((order.expiresAt - Date.now()) / 1000), 0)
      : PAYMENT_SECONDS;

  const [copied, setCopied] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(getSecondsLeft);
  const [loading, setLoading] = useState(false);
  const finished = useRef(false); // mencegah hasil diproses dua kali

  const [openMethod, setOpenMethod] = useState({
    bank: true,
    mobile: true,
    internet: true,
  });

  // HITUNG MUNDUR: waktu habis -> pesanan jadi gagal
  useEffect(() => {
    if (!order) return;

    if (secondsLeft <= 0) {
      if (!finished.current) {
        finished.current = true;
        updateOrder(order.id, { status: "gagal" });
        navigate(STATUS_PAGES.gagal, {
          replace: true,
          state: { id, orderId: order.id },
        });
      }
      return;
    }

    const timer = setTimeout(() => setSecondsLeft(getSecondsLeft()), 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft]);

  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  const toggleMethod = (method) => {
    setOpenMethod((prev) => ({
      ...prev,
      [method]: !prev[method],
    }));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(VIRTUAL_ACCOUNT.replace(/\s/g, ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  // GANTI METODE -> kembali ke halaman pilih metode, pilihan lama ikut dibawa
  const handleChangePayment = () => {
    navigate(`/metode/${id}`, { state: { payment } });
  };

  // Simulasi pembayaran: memperbarui pesanan yang sama, lalu ke halaman status
  const finish = async (status) => {
    if (finished.current || !order) return;
    finished.current = true;
    setLoading(true);

    await simulatePayment(order.id, status);

    navigate(STATUS_PAGES[status], {
      replace: true,
      state: { id, orderId: order.id },
    });
  };

  // BAYAR SEKARANG -> berhasil (jalur normal)
  const handlePay = () => finish("berhasil");

  // belum login -> ke halaman login, lalu kembali ke sini
  if (!user) {
    return <Navigate to="/login" replace state={{ from: `/metode1/${id}` }} />;
  }

  return (
    <>
      <Navbar />
      <main className="bayar-page">
        {/* PROGRESS PEMBAYARAN */}
        <section className="payment-progress">
          <div className="progress-item active">
            <span>1</span>
            <p>Pilih Metode</p>
          </div>

          <div className="progress-line active"></div>

          <div className="progress-item active">
            <span>2</span>
            <p>Bayar</p>
          </div>

          <div className="progress-line"></div>

          <div className="progress-item">
            <span>3</span>
            <p>Selesai</p>
          </div>
        </section>

        {/* TIMER */}
        <div className="payment-timer">
          Selesaikan pemesanan dalam
          <span>{pad(hours)}</span>:<span>{pad(minutes)}</span>:
          <span>{pad(seconds)}</span>
        </div>

        {/* CONTENT */}
        <div className="bayar-container">
          {/* KOLOM KIRI */}
          <div className="bayar-left">
            {/* METODE PEMBAYARAN */}
            <section className="payment-box">
              <h3>Metode Pembayaran</h3>

              <div className="bank-card">
                <div className="bank-logo">
                  {paymentIcon && <img src={paymentIcon} alt={payment} />}
                  <strong>{payment}</strong>
                </div>

                <p>Bayar Melalui Virtual Account {payment}</p>

                <div className="virtual-number">
                  {VIRTUAL_ACCOUNT}
                  <button type="button" onClick={handleCopy}>
                    {copied ? "Tersalin" : "Salin"}
                  </button>
                </div>
              </div>

              {/* RINGKASAN PESANAN */}
              <div className="order-summary">
                <h4>Ringkasan Pesanan</h4>

                <div className="summary-row">
                  <span>Video Learning: {course.title}</span>
                  <span>{formatRupiah(price)}</span>
                </div>

                <div className="summary-row">
                  <span>Biaya Admin</span>
                  <span>{formatRupiah(ADMIN_FEE)}</span>
                </div>

                <div className="summary-row total">
                  <span>Total Pembayaran</span>
                  <span>{formatRupiah(total)}</span>
                </div>
              </div>

              {/* BUTTON */}
              <div className="payment-buttons">
                <button
                  type="button"
                  className="change-payment"
                  onClick={handleChangePayment}
                  disabled={loading}
                >
                  Ganti Metode Pembayaran
                </button>

                <button
                  type="button"
                  className="pay-now"
                  onClick={handlePay}
                  disabled={loading}
                >
                  {loading ? "Memproses..." : "Bayar Sekarang"}
                </button>
              </div>

              {/* TOMBOL SIMULASI: hanya tampil saat npm run dev */}
              {import.meta.env.DEV && (
                <div
                  style={{
                    marginTop: 16,
                    padding: 12,
                    border: "1px dashed #aaa",
                    borderRadius: 6,
                    fontSize: 13,
                  }}
                >
                  <p style={{ marginBottom: 8 }}>
                    Simulasi hasil pembayaran (mode dev)
                  </p>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => finish("berhasil")}
                    >
                      Berhasil
                    </button>
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => finish("tertunda")}
                    >
                      Tertunda
                    </button>
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => finish("gagal")}
                    >
                      Gagal
                    </button>
                  </div>
                </div>
              )}
            </section>

            {/* TATA CARA PEMBAYARAN */}
            <section className="payment-guide">
              <h3>Tata Cara Pembayaran</h3>

              {/* ATM */}
              <div className="guide-item">
                <button
                  type="button"
                  className="guide-header"
                  onClick={() => toggleMethod("bank")}
                >
                  <span>ATM BCA</span>
                  <span>{openMethod.bank ? "⌃" : "⌄"}</span>
                </button>

                {openMethod.bank && (
                  <div className="guide-content">
                    <ol>
                      <li>Masukkan kartu ATM dan PIN BCA Anda.</li>
                      <li>
                        Di menu utama, pilih "Transaksi Lainnya". Pilih
                        "Transfer", lalu pilih "Ke Virtual Account".
                      </li>
                      <li>Masukkan nomor Virtual Account.</li>
                      <li>
                        Pastikan data Virtual Account benar, kemudian masukkan
                        angka yang perlu dibayarkan.
                      </li>
                      <li>
                        Cek dan perhatikan konfirmasi pembayaran dari ATM,
                        jumlah benar pilih "Ya", atau pilih "Tidak" jika data di
                        layar salah.
                      </li>
                      <li>Transaksi Anda sudah selesai.</li>
                    </ol>
                  </div>
                )}
              </div>

              {/* MOBILE BANKING */}
              <div className="guide-item">
                <button
                  type="button"
                  className="guide-header"
                  onClick={() => toggleMethod("mobile")}
                >
                  <span>Mobile Banking BCA</span>
                  <span>{openMethod.mobile ? "⌃" : "⌄"}</span>
                </button>

                {openMethod.mobile && (
                  <div className="guide-content">
                    <ol>
                      <li>Buka aplikasi BCA Mobile.</li>
                      <li>Pilih m-BCA kemudian pilih m-Transfer.</li>
                      <li>Pilih "BCA Virtual Account".</li>
                      <li>Masukkan nomor Virtual Account, lalu pilih "OK".</li>
                      <li>
                        Cek nominal yang harus dibayar dan masukkan PIN m-BCA.
                      </li>
                      <li>Klik "OK" untuk melanjutkan pembayaran.</li>
                      <li>Transaksi Anda telah selesai.</li>
                    </ol>
                  </div>
                )}
              </div>

              {/* INTERNET BANKING */}
              <div className="guide-item">
                <button
                  type="button"
                  className="guide-header"
                  onClick={() => toggleMethod("internet")}
                >
                  <span>Internet Banking BCA</span>
                  <span>{openMethod.internet ? "⌃" : "⌄"}</span>
                </button>

                {openMethod.internet && (
                  <div className="guide-content">
                    <ol>
                      <li>Login ke KlikBCA Individual.</li>
                      <li>
                        Pilih "Transfer", kemudian pilih "Transfer ke BCA
                        Virtual Account".
                      </li>
                      <li>Masukkan nomor Virtual Account.</li>
                      <li>Pilih "Lanjutkan" untuk melakukan pembayaran.</li>
                      <li>
                        Masukkan RESPON KEYBCA APPLI 1 yang muncul dari token
                        BCA Anda, lalu klik tombol "Kirim".
                      </li>
                      <li>Pembayaran telah selesai.</li>
                    </ol>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* KOLOM KANAN */}
          <aside className="bayar-right">
            <div className="product-payment-card">
              <img src={course.image} alt={course.title} />

              <h4>{course.title}</h4>

              <div className="bayar-price">
                <span>{course.price}</span>
                <del>{course.oldPrice}</del>
                <span className="bayar-discount">Diskon 50%</span>
              </div>

              <h5>Kelas Ini Sudah Termasuk</h5>

              <div className="course-features">
                <span>♧ Ujian Akhir</span>
                <span>▣ 49 Video</span>
                <span>▤ 7 Dokumen</span>
                <span>▧ Sertifikat</span>
                <span>♧ Pretest</span>
              </div>

              <h5>Bahasa Pengantar</h5>
              <p>🌐 Bahasa Indonesia</p>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}

export default MetodePage1;
