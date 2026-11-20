import axios from "axios";

// URL dasar disimpan di file .env (VITE_API_BASE_URL), bukan ditulis langsung di kode
const baseURL = import.meta.env.VITE_API_BASE_URL;

if (!baseURL) {
  console.error(
    "VITE_API_BASE_URL belum diisi. Buat file .env di root proyek lalu restart npm run dev.",
  );
}

const axiosClient = axios.create({
  baseURL,
  timeout: 15000,
});

// Interceptor request: catat setiap panggilan API (hanya saat development)
axiosClient.interceptors.request.use((config) => {
  if (import.meta.env.DEV) {
    console.log(
      `[API] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`,
    );
  }
  return config;
});

// Interceptor response: satukan pesan error, halaman tinggal menampilkan error.userMessage
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      error.userMessage = `Server menolak permintaan (kode ${error.response.status}).`;
    } else if (error.code === "ECONNABORTED") {
      error.userMessage = "Server terlalu lama merespons. Coba lagi.";
    } else {
      error.userMessage =
        "Tidak bisa terhubung ke server. Cek koneksi internet.";
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
