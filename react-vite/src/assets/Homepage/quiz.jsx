import { useMemo, useState } from "react";
import { getQuestions } from "../utils/quizData";
import { getQuizResult, saveQuizResult, PASS_SCORE } from "../utils/learning";
import rulesBanner from "../bgruls.png";
import congratsImg from "../bgcongrats.png";
import tryAgainImg from "../bgtryagain.png";
import "../styles/quz.css";

const congratsBanner = congratsImg;
const tryAgainBanner = tryAgainImg;

function Banner({ image, text, variant }) {
  return (
    <div className={`qz-banner ${image ? "" : `qz-banner-text ${variant}`}`}>
      {image ? <img src={image} alt={text} /> : <span>{text}</span>}
    </div>
  );
}

export default function Quiz({ cardId, step, onChange, onContinue }) {
  const questions = useMemo(
    () => getQuestions(cardId, step.module),
    [cardId, step.module],
  );
  const total = questions.length;

  const [stage, setStage] = useState("rules"); // rules | play | result
  const [answers, setAnswers] = useState([]);
  const [index, setIndex] = useState(0);
  const [confirm, setConfirm] = useState(false);
  const [summary, setSummary] = useState(null);

  const saved = getQuizResult(cardId, step.id);
  const answeredCount = answers.filter((a) => a !== null).length;

  const startQuiz = () => {
    setAnswers(Array(total).fill(null));
    setIndex(0);
    setConfirm(false);
    setStage("play");
  };

  const submit = () => {
    const correct = questions.reduce(
      (n, q, i) => (answers[i] === q.answer ? n + 1 : n),
      0,
    );
    const empty = total - answeredCount;
    const score = total ? Math.round((correct / total) * 100) : 0;

    const res = saveQuizResult(cardId, step.id, score);
    onChange();

    setSummary({
      score,
      correct,
      wrong: total - correct - empty,
      empty,
      passed: score >= PASS_SCORE,
      attempts: res.attempts,
    });
    setConfirm(false);
    setStage("result");
  };

  // ---------- TAHAP SOAL ----------
  if (stage === "play") {
    const q = questions[index];
    const isLast = index === total - 1;

    return (
      <div className="qz-body">
        <div className="qz-play">
          <aside className="qz-list">
            <p className="qz-list-title">List Soal</p>
            <div className="qz-list-grid">
              {questions.map((_, i) => (
                <button
                  key={i}
                  className={`qz-num ${i === index ? "current" : ""} ${
                    answers[i] !== null && answers[i] !== undefined
                      ? "answered"
                      : ""
                  }`}
                  onClick={() => setIndex(i)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </aside>

          <section className="qz-question">
            <h3>Pertanyaan {index + 1}</h3>
            <p className="qz-qtext">{q.text}</p>

            <div className="qz-options">
              {q.options.map((opt, oi) => (
                <button
                  key={oi}
                  className={`qz-option ${answers[index] === oi ? "selected" : ""}`}
                  onClick={() =>
                    setAnswers((a) => a.map((v, i) => (i === index ? oi : v)))
                  }
                >
                  <span className="qz-radio" />
                  {opt}
                </button>
              ))}
            </div>

            <div className="qz-actions qz-nav">
              <button
                className="qz-btn-outline"
                disabled={index === 0}
                onClick={() => setIndex(index - 1)}
              >
                Sebelumnya
              </button>

              {isLast ? (
                <button className="qz-btn" onClick={() => setConfirm(true)}>
                  Kirim Jawaban
                </button>
              ) : (
                <button className="qz-btn" onClick={() => setIndex(index + 1)}>
                  Selanjutnya
                </button>
              )}
            </div>
          </section>
        </div>

        {confirm && (
          <div className="qz-overlay" onClick={() => setConfirm(false)}>
            <div className="qz-modal" onClick={(e) => e.stopPropagation()}>
              <h3>Kumpulkan Quiz?</h3>
              <p>
                {total - answeredCount === 0
                  ? "Semua soal sudah terjawab."
                  : `Masih ada ${total - answeredCount} soal yang belum terjawab.`}{" "}
                Jawaban tidak bisa diubah setelah dikirim.
              </p>
              <div className="qz-actions">
                <button
                  className="qz-btn-outline"
                  onClick={() => setConfirm(false)}
                >
                  Periksa Lagi
                </button>
                <button className="qz-btn" onClick={submit}>
                  Kirim
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ---------- TAHAP HASIL: CONGRATS / TRY AGAIN ----------
  if (stage === "result" && summary) {
    const pass = summary.passed;

    return (
      <>
        <Banner
          image={pass ? congratsBanner : tryAgainBanner}
          text={pass ? "CONGRATS" : "TRY AGAIN"}
          variant={pass ? "congrats" : "tryagain"}
        />

        <div className="qz-body">
          <h2>Hasil Quiz</h2>

          <div className="qz-result">
            <div className={`qz-score-box ${pass ? "pass" : "fail"}`}>
              <span>Nilai Kamu</span>
              <strong>{summary.score}</strong>
            </div>

            <div className="qz-stats">
              <div className="qz-stat">
                <strong className="ok">{summary.correct}</strong>
                <span>Benar</span>
              </div>
              <div className="qz-stat">
                <strong className="bad">{summary.wrong}</strong>
                <span>Salah</span>
              </div>
              <div className="qz-stat">
                <strong className="none">{summary.empty}</strong>
                <span>Kosong</span>
              </div>
            </div>
          </div>

          <h3 className="qz-sub">Umpan Balik</h3>
          <p className="qz-text">
            {pass
              ? "Kerja bagus! Kamu sudah memahami materi pada modul ini dan siap lanjut ke tahap berikutnya."
              : `Nilaimu belum mencapai batas lulus (${PASS_SCORE}). Pelajari kembali materinya, lalu coba lagi.`}
          </p>
          <p className="qz-last">
            Percobaan ke-{summary.attempts} · Nilai minimal lulus {PASS_SCORE}
          </p>

          <div className="qz-actions">
            {pass ? (
              <>
                <button
                  className="qz-btn-outline"
                  onClick={() => setStage("rules")}
                >
                  Lihat Aturan
                </button>
                <button className="qz-btn" onClick={onContinue}>
                  Lanjutkan
                </button>
              </>
            ) : (
              <button className="qz-btn" onClick={() => setStage("rules")}>
                Coba Lagi
              </button>
            )}
          </div>
        </div>
      </>
    );
  }

  // ---------- TAHAP ATURAN ----------
  return (
    <>
      <Banner image={rulesBanner} text="RULES" />

      <div className="qz-body">
        <h2>Aturan</h2>
        <p className="qz-text">
          Kerjakan quiz berikut untuk menguji pemahamanmu pada modul ini.
        </p>

        <ul className="qz-rules">
          <li>Quiz terdiri dari {total} pertanyaan pilihan ganda.</li>
          <li>Nilai minimal untuk lulus adalah {PASS_SCORE}.</li>
          <li>Tidak ada batas waktu pengerjaan.</li>
          <li>Kamu boleh mengulang quiz jika belum lulus.</li>
        </ul>

        {saved.attempts > 0 && (
          <p className="qz-last">
            Nilai terakhir: <strong>{saved.last}</strong> · Terbaik:{" "}
            <strong>{saved.best}</strong> · {saved.attempts}x percobaan
            {saved.passed && " · Lulus ✓"}
          </p>
        )}

        <button className="qz-btn" onClick={startQuiz}>
          {saved.attempts > 0 ? "Coba Lagi" : "Mulai Quiz"}
        </button>
      </div>
    </>
  );
}
