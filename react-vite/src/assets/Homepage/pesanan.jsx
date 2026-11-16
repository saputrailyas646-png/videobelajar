import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "../styles/pesanan.css";
import Navbar from "../component/navbar";
import Footer from "../component/footer";
import { getCurrentUser } from "../utils/auth";
import { getOrders } from "../utils/payments";
import { getCourseById } from "../utils/courseStore";
import hero from "../hero.jpg";

const ADMIN_FEE = 7000; // sama dengan di metode1-1.jsx

const MONTHS = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];
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

// status di penyimpanan -> label di kartu (sesuai desain)
const STATUS_LABEL = {
  berhasil: "Berhasil",
  tertunda: "Belum Bayar",
  gagal: "Gagal",
};

const pad = (n) => String(n).padStart(2, "0");

// "2026-11-15T04:17:00Z" -> "15 November 2026, 11.17"
const formatDate = (iso) => {
  const d = new Date(iso);
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}, ${pad(
    d.getHours(),
  )}.${pad(d.getMinutes())}`;
};

// nomor invoice dari tanggal pesanan, mis. HEL/XI/15112026/4821
const makeInvoice = (order) => {
  const d = new Date(order.createdAt);
  return `HEL/${ROMAN[d.getMonth()]}/${pad(d.getDate())}${pad(
    d.getMonth() + 1,
  )}${d.getFullYear()}/${order.id.slice(-4)}`;
};

const formatPrice = (price) => "Rp " + price.toLocaleString("id-ID");

const getStatusClass = (status) => {
  if (status === "Berhasil") return "success";
  if (status === "Gagal") return "failed";
  return "pending";
};

function PesananPage() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const [activeTab, setActiveTab] = useState("Semua Pesanan");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Urutkan");
  const [currentPage, setCurrentPage] = useState(1);

  // pesanan milik user yang sedang login, diubah ke bentuk yang siap tampil
  const [orders] = useState(() =>
    user
      ? getOrders(user.email).map((o) => {
          const course = getCourseById(o.courseId);
          return {
            id: o.id,
            courseId: o.courseId, // untuk lanjut bayar
            payment: o.payment, // untuk lanjut bayar
            invoice: makeInvoice(o),
            createdAt: o.createdAt,
            date: formatDate(o.paidAt || o.createdAt),
            title: o.courseTitle,
            image: course?.image || hero,
            price: Math.max(o.total - ADMIN_FEE, 0), // harga kelas
            total: o.total, // harga kelas + biaya admin
            status: STATUS_LABEL[o.status] || "Belum Bayar",
          };
        })
      : [],
  );

  // belum login -> ke halaman login, lalu kembali ke sini
  if (!user) {
    return <Navigate to="/login" replace state={{ from: "/pesanan" }} />;
  }

  const tabs = ["Semua Pesanan", "Menunggu", "Berhasil", "Gagal"];

  const filteredOrders = orders
    .filter((order) => {
      if (activeTab === "Menunggu") return order.status === "Belum Bayar";
      if (activeTab === "Berhasil") return order.status === "Berhasil";
      if (activeTab === "Gagal") return order.status === "Gagal";
      return true;
    })
    .filter(
      (order) =>
        order.title.toLowerCase().includes(search.toLowerCase()) ||
        order.invoice.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => {
      if (sort === "Harga Tertinggi") return b.total - a.total;
      if (sort === "Harga Terendah") return a.total - b.total;
      if (sort === "Terlama")
        return new Date(a.createdAt) - new Date(b.createdAt);
      return new Date(b.createdAt) - new Date(a.createdAt); // Urutkan / Terbaru
    });

  const ordersPerPage = 5;
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const displayedOrders = filteredOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage,
  );

  return (
    <>
      <Navbar />
      <main className="pesanan-page">
        <div className="pesanan-container">
          {/* SIDEBAR */}
          <aside className="pesanan-sidebar">
            <div className="sidebar-heading">
              <h2>Daftar Pesanan</h2>
              <p>Informasi terperinci mengenai pembelian</p>
            </div>

            <div className="sidebar-menu">
              <button
                className="sidebar-link"
                onClick={() => navigate("/profil")}
              >
                <span>♙</span>
                Profil Saya
              </button>

              <button
                className="sidebar-link"
                onClick={() => navigate("/kelas")}
              >
                <span>▣</span>
                Kelas Saya
              </button>

              <button className="sidebar-link active">
                <span>♧</span>
                Pesanan Saya
              </button>
            </div>
          </aside>

          {/* CONTENT */}
          <section className="pesanan-content">
            {/* TABS */}
            <div className="pesanan-tabs">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`pesanan-tab ${activeTab === tab ? "active" : ""}`}
                  onClick={() => {
                    setActiveTab(tab);
                    setCurrentPage(1);
                  }}
                >
                  {tab}
                </button>
              ))}

              <div className="pesanan-search">
                <input
                  type="text"
                  placeholder="Cari Kelas"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                />
                <span>⌕</span>
              </div>

              <select
                className="pesanan-sort"
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option>Urutkan</option>
                <option>Terbaru</option>
                <option>Terlama</option>
                <option>Harga Tertinggi</option>
                <option>Harga Terendah</option>
              </select>
            </div>

            {/* ORDER LIST */}
            <div className="pesanan-list">
              {displayedOrders.length > 0 ? (
                displayedOrders.map((order) => (
                  <article className="pesanan-card" key={order.id}>
                    {/* INVOICE */}
                    <div className="pesanan-card-header">
                      <div className="invoice-info">
                        <span>No. Invoice:</span>
                        <a href="#invoice" onClick={(e) => e.preventDefault()}>
                          {order.invoice}
                        </a>
                      </div>

                      <div className="payment-date">
                        <span>Waktu Pembayaran:</span>
                        <span>{order.date}</span>
                      </div>

                      <span
                        className={`pesanan-status ${getStatusClass(
                          order.status,
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>

                    {/* PRODUCT */}
                    <div className="pesanan-product">
                      <div className="product-info">
                        <img src={order.image} alt={order.title} />
                        <p>{order.title}</p>
                      </div>

                      <div className="product-price">
                        <span>Harga</span>
                        <strong>{formatPrice(order.price)}</strong>
                      </div>
                    </div>

                    {/* TOTAL */}
                    <div className="pesanan-total">
                      <span>Total Pembayaran</span>
                      <strong>{formatPrice(order.total)}</strong>
                    </div>

                    {/* LANJUTKAN PEMBAYARAN: hanya untuk Belum Bayar */}
                    {order.status === "Belum Bayar" && (
                      <div className="pesanan-actions">
                        <button
                          type="button"
                          className="pesanan-action-btn"
                          onClick={() =>
                            navigate(`/metode1/${order.courseId}`, {
                              state: { payment: order.payment },
                            })
                          }
                        >
                          Lanjutkan Pembayaran
                        </button>
                      </div>
                    )}
                  </article>
                ))
              ) : (
                <div className="pesanan-empty">
                  {orders.length === 0 ? (
                    <>
                      Kamu belum punya pesanan.{" "}
                      <button
                        type="button"
                        className="pesanan-action-btn"
                        onClick={() => navigate("/category")}
                      >
                        Cari Kelas
                      </button>
                    </>
                  ) : (
                    "Pesanan tidak ditemukan."
                  )}
                </div>
              )}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="pesanan-pagination">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  ‹
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1,
                ).map((page) => (
                  <button
                    key={page}
                    className={currentPage === page ? "active" : ""}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  ›
                </button>
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default PesananPage;
