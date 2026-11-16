import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "../styles/profil.css";
import avatar from "../ppicon.png"; // foto bawaan, sama dengan di Navbar
import Navbar from "../component/navbar";
import Footer from "../component/footer";
import { getProfile, updateProfile } from "../utils/auth";

// Foto dipotong persegi dan dikecilkan supaya muat di localStorage
function resizePhoto(file, max = 256) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const side = Math.min(img.width, img.height);
        const size = Math.min(side, max);
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        canvas
          .getContext("2d")
          .drawImage(
            img,
            (img.width - side) / 2,
            (img.height - side) / 2,
            side,
            side,
            0,
            0,
            size,
            size,
          );
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function ProfilPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => getProfile());
  const [message, setMessage] = useState({ type: "", text: "" });

  // belum login -> ke halaman login, lalu kembali ke sini
  if (!user) {
    return <Navigate to="/login" replace state={{ from: "/profil" }} />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
    setMessage({ type: "", text: "" });
  };

  const handlePhoto = async (e) => {
    const file = e.target.files[0];
    e.target.value = ""; // supaya foto yang sama bisa dipilih lagi
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage({ type: "error", text: "File harus berupa gambar." });
      return;
    }

    try {
      const photo = await resizePhoto(file);
      setUser((prev) => ({ ...prev, photo }));
      setMessage({
        type: "info",
        text: "Foto dipilih. Klik Simpan untuk menerapkan.",
      });
    } catch {
      setMessage({ type: "error", text: "Foto tidak bisa dibaca." });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = updateProfile({
      name: user.name,
      phone: user.phone.replace(/[^\d]/g, ""),
      countryCode: user.countryCode,
      photo: user.photo,
    });

    if (!result.ok) {
      setMessage({ type: "error", text: result.error });
      return;
    }

    setUser(getProfile());
    setMessage({ type: "success", text: "Profil berhasil disimpan." });
  };

  return (
    <>
      <Navbar />

      <main className="profil-page">
        <div className="profil-container">
          <aside className="profil-sidebar">
            <div className="profil-heading">
              <h2>Ubah Profil</h2>
              <p>Ubah data diri Anda</p>
            </div>

            <div className="profil-menu">
              <button className="profil-menu-item active">
                <span>♙</span> Profil Saya
              </button>

              <button
                className="profil-menu-item"
                onClick={() => navigate("/kelas")}
              >
                <span>▣</span> Kelas Saya
              </button>

              <button
                className="profil-menu-item"
                onClick={() => navigate("/pesanan")}
              >
                <span>♧</span> Pesanan Saya
              </button>
            </div>
          </aside>

          <section className="profil-content">
            <form onSubmit={handleSubmit}>
              <div className="profil-user">
                <div className="profil-photo-wrapper">
                  <img
                    src={user.photo || avatar}
                    alt="Foto Profil"
                    className="profil-photo"
                  />
                </div>

                <div className="profil-user-info">
                  <h3>{user.name}</h3>
                  <p>{user.email}</p>

                  <label htmlFor="upload-photo" className="profil-upload">
                    Ganti Foto Profil
                  </label>

                  <input
                    type="file"
                    id="upload-photo"
                    accept="image/*"
                    onChange={handlePhoto}
                    hidden
                  />
                </div>
              </div>

              <div className="profil-divider"></div>

              <div className="profil-form-grid">
                <div className="profil-field">
                  <label htmlFor="name">Nama Lengkap</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="profil-field">
                  <label htmlFor="email">E-Mail</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={user.email}
                    readOnly
                    title="E-Mail dari saat mendaftar tidak dapat diubah"
                  />
                </div>
                <div className="profil-field">
                  <label htmlFor="phone">No. Hp</label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                    placeholder="81234567890"
                  />
                </div>
              </div>

              {message.text && (
                <p className={`profil-message ${message.type}`}>
                  {message.text}
                </p>
              )}

              <div className="profil-actions">
                <button type="submit" className="profil-save-button">
                  Simpan
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default ProfilPage;
