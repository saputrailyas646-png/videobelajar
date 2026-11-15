const PROGRESS_KEY = "videobelajar_progress";

export const TOTAL_MODULES = 12;

function readAll() {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {};
  } catch {
    return {};
  }
}

const keyOf = (email, courseId) => `${email}::${courseId}`;

// Progres satu kelas milik satu user
export function getProgress(email, courseId, total = TOTAL_MODULES) {
  const item = readAll()[keyOf(email, courseId)];
  const done = Math.min(item?.done || 0, total);

  return {
    done,
    total,
    percent: Math.round((done / total) * 100),
    finished: done >= total,
    finishedAt: item?.finishedAt || null,
  };
}

// Simulasi belajar: menyelesaikan 1 modul berikutnya
export function completeNextModule(email, courseId, total = TOTAL_MODULES) {
  const all = readAll();
  const key = keyOf(email, courseId);
  const current = all[key] || { done: 0 };

  if (current.done < total) {
    const done = current.done + 1;
    all[key] = {
      done,
      finishedAt: done >= total ? new Date().toISOString() : null,
    };
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(all));
  }

  return getProgress(email, courseId, total);
}
