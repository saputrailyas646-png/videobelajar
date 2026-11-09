import { useState } from "react";
import "../assets/styles/login.css";
import logo from "../assets/logo.png";
import logoGoogle from "../assets/logos_google-icon.png";


function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("")

  const [errorUsername, setErrorUsername] = useState(true);
  const [errorPassword, setErrorPassword] = useState (true)

  const handleUsername = (event) => {
    const value = event.target.value;

    setUsername(value);

    if (value.trim().length > 0) {
      setErrorUsername(false);
    }
  };

  const handlePassword = (event) => {
    const value = event.target.value;

    setPassword(value);

    if (value.trim().length > 0) {
      setErrorPassword(false);
    }
  };


  const handleLogin = (event) => {
    event.preventDefault();

    if (username.trim().length === 0) {
      setErrorUsername(true);
      return;
    }

    setErrorUsername(false);
    alert("Email sudah diisi. Fitur login belum terhubung.");
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

          <form onSubmit={handleLogin}>
            <label htmlFor="email">
              E-Mail <span>*</span>
            </label>

            <input
              type="email"
              id="email"
              value={username}
              onChange={handleUsername}
              onBlur={() => setErrorUsername(username.trim().length === 0)}
              placeholder="contoh.username@gmail.com"
              required
            />

            <span
              id="error-label-username"
              className="error-label"
              style={{
                visibility: errorUsername ? "visible" : "hidden",
              }}
            >
              Email wajib diisi.
            </span>

            <label htmlFor="password">
              Kata Sandi <span>*</span>
            </label>

            <div className="password-box">
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePassword}
                onBlur={() => setErrorPassword(password.trim().length === 0)}
                placeholder="Masukkan kata sandi"
                required
              />
              <span>◉</span>
            </div>

            <span
              id="error-label-password"
              className="error-label"
              style={{
                visibility: errorPassword ? "visible" : "hidden",
              }}
            >
              password wajib diisi.
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
            onClick={() => {
              window.location.href = "/register";
            }}
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
