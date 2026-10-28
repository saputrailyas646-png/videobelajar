import "../assets/styles/register.css";
import Logo from "../assets/logo.png"
import logoGoogle from "../assets/logos_google-icon.png";

function RegisterPage() {
  return (
    <>
      <header className="nav-a">
        <img src={Logo}alt="erorr" className="a-img" />
      </header>
      <main className="register-container">
        <div className="register-box">
          <h2>Pendaftaran Akun</h2>
          <p className="subjudul">Yuk, buat akun untuk mulai belajar</p>
          <form action="" method="get">
            <label htmlFor="username">Nama Lengkap</label>
            <input
              type="text"
              id="username"
              placeholder="Masukkan nama lengkap"
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              required=""
              placeholder="Masukkan email"
            />
            <label htmlFor="phone">No. Handphone</label>
            <div className="phone">
              <select>
                <option>+62</option>
                <option>+60</option>
                <option>+65</option>
              </select>
              <input type="tel" id="phone" placeholder={81234567890} />
            </div>
            <label htmlFor="password">Kata Sandi</label>
            <input
              type="password"
              id="password"
              placeholder="Masukkan kata sandi"
            />
            <label htmlFor="Konfirmasipasword"> Konfirmasi Kata Sandi </label>
            <input
              type="password"
              id="Konfirmasipasword"
              placeholder="Ulangi kata sandi"
            />
            <button type="submit" className="btn-daftar">
              Daftar
            </button>
          </form>
          <button className="btn-masuk">
            <a href="/login" target="_blank" className="a-masuk">
              {" "}
              Masuk{" "}
            </a>
          </button>
          <div className="atau">Atau</div>
          <button className="btn-google">
            <img
              src={logoGoogle}
              alt="logo-google"
              className="img-daftar"
            />
            Daftar dengan Google
          </button>
        </div>
      </main>
    </>
  );
}

export default RegisterPage;
