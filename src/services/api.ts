import axios from "axios";

// O backend Express expõe /auth, /family e /locations diretamente (sem /api).
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

export function getApiErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message || error.message || fallback;
  }
  return error instanceof Error ? error.message : fallback;
}

export default api;
