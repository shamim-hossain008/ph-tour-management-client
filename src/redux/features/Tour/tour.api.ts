import { baseApi } from "@/redux/baseApi";

export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    AddTourType: builder.mutation({
      query: (tourTypeName) => ({
        url: "/tour/create-tour-type",
        method: "POST",
        data: tourTypeName,
      }),
    }),
    // get all tour types
    getTourType: builder.query({
      query: () => ({
        url: "/tour/tour-types",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useGetTourTypeQuery, useAddTourTypeMutation } = tourApi;
