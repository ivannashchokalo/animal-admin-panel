import { baseApi } from "./api";

export const requestsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRequests: builder.query({
      query: () => "/requests",
      providesTags: ["Requests"],
    }),
    updateRequest: builder.mutation({
      query: ({ _id, ...data }) => ({
        url: `/requests/${_id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Requests"],
    }),

    deleteRequest: builder.mutation({
      query: (id) => ({
        url: `/requests/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Requests"],
    }),
  }),
});

export const {
  useGetRequestsQuery,
  useUpdateRequestMutation,
  useDeleteRequestMutation,
} = requestsApi;
