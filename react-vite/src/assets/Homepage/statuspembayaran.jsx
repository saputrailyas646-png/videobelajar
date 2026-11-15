import { useNavigate, useLocation } from "react-router-dom";
import "../styles/statuspmbayaran.css";
import Navbar from "../component/navbar";

// ISI TIAP STATUS
const STATUS_CONTENT = {
  berhasil: {
    title: "Pembayaran Berhasil!",
    description:
      "Silakan cek email kamu untuk informasi lebih lanjut. Hubungi kami jika ada kendala.",
    button: "Lihat Detail Pesanan",
    target: () => "/pesanan",
  },
  tertunda: {
    title: "Pembayaran Tertunda!",
    description:
      "Pembayaranmu sedang diproses. Silakan cek email kamu untuk informasi lebih lanjut.",
    button: "Lihat Detail Pesanan",
    target: () => "/pesanan",
  },
  gagal: {
    title: "Pembayaran Gagal!",
    description:
      "Waktu pembayaran habis atau transaksi tidak dapat diproses. Silakan coba lagi dengan metode pembayaran lain.",
    button: "Coba Lagi",
    target: (id) => (id ? `/metode/${id}` : "/"),
  },
};

function PaymentIllustration({ status = "berhasil" }) {
  return (
    <svg
      className="payment-illustration"
      viewBox="0 0 240 220"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* BACKGROUND */}
      <path d="M55 25 L180 40 L205 160 L40 185 L15 95 Z" fill="#F5F5F5" />

      {/* PHONE */}
      <rect x="75" y="48" width="82" height="145" rx="8" fill="#303030" />

      <rect x="81" y="55" width="70" height="132" rx="4" fill="#FFFFFF" />

      {/* SHOP HEADER */}
      <rect x="81" y="55" width="70" height="28" fill="#FFB629" />

      <rect x="86" y="55" width="10" height="28" fill="#FFFFFF" />
      <rect x="106" y="55" width="10" height="28" fill="#FFFFFF" />
      <rect x="126" y="55" width="10" height="28" fill="#FFFFFF" />

      {/* PAYMENT ICON */}
      <circle
        cx="116"
        cy="110"
        r="22"
        fill={status === "gagal" ? "#FDE8E8" : "#E5F8E9"}
      />

      {status === "tertunda" && (
        <>
          <circle
            cx="116"
            cy="110"
            r="14"
            fill="none"
            stroke="#FFB629"
            strokeWidth="4"
          />
          <path
            d="M116 101 V110 L123 115"
            fill="none"
            stroke="#FFB629"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </>
      )}

      {status === "berhasil" && (
        <path
          d="M106 110 L113 117 L127 103"
          fill="none"
          stroke="#35CC4B"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}

      {status === "gagal" && (
        <path
          d="M108 102 L124 118 M124 102 L108 118"
          fill="none"
          stroke="#E5484D"
          strokeWidth="5"
          strokeLinecap="round"
        />
      )}

      {/* DOCUMENT */}
      <rect x="92" y="140" width="48" height="4" rx="2" fill="#E5E5E5" />
      <rect x="92" y="150" width="42" height="4" rx="2" fill="#E5E5E5" />
      <rect x="92" y="160" width="30" height="4" rx="2" fill="#E5E5E5" />

      {/* PERSON */}
      <circle cx="184" cy="72" r="13" fill="#F4B183" />

      <path
        d="M171 68 Q173 52 188 57 L196 70 L190 73 L184 63 L177 72 Z"
        fill="#333333"
      />

      <path d="M174 87 L195 87 L204 128 L168 128 Z" fill="#FFB629" />

      <path d="M174 92 L160 110 L165 115 L180 101" fill="#F4B183" />

      <path d="M194 94 L207 109 L202 114 L188 102" fill="#F4B183" />

      <path d="M174 128 L174 168 L182 168 L188 133" fill="#555555" />

      <path d="M190 128 L196 168 L204 168 L200 128" fill="#555555" />

      <path d="M170 168 H184 V174 H168 Z" fill="#303030" />
      <path d="M194 168 H208 V174 H194 Z" fill="#303030" />

      {/* DECORATIONS */}
      <circle cx="48" cy="75" r="10" fill="#FFE6B3" />
      <path
        d="M44 75 L47 78 L52 72"
        fill="none"
        stroke="#FFB629"
        strokeWidth="2"
      />

      <circle cx="55" cy="130" r="8" fill="#FFE6B3" />
      <path
        d="M51 130 L54 133 L59 127"
        fill="none"
        stroke="#FFB629"
        strokeWidth="2"
      />

      <path d="M30 155 L48 137 L62 151 L44 169 Z" fill="#303030" />
    </svg>
  );
}

function PaymentStatus({ status = "berhasil" }) {
  const navigate = useNavigate();
  const { state } = useLocation();

  const content = STATUS_CONTENT[status];
  const id = state?.id;

  return (
    <>
      <Navbar />
      <main className="status-payment-page">
        {/* PROGRESS */}
        <section className="status-progress">
          <div className="status-step completed">
            <span>✓</span>
            <p>Pilih Metode</p>
          </div>

          <div className="status-line completed"></div>

          <div className="status-step completed">
            <span>✓</span>
            <p>Bayar</p>
          </div>

          <div className="status-line completed"></div>

          <div className="status-step active">
            <span>3</span>
            <p>Selesai</p>
          </div>
        </section>

        {/* STATUS CARD */}
        <section className="status-card">
          <PaymentIllustration status={status} />

          <h2>{content.title}</h2>

          <p className="status-description">{content.description}</p>

          <button
            type="button"
            className="status-detail-button"
            onClick={() => navigate(content.target(id))}
          >
            {content.button}
          </button>
        </section>
      </main>
    </>
  );
}

export function PembayaranBerhasil() {
  return <PaymentStatus status="berhasil" />;
}

export function PembayaranTertunda() {
  return <PaymentStatus status="tertunda" />;
}

export function PembayaranGagal() {
  return <PaymentStatus status="gagal" />;
}

export default PembayaranBerhasil;
