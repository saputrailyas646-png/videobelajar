import axiosClient from "./axiosClient";
import { IMAGES } from "../../assets/utils/courseData";

const ENDPOINT = "/courses";

// API -> bentuk yang dipakai aplikasi
// - id dari mockapi berupa teks ("3"), diubah jadi angka supaya kode lama (c.id === id) tetap jalan
// - gambar bawaan dipulihkan dari imageKey / avatarKey; foto upload (data URL) dipakai apa adanya
const fromApi = (item) => ({
  ...item,
  id: Number(item.id),
  image: IMAGES[item.imageKey] ?? item.image,
  avatar: IMAGES[item.avatarKey] ?? item.avatar,
});

// Aplikasi -> yang dikirim ke API
// - id dibuat oleh mockapi, jadi tidak dikirim
// - gambar bawaan cukup dikirim key-nya
const toApi = (course) => {
  const { id, ...body } = course;
  if (body.imageKey) delete body.image;
  if (body.avatarKey) delete body.avatar;
  return body;
};

// GET semua kursus
export const getCourses = async () => {
  const { data } = await axiosClient.get(ENDPOINT);
  return data.map(fromApi);
};

// GET satu kursus
export const getCourseById = async (id) => {
  const { data } = await axiosClient.get(`${ENDPOINT}/${id}`);
  return fromApi(data);
};

// ADD kursus baru
export const addCourse = async (course) => {
  const { data } = await axiosClient.post(ENDPOINT, toApi(course));
  return fromApi(data);
};

// UPDATE kursus
export const updateCourse = async (id, course) => {
  const { data } = await axiosClient.put(`${ENDPOINT}/${id}`, toApi(course));
  return fromApi(data);
};

// DELETE kursus
export const deleteCourse = async (id) => {
  const { data } = await axiosClient.delete(`${ENDPOINT}/${id}`);
  return fromApi(data);
};
