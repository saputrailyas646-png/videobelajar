import { useCourseStore } from "../../store/useCourseStore";

// Pengganti getCourseById lama, sekarang membaca dari store (data API).
// Perilaku sama seperti dulu: id tidak ketemu -> kursus pertama.
export function getCourseById(id) {
  const list = useCourseStore.getState().courses;
  return list.find((c) => c.id === Number(id)) || list[0];
}
