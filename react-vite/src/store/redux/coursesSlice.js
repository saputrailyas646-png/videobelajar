import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCourses as apiGetCourses,
  addCourse as apiAddCourse,
  updateCourse as apiUpdateCourse,
  deleteCourse as apiDeleteCourse,
} from "../../services/api/coursesApi";

// READ
export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async () => {
    return await apiGetCourses();
  },
);

// CREATE
export const addCourse = createAsyncThunk(
  "courses/addCourse",
  async (course) => {
    return await apiAddCourse(course);
  },
);

// UPDATE
export const editCourse = createAsyncThunk(
  "courses/editCourse",
  async ({ id, changes }) => {
    return await apiUpdateCourse(id, changes);
  },
);

// DELETE
export const removeCourse = createAsyncThunk(
  "courses/removeCourse",
  async (id) => {
    await apiDeleteCourse(id);
    return id;
  },
);

const initialState = {
  courses: [], // state awal: array kosong, nanti diisi data API
  loading: false,
  error: null,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
        state.loading = false;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      // ADD
      .addCase(addCourse.fulfilled, (state, action) => {
        state.courses.push(action.payload);
      })
      // UPDATE
      .addCase(editCourse.fulfilled, (state, action) => {
        state.courses = state.courses.map((c) =>
          c.id === action.payload.id ? action.payload : c,
        );
      })
      // DELETE
      .addCase(removeCourse.fulfilled, (state, action) => {
        state.courses = state.courses.filter((c) => c.id !== action.payload);
      });
  },
});

export default coursesSlice.reducer;
