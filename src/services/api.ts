// імпортуємо createApi (створює API slice)
// і fetchBaseQuery (вбудований fetch для HTTP запитів)
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// базовий запит (аналог axios instance)
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000",
  credentials: "include",
});

//обгортка над baseQuery (аналог interceptor в axios)
const baseQueryWithReauth = async (args, api, extraOptions) => {
  // args - мої параметри запиту
  //   apі - доступ до Redux api.dispatch, api.getState
  //   extraOptions - майже не використовується

  // робимо звичайний запит
  let result = await baseQuery(args, api, extraOptions);

  // якщо сервер повернув 401 (не авторизований)
  if (result.error?.status === 401) {
    // пробуємо оновити токен (refresh)
    await baseQuery(
      {
        url: "/auth/refresh",
        method: "POST",
      },
      api,
      extraOptions,
    );

    // після refresh пробуємо ще раз той самий запит
    result = await baseQuery(args, api, extraOptions);
  }

  // повертаємо результат (або успіх, або помилку)
  return result;
};

// створюємо головний API slice
export const baseApi = createApi({
  // ключ у Redux store (state.api)
  reducerPath: "api",

  // використовуємо нашу кастомну логіку з refresh
  baseQuery: baseQueryWithReauth,

  // список тегів для кешування
  tagTypes: ["Auth", "Animals", "Requests"],

  // тут поки пусто — endpoints будемо додавати через injectEndpoints
  endpoints: () => ({}),
});

// import axios from "axios";

// export const api = axios.create({
//   baseURL: "http://localhost:3000",
//   withCredentials: true,
// });

// //api.interceptors.response.use(successFn, errorFn)

// api.interceptors.response.use(
//   (response) => response, // якщо все добре, повертаємо відповідь

//   async (error) => {
//     const originalRequest = error.config; // оригінальний запит, який впав

//     if (error.response?.status === 401) {
//       try {
//         await api.post("/auth/refresh");

//         console.log("refreshed ");

//         return api(originalRequest);
//       } catch (error) {
//         window.location.href = "/sign-in";
//         return Promise.reject(error);
//       }
//     }
//     return Promise.reject(error);
//   },
// );
