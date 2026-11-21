import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/kelolakursus.css";
import { IMAGES } from "../utils/courseData";
import { getCurrentUser, isAdmin } from "../utils/auth";
import { fileToDataUrl } from "../utils/imageUpload";
import MateriEditor from "./MateriEditor";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCourses,
  addCourse,
  editCourse,
  removeCourse,
} from "../../store/redux/coursesSlice";

// image / avatar = foto upload dari PC (data URL).
// imageKey / avatarKey = foto bawaan. Kalau upload dipakai, key dikosongkan.
const EMPTY_FORM = {
  title: "",
  category: "",
  description: "",
  author: "",
  role: "",
  price: "",
  oldPrice: "",
  rating: "4.5 (0)",
  image: "",
  imageKey: "hero",
  avatar: "",
  avatarKey: "iconpp",
};

// kursus baru butuh kurikulum minimal supaya halaman info & belajar tidak kosong
const DEFAULT_CURRICULUM = [
  {
    title: "Pengenalan",
    lessons: [
      { title: "Selamat Datang", duration: "10 Menit" },
      { title: "Dasar-dasar Materi", duration: "15 Menit" },
    ],
  },
];

function toFormValues(course) {
  return {
    title: course.title ?? "",
    category: course.category ?? "",
    description: course.description ?? "",
    author: course.author ?? "",
    role: course.role ?? "",
    price: course.price ?? "",
    oldPrice: course.oldPrice || "",
    rating: course.rating ?? "",
    // foto bawaan -> simpan key saja; foto upload -> simpan data URL-nya
    image: course.imageKey ? "" : course.image || "",
    imageKey: course.imageKey || "",
    avatar: course.avatarKey ? "" : course.avatar || "",
    avatarKey: course.avatarKey || "",
  };
}

