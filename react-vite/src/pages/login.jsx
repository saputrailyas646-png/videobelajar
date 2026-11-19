import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../assets/styles/login.css";
import logo from "../assets/logo.png";
import logoGoogle from "../assets/logos_google-icon.png";
import { loginUser, getCurrentUser } from "../assets/utils/auth";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errorUsername, setErrorUsername] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  // info akun admin untuk penguji (muncul sekali per sesi browser)
  // info akun admin untuk penguji (muncul setiap halaman login dibuka / di-refresh)
  useEffect(() => {
    if (getCurrentUser()) return; // sudah login, tidak perlu alert
    alert(
      "Akun admin untuk penguji crud akun khusus admin:\n\nE-Mail: admin@videobelajar.com\nKata Sandi: admin123 \n akun selain ini semantarra = user",
    );
  }, []);

  // kalau sudah login, jangan tampilkan halaman login
  useEffect(() => {
    if (getCurrentUser()) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const validateUsername = (value) => {
    if (value.trim().length === 0) return "Email wajib diisi.";
    if (!emailRegex.test(value)) return "Format email tidak valid.";
    return "";
  };

  const validatePassword = (value) => {
    if (value.trim().length === 0) return "Password wajib diisi.";
    if (value.length < 8) return "Password minimal 8 karakter.";
    return "";
  };

  const handleUsername = (event) => {
    const value = event.target.value;
    setUsername(value);
    if (errorUsername) setErrorUsername(validateUsername(value));
  };

  const handlePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
    if (errorPassword) setErrorPassword(validatePassword(value));
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const eUser = validateUsername(username);
    const ePass = validatePassword(password);

    setErrorUsername(eUser);
    setErrorPassword(ePass);

    if (eUser || ePass) return;

    const result = await loginUser(username, password);
    console.log("login result:", result);

    if (!result.ok) {
      setErrorPassword(result.error);
      return;
    }

    // login benar -> langsung ke beranda (atau halaman asal kalau ada)
    navigate(location.state?.from || "/", { replace: true });
  };

  return (
    <>
      <nav className="navbar">
        <img src={logo} alt="logo" className="imglogo" />
      </nav>

      <main className="login-container">
        <div className="login-box">
          <h2>Masuk ke Akun</h2>
          <p className="deskripsi">Yuk, lanjut belajar di videobelajar</p>

          <form onSubmit={handleLogin} noValidate>
            <label htmlFor="email">
              E-Mail <span>*</span>
            </label>

            <input
              type="email"
              id="email"
              value={username}
              onChange={handleUsername}
              onBlur={() => setErrorUsername(validateUsername(username))}
              placeholder="contoh.username@gmail.com"
            />

            <span
              id="error-label-username"
              className="error-label"
              style={{ visibility: errorUsername ? "visible" : "hidden" }}
            >
              {errorUsername || "-"}
            </span>

            <label htmlFor="password">
              Kata Sandi <span>*</span>
            </label>

            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={handlePassword}
                onBlur={() => setErrorPassword(validatePassword(password))}
                placeholder="Masukkan kata sandi"
              />
              <span
                onClick={() => setShowPassword((s) => !s)}
                style={{ cursor: "pointer" }}
                title={showPassword ? "Sembunyikan" : "Lihat"}
              >
                ◉
              </span>
            </div>

            <span
              id="error-label-password"
              className="error-label"
              style={{ visibility: errorPassword ? "visible" : "hidden" }}
            >
              {errorPassword || "-"}
            </span>

            <a href="#" className="lupa">
              Lupa Password?
            </a>

            <button type="submit" className="btn-masuk">
              Masuk
            </button>
          </form>

          <button
            type="button"
            className="btn-daftar"
            onClick={() => navigate("/register")}
          >
            Daftar
          </button>

          <div className="atau">
            <span />
            <p>atau</p>
            <span />
          </div>

          <button type="button" className="btn-google12">
            <img src={logoGoogle} alt="Google" className="img-google" />
            Masuk dengan Google
          </button>
        </div>
      </main>
    </>
  );
}

export default LoginPage;
