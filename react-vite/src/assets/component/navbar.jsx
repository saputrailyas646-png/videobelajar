import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import logo from "../logo.png";
import avatar from "../ppicon.png";
import "../styles/navbar.css";
import { getProfile, logout, isAdmin } from "../utils/auth";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(true);
  const [user, setUser] = useState(getProfile());
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // sinkronkan status login setiap pindah halaman
  useEffect(() => {
    setUser(getProfile());
  }, [location.pathname]);

  // sinkronkan saat profil disimpan (foto dan nama langsung berubah)
  useEffect(() => {
    const sync = () => setUser(getProfile());
    window.addEventListener("videobelajar-profile-updated", sync);
    return () =>
      window.removeEventListener("videobelajar-profile-updated", sync);
  }, []);

  // tutup dropdown profil kalau klik di luar menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    setProfileOpen(false);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <img className="imglogo" src={logo} alt="Video Belajar" />

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="hamburger"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        ☰
      </button>

      <div className={`nav-menu ${menuOpen ? "active" : ""}`}>
        <Link className="kategori" to="/category">
          Kategori
        </Link>

        {user ? (
          <div className="nav-profile" ref={profileRef}>
            <button
              type="button"
              className="nav-avatar-btn"
              onClick={() => setProfileOpen((o) => !o)}
              aria-label="Menu profil"
              aria-expanded={profileOpen}
            >
              <img
                src={user.photo || avatar}
                alt={user.name}
                className="nav-avatar"
              />
            </button>

            {profileOpen && (
              <div className="nav-dropdown">
                <Link to="/profil" onClick={() => setProfileOpen(false)}>
                  Profil Saya
                </Link>
                <Link to="/kelas" onClick={() => setProfileOpen(false)}>
                  Kelas Saya
                </Link>
                <Link to="/pesanan" onClick={() => setProfileOpen(false)}>
                  Pesanan Saya
                </Link>

                {/* hanya tampil untuk admin */}
                {isAdmin() && (
                  <Link
                    to="/kelola-kursus"
                    onClick={() => setProfileOpen(false)}
                  >
                    Kelola Kursus
                  </Link>
                )}

                <button
                  type="button"
                  className="nav-logout"
                  onClick={handleLogout}
                >
                  Keluar
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link className="login" to="/login">
              Login
            </Link>

            <Link className="register" to="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
