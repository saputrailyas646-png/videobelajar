import { getCourseById } from "./courseLookup";
import { getCurrentUser } from "./auth";
import { getQuestions } from "./quizData";

const KEY = "videobelajar_progress";

// Video cadangan per kelas kalau admin belum mengisi link video di Kelola Kursus.
// Nilai "GANTI_ID" dianggap belum diisi.
const VIDEO_BY_COURSE = {
  1: "https://www.youtube.com/embed/GANTI_ID_VIDEO_1",
  2: "https://www.youtube.com/embed/GANTI_ID_VIDEO_2",
  3: "https://www.youtube.com/embed/GANTI_ID_VIDEO_3",
};

// Tiap modul = semua video -> rangkuman -> quiz (kalau modul punya soal)
export function buildSteps(cardId) {
  const course = getCourseById(cardId);
  const steps = [];

  const fallback = VIDEO_BY_COURSE[course.id];
  const fallbackVideo =
    fallback && !fallback.includes("GANTI_ID") ? fallback : "";

  course.curriculum.forEach((mod, mi) => {
    mod.lessons.forEach((lesson, li) => {
      steps.push({
        id: `m${mi}-v${li}`,
        module: mi,
        moduleTitle: mod.title,
        type: "video",
        title: lesson.title,
        label: `Video: ${lesson.title}`,
        duration: lesson.duration,
        videoUrl: lesson.videoUrl || fallbackVideo,
      });
    });
    steps.push({
      id: `m${mi}-r`,
      module: mi,
      moduleTitle: mod.title,
      type: "summary",
      title: `Rangkuman: ${mod.title}`,
      label: `Rangkuman: ${mod.title}`,
      duration: "5 Menit",
    });

    // modul tanpa soal tidak punya langkah quiz
    const questionCount = getQuestions(cardId, mi).length;
    if (questionCount > 0) {
      steps.push({
        id: `m${mi}-q`,
        module: mi,
        moduleTitle: mod.title,
        type: "quiz",
        title: `Quiz: ${mod.title}`,
        label: `Quiz: ${mod.title}`,
        duration: `${questionCount} Pertanyaan`,
      });
    }
  });

  return steps;
}
function userKey() {
  const u = getCurrentUser();
  return (u && (u.email || u.id)) || "guest";
}

function readAll() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
}

function writeAll(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* abaikan */
  }
}

export function getProgress(cardId) {
  const all = readAll();
  return (
    (all[userKey()] && all[userKey()][cardId]) || { done: [], current: null }
  );
}

function saveProgress(cardId, progress) {
  const all = readAll();
  const uk = userKey();
  all[uk] = all[uk] || {};
  all[uk][cardId] = progress;
  writeAll(all);
}

export function markDone(cardId, stepId) {
  const p = getProgress(cardId);
  if (!p.done.includes(stepId)) p.done = [...p.done, stepId];

  const steps = buildSteps(cardId);
  const ids = new Set(steps.map((s) => s.id));
  const doneCount = p.done.filter((id) => ids.has(id)).length;
  if (steps.length > 0 && doneCount === steps.length && !p.finishedAt) {
    p.finishedAt = new Date().toISOString();
  }

  saveProgress(cardId, p);
  return p;
}

export function setCurrent(cardId, stepId) {
  const p = getProgress(cardId);
  p.current = stepId;
  saveProgress(cardId, p);
  return p;
}

// Dipakai header ("10/12", persen) dan halaman Kelas Saya
export function getSummary(cardId) {
  const steps = buildSteps(cardId);
  const p = getProgress(cardId);
  const ids = new Set(steps.map((s) => s.id));
  const done = p.done.filter((id) => ids.has(id)).length;
  const total = steps.length;
  const percent = total ? Math.round((done / total) * 100) : 0;
  const minutes = steps.reduce(
    (sum, s) =>
      s.duration.includes("Menit")
        ? sum + (parseInt(s.duration, 10) || 0)
        : sum,
    0,
  );

  return {
    done,
    total,
    percent,
    minutes,
    finished: total > 0 && done === total,
    finishedAt: p.finishedAt || null,
  };
}
export const PASS_SCORE = 70;
export const QUIZ_QUESTION_COUNT = 10;

export function getQuizResult(cardId, stepId) {
  const q = (getProgress(cardId).quiz || {})[stepId];
  return q || { attempts: 0, last: null, best: null, passed: false };
}

// Simpan hasil quiz. Kalau lulus, langkah quiz otomatis ditandai selesai.
export function saveQuizResult(cardId, stepId, score) {
  const p = getProgress(cardId);
  const old = getQuizResult(cardId, stepId);
  const passed = score >= PASS_SCORE;

  p.quiz = {
    ...(p.quiz || {}),
    [stepId]: {
      attempts: old.attempts + 1,
      last: score,
      best: Math.max(old.best ?? 0, score),
      passed: old.passed || passed,
    },
  };
  saveProgress(cardId, p);

  if (passed) markDone(cardId, stepId);
  return p.quiz[stepId];
}

export function saveReview(cardId, review) {
  const p = getProgress(cardId);
  p.review = {
    rating: review.rating,
    text: review.text,
    at: new Date().toISOString(),
  };
  saveProgress(cardId, p);
  return p.review;
}

export function getReview(cardId) {
  return getProgress(cardId).review || null;
}