/* ---------- Form (Create & Update) ---------- */
function CourseForm({ initialValues, isEdit, categories, onSubmit, onCancel }) {
  const [form, setForm] = useState(initialValues);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // pilih foto bawaan -> hapus foto upload
  const pickBuiltIn = (field) => (e) => {
    const { value } = e.target;
    setForm((prev) => ({ ...prev, [`${field}Key`]: value, [field]: "" }));
  };

  // pilih file dari PC -> kosongkan key foto bawaan
  const handleFile = async (e, field) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // supaya file yang sama bisa dipilih lagi
    if (!file) return;

    try {
      const dataUrl = await fileToDataUrl(file, field === "image" ? 640 : 200);
      setForm((prev) => ({ ...prev, [field]: dataUrl, [`${field}Key`]: "" }));
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const required = [
      "title",
      "category",
      "description",
      "author",
      "role",
      "price",
    ];
    if (required.some((k) => !String(form[k] ?? "").trim())) {
      setError(
        "Judul, kategori, deskripsi, mentor, jabatan, dan harga wajib diisi.",
      );
      return;
    }
    setError("");
    setSaving(true);
    try {
      // kalau berhasil, halaman induk menutup form ini
      await onSubmit(form);
    } catch (err) {
      setError(err.message || "Gagal menyimpan. Coba lagi.");
      setSaving(false);
    }
  };

  const imageSrc = form.image || IMAGES[form.imageKey];
  const avatarSrc = form.avatar || IMAGES[form.avatarKey];

  return (
    <form className="kk-form" onSubmit={handleSubmit}>
      <h2>{isEdit ? "Ubah Kursus" : "Tambah Kursus"}</h2>

      <label>
        Judul Kursus
        <input name="title" value={form.title} onChange={handleChange} />
      </label>

      <label>
        Kategori
        <input
          name="category"
          list="kk-categories"
          value={form.category}
          onChange={handleChange}
        />
        <datalist id="kk-categories">
          {categories.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
      </label>

      <label>
        Deskripsi
        <textarea
          name="description"
          rows={3}
          value={form.description}
          onChange={handleChange}
        />
      </label>

      <div className="kk-row">
        <label>
          Nama Mentor
          <input name="author" value={form.author} onChange={handleChange} />
        </label>
        <label>
          Jabatan Mentor
          <input name="role" value={form.role} onChange={handleChange} />
        </label>
      </div>

      <div className="kk-row">
        <label>
          Harga
          <input
            name="price"
            placeholder="Rp 300K"
            value={form.price}
            onChange={handleChange}
          />
        </label>
        <label>
          Harga Coret
          <input
            name="oldPrice"
            placeholder="Rp 600K"
            value={form.oldPrice}
            onChange={handleChange}
          />
        </label>
        <label>
          Rating
          <input name="rating" value={form.rating} onChange={handleChange} />
        </label>
      </div>

      <div className="kk-row">
        <label>
          Gambar Kursus
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFile(e, "image")}
          />
          <select
            name="imageKey"
            value={form.imageKey}
            onChange={pickBuiltIn("image")}
          >
            {form.imageKey === "" && <option value="">Foto dari PC</option>}
            {Object.keys(IMAGES).map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
          {imageSrc && (
            <img
              src={imageSrc}
              alt="Pratinjau gambar kursus"
              style={{
                width: 160,
                height: 100,
                objectFit: "cover",
                borderRadius: 8,
              }}
            />
          )}
        </label>

        <label>
          Foto Mentor
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFile(e, "avatar")}
          />
          <select
            name="avatarKey"
            value={form.avatarKey}
            onChange={pickBuiltIn("avatar")}
          >
            {form.avatarKey === "" && <option value="">Foto dari PC</option>}
            {Object.keys(IMAGES).map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
          {avatarSrc && (
            <img
              src={avatarSrc}
              alt="Pratinjau foto mentor"
              style={{
                width: 72,
                height: 72,
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          )}
        </label>
      </div>

      {error && <p className="kk-error">{error}</p>}

      <div className="kk-actions">
        <button
          type="button"
          className="kk-btn kk-btn-ghost"
          onClick={onCancel}
          disabled={saving}
        >
          Batal
        </button>
        <button
          type="submit"
          className="kk-btn kk-btn-primary"
          disabled={saving}
        >
          {saving
            ? "Menyimpan..."
            : isEdit
              ? "Simpan Perubahan"
              : "Tambah Kursus"}
        </button>
      </div>
    </form>
  );
}

/* ---------- Tabel (Read) ---------- */
function CourseTable({ courses, loading, onEdit, onDelete, onMateri }) {
  if (loading && courses.length === 0) {
    return <p className="kk-empty">Memuat kursus...</p>;
  }

  if (courses.length === 0) {
    return <p className="kk-empty">Belum ada kursus yang cocok.</p>;
  }

  return (
    <div className="kk-table-wrap">
      <table className="kk-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Kursus</th>
            <th>Kategori</th>
            <th>Mentor</th>
            <th>Harga</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>
                <div className="kk-course-cell">
                  <img src={c.image} alt={c.title} />
                  <span>{c.title}</span>
                </div>
              </td>
              <td>{c.category}</td>
              <td>{c.author}</td>
              <td>{c.price}</td>
              <td>
                <div className="kk-actions">
                  <button
                    className="kk-btn kk-btn-small"
                    onClick={() => onMateri(c)}
                  >
                    Isi Materi
                  </button>
                  <button
                    className="kk-btn kk-btn-small"
                    onClick={() => onEdit(c)}
                  >
                    Edit
                  </button>
                  <button
                    className="kk-btn kk-btn-small kk-btn-danger"
                    onClick={() => onDelete(c)}
                  >
                    Hapus
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- Modal konfirmasi hapus (Delete) ---------- */
function DeleteModal({ course, onConfirm, onCancel }) {
  return (
    <div className="kk-overlay" onClick={onCancel}>
      <div className="kk-modal" onClick={(e) => e.stopPropagation()}>
        <h3>Hapus kursus?</h3>
        <p>
          Kursus <b>{course.title}</b> akan dihapus dari daftar. Tindakan ini
          tidak bisa dibatalkan.
        </p>
        <div className="kk-actions">
          <button className="kk-btn kk-btn-ghost" onClick={onCancel}>
            Batal
          </button>
          <button className="kk-btn kk-btn-danger" onClick={onConfirm}>
            Ya, Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Halaman ---------- */
function KelolaKursusPage() {
  const navigate = useNavigate();

  // DATA & AKSI dari Redux store (semuanya lewat API mockapi)
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses);
  const loading = useSelector((state) => state.courses.loading);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null); // course yang sedang diedit
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [materiTarget, setMateriTarget] = useState(null);
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");

  // hanya admin yang boleh masuk
  useEffect(() => {
    if (!getCurrentUser()) {
      navigate("/login", { state: { from: "/kelola-kursus" } });
    } else if (!isAdmin()) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const categories = useMemo(
    () => [...new Set(courses.map((c) => c.category).filter(Boolean))],
    [courses],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return courses;
    return courses.filter((c) =>
      [c.title, c.category, c.author].some((v) =>
        String(v ?? "")
          .toLowerCase()
          .includes(q),
      ),
    );
  }, [courses, query]);

  const flash = (msg) => {
    setNotice(msg);
    setTimeout(() => setNotice(""), 2500);
  };

  const openCreate = () => {
    setEditing(null);
    setShowForm(true);
  };

  const openEdit = (course) => {
    setEditing(course);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeForm = () => {
    setShowForm(false);
    setEditing(null);
  };

  // CREATE & UPDATE. Kalau gagal, error dilempar ke form supaya ditampilkan di sana.
  const handleSubmit = async (values) => {
    const data = {
      ...values,
      tutor: values.author,
      tutorRole: values.role,
    };

    if (editing) {
      // kirim data lengkap (gabungan lama + baru) supaya field lain tidak hilang
      await dispatch(
        editCourse({ id: editing.id, changes: { ...editing, ...data } }),
      ).unwrap();
      flash("Kursus berhasil diubah.");
    } else {
      await dispatch(
        addCourse({
          ...data,
          tutorDescription: `Pengajar berpengalaman di bidang ${values.category}.`,
          curriculum: DEFAULT_CURRICULUM,
        }),
      ).unwrap();
      flash("Kursus berhasil ditambahkan.");
    }
    closeForm();
  };

  // DELETE
  const confirmDelete = async () => {
    try {
      await dispatch(removeCourse(deleteTarget.id)).unwrap();
      flash("Kursus berhasil dihapus.");
    } catch (err) {
      flash(`Gagal menghapus: ${err.message}`);
    }
    setDeleteTarget(null);
  };

  // UPDATE materi
  const handleSaveMateri = async (curriculum) => {
    try {
      await dispatch(
        editCourse({
          id: materiTarget.id,
          changes: { ...materiTarget, curriculum },
        }),
      ).unwrap();
      setMateriTarget(null);
      flash("Materi kursus berhasil disimpan.");
    } catch (err) {
      flash(`Gagal menyimpan materi: ${err.message}`);
    }
  };

  if (!isAdmin()) return null;

  return (
    <div className="kk-page">
      <header className="kk-header">
        <div>
          <Link to="/" className="kk-back">
            ← Beranda
          </Link>
          <h1>Kelola Kursus</h1>
          <p>{courses.length} kursus tersimpan</p>
        </div>
        <div className="kk-actions">
          <button
            className="kk-btn kk-btn-ghost"
            onClick={() => dispatch(fetchCourses())}
            disabled={loading}
          >
            {loading ? "Memuat..." : "Muat Ulang"}
          </button>
          <button className="kk-btn kk-btn-primary" onClick={openCreate}>
            + Tambah Kursus
          </button>
        </div>
      </header>

      {notice && <div className="kk-notice">{notice}</div>}

      {showForm && (
        <CourseForm
          key={editing ? editing.id : "new"}
          initialValues={editing ? toFormValues(editing) : EMPTY_FORM}
          isEdit={Boolean(editing)}
          categories={categories}
          onSubmit={handleSubmit}
          onCancel={closeForm}
        />
      )}

      <input
        className="kk-search"
        placeholder="Cari judul, kategori, atau mentor..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <CourseTable
        courses={filtered}
        loading={loading}
        onEdit={openEdit}
        onDelete={setDeleteTarget}
        onMateri={setMateriTarget}
      />

      {deleteTarget && (
        <DeleteModal
          course={deleteTarget}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
      {materiTarget && (
        <MateriEditor
          course={materiTarget}
          onSave={handleSaveMateri}
          onCancel={() => setMateriTarget(null)}
        />
      )}
    </div>
  );
}

export default KelolaKursusPage;
