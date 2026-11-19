import { useState } from "react";
import { getBuiltInQuestions } from "../utils/quizData";

// Ubah link YouTube biasa jadi link embed.
// "" = kosong, null = link tidak valid.
function toEmbedUrl(input) {
  const url = (input || "").trim();
  if (!url) return "";
  const m =
    url.match(/youtu\.be\/([\w-]{11})/) ||
    url.match(/[?&]v=([\w-]{11})/) ||
    url.match(/youtube\.com\/(?:embed|shorts|live)\/([\w-]{11})/);
  if (m) return `https://www.youtube.com/embed/${m[1]}`;
  return /^https?:\/\//.test(url) ? url : null;
}

// salin kurikulum kursus jadi draft yang bisa diedit
function makeDraft(course) {
  return (course.curriculum || []).map((mod, mi) => ({
    title: mod.title,
    lessons: mod.lessons.map((l) => ({
      title: l.title,
      minutes: parseInt(l.duration, 10) || 10,
      videoUrl: l.videoUrl || "",
    })),
    // pakai soal buatan admin kalau ada, kalau belum pakai soal bawaan
    quiz: (Array.isArray(mod.quiz)
      ? mod.quiz
      : getBuiltInQuestions(course.id, mi)
    ).map((q) => ({
      text: q.text,
      options: Array.from({ length: 4 }, (_, i) => q.options[i] || ""),
      answer: q.answer,
    })),
  }));
}

const NEW_LESSON = { title: "", minutes: 10, videoUrl: "" };
const NEW_QUESTION = { text: "", options: ["", "", "", ""], answer: 0 };

