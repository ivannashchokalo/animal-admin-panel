import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

//api.interceptors.response.use(successFn, errorFn)

api.interceptors.response.use(
  (response) => response, // якщо все добре, повертаємо відповідь

  async (error) => {
    const originalRequest = error.config; // оригінальний запит, який впав

    if (error.response?.status === 401) {
      try {
        await api.post("/auth/refresh");

        console.log("refreshed ");

        return api(originalRequest);
      } catch (error) {
        window.location.href = "/sign-in";
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);
