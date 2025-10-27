import { baseApi } from "@/redux/baseApi";

export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    AddTourType: builder.mutation({
      query: (tourTypeName) => ({
        url: "/tour/create-tour-type",
        method: "POST",
        data: tourTypeName,
      }),
      invalidatesTags: ["TOUR"],
    }),
    // Delete Tour type
    removeTourType: builder.mutation({
      query: (tourTypeId) => ({
        url: `/tour/tour-type/${tourTypeId}`,
        method: "DELETE",
      }),
    }),
    // get all tour types
    getTourType: builder.query({
      query: () => ({
        url: "/tour/tour-types",
        method: "GET",
      }),
      providesTags: ["TOUR"],
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useGetTourTypeQuery,
  useAddTourTypeMutation,
  useRemoveTourTypeMutation,
} = tourApi;
