// імпортуємо базовий API
import { baseApi } from "./api";

// "розширюємо" api новими endpoints
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      // mutation = зміна даних (POST, PATCH, DELETE)
      query: (data) => ({
        url: "/auth/login", // endpoint
        method: "POST", // HTTP метод
        body: data, // тіло запиту (email, password)
      }),

      // після логіну кеш auth застаріває → треба оновити
      invalidatesTags: ["Auth"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),

      invalidatesTags: ["Auth"],
    }),

    checkAuth: builder.query({
      // query = отримання даних (GET)
      query: () => "/auth/is-authenticated",

      providesTags: ["Auth"],
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useCheckAuthQuery } =
  authApi;

// import { fetchBaseQuery } from "@reduxjs/toolkit/query";
// import { createApi } from "@reduxjs/toolkit/query/react";

// const baseQuery = fetchBaseQuery({
//   baseUrl: "http://localhost:3000",
//   credentials: "include",
// });

// export const authApi = createApi({
//   reducerPath: "auth",

//   baseQuery,

//   endpoints: (builder) => ({
//     login: builder.mutation({
//       query: (data) => ({
//         url: "/auth/login",
//         method: "POST",
//         body: data,
//       }),
//     }),

//     logout: builder.mutation<void, void>({
//       query: () => ({
//         url: "/auth/logout",
//         method: "POST",
//       }),
//     }),

//     checkAuth: builder.query<{ isAuthenticated: boolean }, void>({
//       query: () => ({
//         url: "/auth/is-authenticated",
//         method: "GET",
//       }),
//     }),
//   }),
// });

// export const { useLoginMutation, useLogoutMutation, useCheckAuthQuery } =
//   authApi;
