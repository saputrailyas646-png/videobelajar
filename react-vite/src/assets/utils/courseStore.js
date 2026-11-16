import { courseData, IMAGES } from "./courseData";

const KEY = "videobelajar_courses";

const withImages = (c) => ({
  ...c,
  image: IMAGES[c.imageKey] ?? c.image,
  avatar: IMAGES[c.avatarKey] ?? c.avatar,
});

// READ
export function getCourses() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw).map(withImages);
  } catch {}
  return courseData.map(withImages);
}

export function saveCourses(courses) {
  try {
    const plain = courses.map(({ image, avatar, ...rest }) => rest);
    localStorage.setItem(KEY, JSON.stringify(plain));
  } catch {}
}

export function resetCourses() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
  return courseData.map(withImages);
}

// CREATE
export function createCourse(courses, data) {
  const nextId = courses.reduce((max, c) => Math.max(max, c.id), 0) + 1;
  return [...courses, withImages({ curriculum: [], ...data, id: nextId })];
}

// UPDATE
export function updateCourse(courses, id, changes) {
  return courses.map((c) =>
    c.id === id ? withImages({ ...c, ...changes }) : c,
  );
}

// DELETE
export function deleteCourse(courses, id) {
  return courses.filter((c) => c.id !== id);
}

// dipakai halaman info, metode, metode1, belajar
export function getCourseById(id) {
  const list = getCourses();
  return list.find((c) => c.id === Number(id)) || list[0];
}
