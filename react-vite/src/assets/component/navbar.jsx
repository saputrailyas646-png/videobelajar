import { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../logo.png";
import "../styles/navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(true);

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

        <Link className="login" to="/login">
          Login
        </Link>

        <Link className="register" to="/register">
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
