import axios from "axios";

const API = axios.create({
   baseURL: import.meta.env.VITE_API_URL,
});

/* 🔐 ATTACH JWT AUTOMATICALLY */
/* 🔐 ATTACH JWT */
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});
/* 🚨 RESPONSE HANDLING (FIXED) */
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url || "";

    // ❌ DO NOT LOGOUT ON UPLOAD FAIL
    if (url.includes("/users/upload-profile")) {
      return Promise.reject(error);
    }

    // ✅ Logout ONLY if session truly expired
    if (status === 401) {
      localStorage.removeItem("user");
      window.location.href = "/profile";
    }

    return Promise.reject(error);
  }
);

/* APIs */
export const getCurrentUser = () => API.get("/users/me");

/* ===== AUTH ===== */
export const login = (data) => API.post("/auth/login", data);
export const signup = (data) => API.post("/auth/signup", data);

/* ===== CURRENT USER ===== */

/* ===== PROFILE IMAGE ===== */
export const uploadProfileImage = (formData) =>
  API.post("/users/upload-profile", formData);

/* ===== CROPS ===== */
export const getCrops = () => API.get("/crops");
export const addNewCrop = (data) => API.post("/crops", data);
export const getRecommendations = (soil, season) =>
  API.get("/crops/recommend", { params: { soil, season } });

/* ===== SOIL ===== */
export const getSoils = () => API.get("/soil");
export const getCropsBySoil = (soilType) =>
  API.get(`/soil/${soilType}`);

/* ===== EXPENSE ===== */
export const updateExpense = (data) =>
  API.put("/expenses/update", data);

export const getExpenseHistory = (cropName) =>
  API.get(`/expenses/history/${cropName}`);

export default API;
