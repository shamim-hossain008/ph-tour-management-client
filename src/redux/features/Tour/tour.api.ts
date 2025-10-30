import { baseApi } from "@/redux/baseApi";
import type { IResponse, ITourPackage } from "@/types";

export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create tour
    addTour: builder.mutation({
      query: (tourData) => ({
        url: "/tour/create",
        method: "POST",
        data: tourData,
      }),
      invalidatesTags: ["TOUR"],
    }),

    // create tour type
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
        url: `/tour/tour-types/${tourTypeId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TOUR"],
    }),
    // get all tour types
    getTourType: builder.query({
      query: (params) => ({
        url: "/tour/tour-types",
        method: "GET",
        params,
      }),
      providesTags: ["TOUR"],
      transformResponse: (response) => response.data,
    }),
    // Get all tours
    getAllTours: builder.query<ITourPackage[], unknown>({
      query: (params) => ({
        url: "/tour",
        method: "GET",
        params: params,
      }),
      providesTags: ["TOUR"],
      transformResponse: (response: IResponse<ITourPackage[]>) => response.data,
    }),
  }),
});

export const {
  useGetTourTypeQuery,
  useAddTourTypeMutation,
  useRemoveTourTypeMutation,
  useAddTourMutation,
  useGetAllToursQuery,
} = tourApi;