export default function MateriEditor({ course, onSave, onCancel }) {
  const [draft, setDraft] = useState(() => makeDraft(course));
  const [error, setError] = useState("");

  const editModule = (mi, fn) =>
    setDraft((d) => d.map((m, i) => (i === mi ? fn(m) : m)));

  const setLesson = (mi, li, patch) =>
    editModule(mi, (m) => ({
      ...m,
      lessons: m.lessons.map((l, j) => (j === li ? { ...l, ...patch } : l)),
    }));

  const setQuestion = (mi, qi, patch) =>
    editModule(mi, (m) => ({
      ...m,
      quiz: m.quiz.map((q, j) => (j === qi ? { ...q, ...patch } : q)),
    }));

  const setOption = (mi, qi, oi, value) =>
    editModule(mi, (m) => ({
      ...m,
      quiz: m.quiz.map((q, j) =>
        j === qi
          ? { ...q, options: q.options.map((o, k) => (k === oi ? value : o)) }
          : q,
      ),
    }));

  const handleSave = () => {
    for (const [mi, m] of draft.entries()) {
      const label = `Modul ${mi + 1}`;
      if (!m.title.trim()) {
        return setError(`${label}: judul modul wajib diisi.`);
      }
      for (const [li, l] of m.lessons.entries()) {
        if (!l.title.trim()) {
          return setError(`${label}, video ${li + 1}: judul wajib diisi.`);
        }
        if (toEmbedUrl(l.videoUrl) === null) {
          return setError(
            `${label}, video ${li + 1}: link tidak valid, gunakan link YouTube.`,
          );
        }
      }
      for (const [qi, q] of m.quiz.entries()) {
        if (!q.text.trim() || q.options.some((o) => !o.trim())) {
          return setError(
            `${label}, soal ${qi + 1}: pertanyaan dan keempat pilihan wajib diisi.`,
          );
        }
      }
    }

    onSave(
      draft.map((m) => ({
        title: m.title.trim(),
        lessons: m.lessons.map((l) => ({
          title: l.title.trim(),
          duration: `${Math.max(1, Number(l.minutes) || 1)} Menit`,
          videoUrl: toEmbedUrl(l.videoUrl) || "",
        })),
        quiz: m.quiz.map((q) => ({
          text: q.text.trim(),
          options: q.options.map((o) => o.trim()),
          answer: q.answer,
        })),
      })),
    );
  };

  return (
    <div className="kk-overlay">
      <div className="mt-modal">
        <div className="mt-head">
          <h2>Isi Materi</h2>
          <p>{course.title}</p>
        </div>

        <div className="mt-body">
          {draft.map((mod, mi) => (
            <section className="mt-module" key={mi}>
              <div className="mt-row">
                <input
                  className="mt-input mt-grow"
                  placeholder={`Judul modul ${mi + 1}`}
                  value={mod.title}
                  onChange={(e) =>
                    editModule(mi, (m) => ({ ...m, title: e.target.value }))
                  }
                />
                <button
                  type="button"
                  className="kk-btn kk-btn-small kk-btn-danger"
                  disabled={draft.length === 1}
                  onClick={() => setDraft((d) => d.filter((_, i) => i !== mi))}
                >
                  Hapus Modul
                </button>
              </div>

              <h4>Video</h4>
              {mod.lessons.map((l, li) => (
                <div className="mt-lesson" key={li}>
                  <input
                    className="mt-input mt-grow"
                    placeholder="Judul video"
                    value={l.title}
                    onChange={(e) =>
                      setLesson(mi, li, { title: e.target.value })
                    }
                  />
                  <input
                    className="mt-input mt-min"
                    type="number"
                    min="1"
                    value={l.minutes}
                    onChange={(e) =>
                      setLesson(mi, li, { minutes: e.target.value })
                    }
                  />
                  <span>menit</span>
                  <input
                    className="mt-input mt-link"
                    placeholder="Link YouTube, contoh: https://youtu.be/xxxxxxxxxxx"
                    value={l.videoUrl}
                    onChange={(e) =>
                      setLesson(mi, li, { videoUrl: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className="kk-btn kk-btn-small kk-btn-danger"
                    disabled={mod.lessons.length === 1}
                    onClick={() =>
                      editModule(mi, (m) => ({
                        ...m,
                        lessons: m.lessons.filter((_, j) => j !== li),
                      }))
                    }
                  >
                    ✕
                  </button>
                </div>
              ))}
              <div>
                <button
                  type="button"
                  className="kk-btn kk-btn-small"
                  onClick={() =>
                    editModule(mi, (m) => ({
                      ...m,
                      lessons: [...m.lessons, { ...NEW_LESSON }],
                    }))
                  }
                >
                  + Tambah Video
                </button>
              </div>

              <h4>Soal Kuis ({mod.quiz.length})</h4>
              {mod.quiz.length === 0 && (
                <p className="mt-hint">
                  Belum ada soal. Modul tanpa soal tidak punya langkah kuis.
                </p>
              )}
              {mod.quiz.map((q, qi) => (
                <div className="mt-question" key={qi}>
                  <div className="mt-row">
                    <textarea
                      className="mt-input mt-grow"
                      rows={2}
                      placeholder={`Pertanyaan ${qi + 1}`}
                      value={q.text}
                      onChange={(e) =>
                        setQuestion(mi, qi, { text: e.target.value })
                      }
                    />
                    <button
                      type="button"
                      className="kk-btn kk-btn-small kk-btn-danger"
                      onClick={() =>
                        editModule(mi, (m) => ({
                          ...m,
                          quiz: m.quiz.filter((_, j) => j !== qi),
                        }))
                      }
                    >
                      ✕
                    </button>
                  </div>

                  {q.options.map((opt, oi) => (
                    <div className="mt-option" key={oi}>
                      <input
                        type="radio"
                        name={`ans-${mi}-${qi}`}
                        checked={q.answer === oi}
                        onChange={() => setQuestion(mi, qi, { answer: oi })}
                      />
                      <input
                        className="mt-input mt-grow"
                        placeholder={`Pilihan ${String.fromCharCode(65 + oi)}`}
                        value={opt}
                        onChange={(e) => setOption(mi, qi, oi, e.target.value)}
                      />
                    </div>
                  ))}
                  <small className="mt-hint">
                    Pilih bulatan di samping jawaban yang benar.
                  </small>
                </div>
              ))}
              <div>
                <button
                  type="button"
                  className="kk-btn kk-btn-small"
                  onClick={() =>
                    editModule(mi, (m) => ({
                      ...m,
                      quiz: [
                        ...m.quiz,
                        { ...NEW_QUESTION, options: ["", "", "", ""] },
                      ],
                    }))
                  }
                >
                  + Tambah Soal
                </button>
              </div>
            </section>
          ))}

          <div>
            <button
              type="button"
              className="kk-btn kk-btn-ghost"
              onClick={() =>
                setDraft((d) => [
                  ...d,
                  { title: "", lessons: [{ ...NEW_LESSON }], quiz: [] },
                ])
              }
            >
              + Tambah Modul
            </button>
          </div>
        </div>

        <div className="mt-foot">
          {error && <p className="kk-error">{error}</p>}
          <div className="kk-actions">
            <button
              type="button"
              className="kk-btn kk-btn-ghost"
              onClick={onCancel}
            >
              Batal
            </button>
            <button
              type="button"
              className="kk-btn kk-btn-primary"
              onClick={handleSave}
            >
              Simpan Materi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
