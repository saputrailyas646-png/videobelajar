import { useState } from "react";
import "../assets/styles/register.css";
import Logo from "../assets/logo.png";
import logoGoogle from "../assets/logos_google-icon.png";
import ConfirmModal from "../assets/component/ConfirmModal";
import { registerUser } from "../assets/utils/auth";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const errorStyle = {
  display: "block",
  marginTop: "4px",
  fontSize: "12px",
  color: "#e53935",
};

function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    countryCode: "+62",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validateField = (name, value, values = form) => {
    switch (name) {
      case "username":
        return value.trim() ? "" : "Nama lengkap wajib diisi.";
      case "email":
        if (!value.trim()) return "Email wajib diisi.";
        if (!emailRegex.test(value)) return "Format email tidak valid.";
        return "";
      case "phone":
        if (!value.trim()) return "No. handphone wajib diisi.";
        if (!/^\d{9,13}$/.test(value)) return "Masukkan 9-13 digit angka.";
        return "";
      case "password":
        if (!value) return "Kata sandi wajib diisi.";
        if (value.length < 8) return "Kata sandi minimal 8 karakter.";
        return "";
      case "confirmPassword":
        if (!value) return "Konfirmasi kata sandi wajib diisi.";
        if (value !== values.password)
          return "Konfirmasi kata sandi tidak sama.";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const next = { ...form, [name]: value };
    setForm(next);

    // validasi ulang hanya kolom yang sudah pernah error
    const updated = { ...errors };
    if (errors[name]) updated[name] = validateField(name, value, next);
    // kalau password berubah, cek ulang konfirmasi
    if (name === "password" && errors.confirmPassword) {
      updated.confirmPassword = validateField(
        "confirmPassword",
        next.confirmPassword,
        next,
      );
    }
    setErrors(updated);
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return; // cegah klik ganda

    const fields = [
      "username",
      "email",
      "phone",
      "password",
      "confirmPassword",
    ];
    const newErrors = {};
    fields.forEach((name) => {
      newErrors[name] = validateField(name, form[name]);
    });
    setErrors(newErrors);

    if (fields.some((name) => newErrors[name])) return;

    setSubmitting(true);

    // simpan akun ke localStorage (lihat utils/auth.js)
    const result = await registerUser({
      name: form.username,
      email: form.email,
      phone: form.countryCode + form.phone,
      password: form.password,
    });

    setSubmitting(false);

    if (!result.ok) {
      setErrors((prev) => ({ ...prev, email: result.error }));
      return;
    }

    setSuccess(true);
  };

  const field = (name) => ({
    name,
    value: form[name],
    onChange: handleChange,
    onBlur: handleBlur,
    style: errors[name] ? { borderColor: "#e53935" } : undefined,
  });

  return (
    <>
      <nav className="navbar">
        <img src={Logo} alt="logo" className="imglogo" />
      </nav>

      <main className="register-container">
        <div className="register-box">
          <h2>Pendaftaran Akun</h2>
          <p className="subjudul">Yuk, buat akun untuk mulai belajar</p>

          <form onSubmit={handleSubmit} noValidate>
            <label htmlFor="username">Nama Lengkap</label>
            <input
              type="text"
              id="username"
              placeholder="Masukkan nama lengkap"
              {...field("username")}
            />
            {errors.username && (
              <span style={errorStyle}>{errors.username}</span>
            )}

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Masukkan email"
              {...field("email")}
            />
            {errors.email && <span style={errorStyle}>{errors.email}</span>}

            <label htmlFor="phone">No. Handphone</label>
            <div className="phone">
              <select
                name="countryCode"
                value={form.countryCode}
                onChange={handleChange}
              >
                <option>+62</option>
                <option>+60</option>
                <option>+65</option>
              </select>
              <input
                type="tel"
                id="phone"
                placeholder="81234567890"
                {...field("phone")}
              />
            </div>
            {errors.phone && <span style={errorStyle}>{errors.phone}</span>}

            <label htmlFor="password">Kata Sandi</label>
            <input
              type="password"
              id="password"
              placeholder="Masukkan kata sandi"
              {...field("password")}
            />
            {errors.password && (
              <span style={errorStyle}>{errors.password}</span>
            )}

            <label htmlFor="confirmPassword">Konfirmasi Kata Sandi</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Ulangi kata sandi"
              {...field("confirmPassword")}
            />
            {errors.confirmPassword && (
              <span style={errorStyle}>{errors.confirmPassword}</span>
            )}

            <button type="submit" className="btn-daftar" disabled={submitting}>
              {submitting ? "Memproses..." : "Daftar"}
            </button>
          </form>

          <button className="btn-masuk">
            <a href="/login" className="a-masuk">
              Masuk
            </a>
          </button>

          <div className="atau">Atau</div>

          <button className="btn-google">
            <img src={logoGoogle} alt="logo-google" className="img-daftar" />
            Daftar dengan Google
          </button>
        </div>
      </main>

      <ConfirmModal
        open={success}
        title="Pendaftaran Berhasil"
        message="Akunmu sudah dibuat. Silakan masuk untuk mulai belajar."
        buttonText="Ke Halaman Login"
        onClose={() => {
          setSuccess(false);
          window.location.href = "/login";
        }}
      />
    </>
  );
}

export default RegisterPage;
