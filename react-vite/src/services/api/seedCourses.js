// Skrip SEKALI JALAN untuk memasukkan 12 kursus bawaan ke mockapi.
import { courseData } from "../../assets/utils/courseData";
import { getBuiltInQuestions } from "../../assets/utils/quizData";
import {
  getCourses,
  addCourse,
  deleteCourse,
  updateCourse,
} from "./coursesApi";

// Kursus 1-3 punya soal di quizData.js (per id kelas). Soalnya ditanam ke
// curriculum[i].quiz supaya ikut tersimpan di API dan tidak bergantung pada id lagi.
// Kursus 4-12 sudah membawa quiz di curriculum-nya.
const withQuiz = (course) => ({
  ...course,
  curriculum: (course.curriculum || []).map((mod, i) => {
    if (Array.isArray(mod.quiz) && mod.quiz.length > 0) return mod;
    const questions = getBuiltInQuestions(course.id, i);
    return questions.length > 0 ? { ...mod, quiz: questions } : mod;
  }),
});

export async function seedCourses() {
  const existing = await getCourses();
  if (existing.length > 0) {
    throw new Error(
      `API sudah berisi ${existing.length} kursus. Jalankan clearCourses() dulu kalau mau seed ulang.`,
    );
  }

  const created = [];
  // berurutan (bukan paralel) supaya id di API mengikuti urutan courseData
  for (const course of courseData) {
    const saved = await addCourse(withQuiz(course));
    created.push(saved);
    console.log(`[SEED] ${saved.id} - ${saved.title}`);
  }
  console.log(`[SEED] selesai: ${created.length} kursus`);
  return created;
}

// Hapus SEMUA kursus di API (dipakai kalau seed perlu diulang)
export async function clearCourses() {
  const existing = await getCourses();
  for (const course of existing) {
    await deleteCourse(course.id);
    console.log(`[CLEAR] ${course.id} - ${course.title}`);
  }
  console.log(`[CLEAR] selesai: ${existing.length} kursus dihapus`);
}
export async function overwriteCourses() {
  for (const course of courseData) {
    await updateCourse(course.id, withQuiz(course));
    console.log(`[OVERWRITE] ${course.id} - ${course.title}`);
  }
  console.log(`[OVERWRITE] selesai: ${courseData.length} kursus`);
}