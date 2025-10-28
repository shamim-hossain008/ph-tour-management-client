import { baseApi } from "@/redux/baseApi";

export const divisionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    AddDivision: builder.mutation({
      query: (divisionData) => ({
        url: "/division/create",
        method: "POST",
        data: divisionData,
      }),
    }),
    //  invalidatesTags: ["DIVISION"],
  }),
});

export const { useAddDivisionMutation } = divisionApi;
