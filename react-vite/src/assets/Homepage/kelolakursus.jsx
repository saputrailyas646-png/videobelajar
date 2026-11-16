import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/kelolakursus.css";
import { IMAGES } from "../utils/courseData";
import { getCurrentUser,isAdmin} from "../utils/auth";
import {
  getCourses,
  saveCourses,
  resetCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../utils/courseStore";

const EMPTY_FORM = {
  title: "",
  category: "",
  description: "",
  author: "",
  role: "",
  price: "",
  oldPrice: "",
  rating: "4.5 (0)",
  imageKey: "hero",
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
    title: course.title,
    category: course.category,
    description: course.description,
    author: course.author,
    role: course.role,
    price: course.price,
    oldPrice: course.oldPrice || "",
    rating: course.rating,
    imageKey: course.imageKey || "hero",
    avatarKey: course.avatarKey || "iconpp",
  };
}

/* ---------- Form (Create & Update) ---------- */
function CourseForm({ initialValues, isEdit, categories, onSubmit, onCancel }) {
  const [form, setForm] = useState(initialValues);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const required = [
      "title",
      "category",
      "description",
      "author",
      "role",
      "price",
    ];
    if (required.some((k) => !form[k].trim())) {
      setError(
        "Judul, kategori, deskripsi, mentor, jabatan, dan harga wajib diisi.",
      );
      return;
    }
    setError("");
    onSubmit(form);
  };

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
          <select name="imageKey" value={form.imageKey} onChange={handleChange}>
            {Object.keys(IMAGES).map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </label>
        <label>
          Foto Mentor
          <select
            name="avatarKey"
            value={form.avatarKey}
            onChange={handleChange}
          >
            {Object.keys(IMAGES).map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </label>
      </div>

      {error && <p className="kk-error">{error}</p>}

      <div className="kk-actions">
        <button
          type="button"
          className="kk-btn kk-btn-ghost"
          onClick={onCancel}
        >
          Batal
        </button>
        <button type="submit" className="kk-btn kk-btn-primary">
          {isEdit ? "Simpan Perubahan" : "Tambah Kursus"}
        </button>
      </div>
    </form>
  );
}

/* ---------- Tabel (Read) ---------- */
function CourseTable({ courses, onEdit, onDelete }) {
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

/* ---------- Halaman (state ada di sini / parent) ---------- */
function KelolaKursusPage() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState(() => getCourses());
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null); // course yang sedang diedit
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");

 useEffect(() => {
   if (!getCurrentUser()) {
     navigate("/login", { state: { from: "/kelola-kursus" } });
   } else if (!isAdmin()) {
     navigate("/", { replace: true });
   }
 }, [navigate]);
  // simpan otomatis setiap data berubah
  useEffect(() => {
    saveCourses(courses);
  }, [courses]);

  const categories = useMemo(
    () => [...new Set(courses.map((c) => c.category))],
    [courses],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return courses;
    return courses.filter((c) =>
      [c.title, c.category, c.author].some((v) => v.toLowerCase().includes(q)),
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

  const handleSubmit = (values) => {
    const data = {
      ...values,
      tutor: values.author,
      tutorRole: values.role,
    };

    if (editing) {
      setCourses((prev) => updateCourse(prev, editing.id, data));
      flash("Kursus berhasil diubah.");
    } else {
      setCourses((prev) =>
        createCourse(prev, {
          ...data,
          tutorDescription: `Pengajar berpengalaman di bidang ${values.category}.`,
          curriculum: DEFAULT_CURRICULUM,
        }),
      );
      flash("Kursus berhasil ditambahkan.");
    }
    closeForm();
  };

  const confirmDelete = () => {
    setCourses((prev) => deleteCourse(prev, deleteTarget.id));
    setDeleteTarget(null);
    flash("Kursus berhasil dihapus.");
  };

  const handleReset = () => {
    setCourses(resetCourses());
    flash("Data dikembalikan ke awal.");
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
          <button className="kk-btn kk-btn-ghost" onClick={handleReset}>
            Reset Data
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
        onEdit={openEdit}
        onDelete={setDeleteTarget}
      />

      {deleteTarget && (
        <DeleteModal
          course={deleteTarget}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}

export default KelolaKursusPage;
