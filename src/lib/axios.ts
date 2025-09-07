import axiosLib from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "";
export const axios = axiosLib.create({
  baseURL: API_BASE,
  withCredentials: true,
});

let isRefreshing = false;
let pending: Array<() => void> = [];

axios.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    if (!original || original._retry) throw err;

    if (err.response?.status === 401) {
      original._retry = true;

      if (isRefreshing) {
        await new Promise<void>((resolve) => pending.push(resolve));
        return axios(original);
      }

      isRefreshing = true;
      try {
        await axios.post("/api/auth/refresh");
        pending.forEach((r) => r());
        pending = [];
        return axios(original);
      } catch (e) {
        pending = [];
        throw e;
      } finally {
        isRefreshing = false;
      }
    }
    throw err;
  }
);
