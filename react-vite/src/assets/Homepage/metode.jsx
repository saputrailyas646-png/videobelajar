import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "../styles/metode.css";

import Navbar from "../component/navbar";
import { getCourseById } from "./courseData";

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

// "Rp 300K" -> 300000
const parsePrice = (text) => {
  const number = parseInt(text.replace(/\D/g, ""), 10) || 0;
  return text.toUpperCase().includes("K") ? number * 1000 : number;
};

// 300000 -> "Rp 300.000"
const formatRupiah = (value) => "Rp " + value.toLocaleString("id-ID");

function MetodePage() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const course = getCourseById(id);

  const price = parsePrice(course.price);
  const total = price + ADMIN_FEE;

  // kalau kembali dari halaman Bayar, pilihan sebelumnya ikut terpilih
  const [selectedPayment, setSelectedPayment] = useState(
    state?.payment || "Bank BCA",
  );

  const [openMethod, setOpenMethod] = useState({
    bank: true,
    ewallet: true,
    card: true,
  });

  const toggleMethod = (method) => {
    setOpenMethod((prev) => ({
      ...prev,
      [method]: !prev[method],
    }));
  };

  const paymentMethods = {
    bank: [
      { name: "Bank BCA", icon: bca },
      { name: "Bank BNI", icon: bni },
      { name: "Bank BRI", icon: bri },
      { name: "Bank Mandiri", icon: mandiri },
    ],

    ewallet: [
      { name: "Dana", icon: dana },
      { name: "OVO", icon: ovo },
      { name: "LinkAja", icon: link },
      { name: "Shopee Pay", icon: shopee },
    ],

    card: [
      { name: "Visa", icon: visa },
      { name: "Mastercard", icon: mcs },
      { name: "JCB", icon: jcb },
    ],
  };

  const renderPaymentList = (methods) =>
    methods.map((payment) => (
      <button
        type="button"
        key={payment.name}
        className={`payment-option ${
          selectedPayment === payment.name ? "active" : ""
        }`}
        onClick={() => setSelectedPayment(payment.name)}
      >
        <span className="payment-icon">
          <img src={payment.icon} alt={payment.name} />
        </span>

        <span className="payment-name">{payment.name}</span>

        {selectedPayment === payment.name && (
          <span className="payment-check">✓</span>
        )}
      </button>
    ));

  // TOMBOL BELI SEKARANG -> halaman bayar (2.2), bawa id & metode yang dipilih
  const handleBuy = () => {
    navigate(`/metode1/${id}`, {
      state: { payment: selectedPayment },
    });
  };

  return (
    <>
      <Navbar />
      <main className="metode-page">
        <div className="metode-container">
          {/* CARD PRODUK */}
          <section className="product-card">
            <img
              src={course.image}
              alt={course.title}
              className="product-image"
            />

            <h3>{course.title}</h3>

            <div className="product-price">
              <span>{course.price}</span>
              <del>{course.oldPrice}</del>
              <span className="discount">Diskon 50%</span>
            </div>

            <h4>Kelas Ini Sudah Termasuk</h4>

            <div className="product-features">
              <span>♧ Ujian Akhir</span>
              <span>▣ 49 Video</span>
              <span>▤ 7 Dokumen</span>
              <span>▧ Sertifikat</span>
              <span>♧ Pretest</span>
            </div>

            <h4>Bahasa Pengantar</h4>
            <span className="language">🌐 Bahasa Indonesia</span>
          </section>

          {/* METODE PEMBAYARAN */}
          <section className="payment-card">
            <h2>Metode Pembayaran</h2>

            {/* TRANSFER BANK */}
            <div className="payment-group">
              <button
                type="button"
                className="payment-heading"
                onClick={() => toggleMethod("bank")}
              >
                Transfer Bank
                <span>{openMethod.bank ? "⌄" : "›"}</span>
              </button>

              {openMethod.bank && renderPaymentList(paymentMethods.bank)}
            </div>

            {/* E-WALLET */}
            <div className="payment-group">
              <button
                type="button"
                className="payment-heading"
                onClick={() => toggleMethod("ewallet")}
              >
                E-Wallet
                <span>{openMethod.ewallet ? "⌄" : "›"}</span>
              </button>

              {openMethod.ewallet && renderPaymentList(paymentMethods.ewallet)}
            </div>

            {/* KARTU KREDIT / DEBIT: satu baris logo, seperti di Figma */}
            <div className="payment-group">
              <button
                type="button"
                className="payment-heading"
                onClick={() => toggleMethod("card")}
              >
                Kartu Kredit/Debit
                <span>{openMethod.card ? "⌄" : "›"}</span>
              </button>

              {openMethod.card && (
                <div className="payment-option card-logos">
                  {paymentMethods.card.map((payment) => (
                    <img
                      key={payment.name}
                      src={payment.icon}
                      alt={payment.name}
                      className={
                        selectedPayment === payment.name ? "logo-active" : ""
                      }
                      onClick={() => setSelectedPayment(payment.name)}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* RINGKASAN PESANAN */}
          <section className="summary-card">
            <h2>Ringkasan Pesanan</h2>

            <div className="summary-item">
              <p>Video Learning: {course.title}</p>
              <span>{formatRupiah(price)}</span>
            </div>

            <div className="summary-item">
              <p>Biaya Admin</p>
              <span>{formatRupiah(ADMIN_FEE)}</span>
            </div>

            <div className="summary-total">
              <strong>Total Pembayaran</strong>
              <strong>{formatRupiah(total)}</strong>
            </div>

            <button type="button" className="buy-button" onClick={handleBuy}>
              Beli Sekarang
            </button>
          </section>
        </div>
      </main>
    </>
  );
}

export default MetodePage;
