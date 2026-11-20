import { create } from "zustand";
import {
  getCourses as apiGetCourses,
  addCourse as apiAddCourse,
  updateCourse as apiUpdateCourse,
  deleteCourse as apiDeleteCourse,
} from "../services/api/coursesApi";

export const useCourseStore = create((set) => ({
  courses: [],
  loading: false,
  error: null,

  // READ
  fetchCourses: async () => {
    set({ loading: true, error: null });
    try {
      const data = await apiGetCourses();
      set({ courses: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // CREATE
  addCourse: async (course) => {
    const created = await apiAddCourse(course);
    set((s) => ({ courses: [...s.courses, created] }));
    return created;
  },

  // UPDATE
  editCourse: async (id, changes) => {
    const updated = await apiUpdateCourse(id, changes);
    set((s) => ({
      courses: s.courses.map((c) => (c.id === id ? updated : c)),
    }));
    return updated;
  },

  // DELETE
  removeCourse: async (id) => {
    await apiDeleteCourse(id);
    set((s) => ({ courses: s.courses.filter((c) => c.id !== id) }));
  },
}));
