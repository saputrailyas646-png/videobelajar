import { store } from "../../store/redux/store";

// Pengganti getCourseById lama, sekarang membaca dari store Redux (data API).
// Perilaku sama seperti dulu: id tidak ketemu -> kursus pertama.
export function getCourseById(id) {
  const list = store.getState().courses.courses;
  return list.find((c) => c.id === Number(id)) || list[0];
}
