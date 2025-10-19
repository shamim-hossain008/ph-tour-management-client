
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5070/api/v1" }),
  endpoints:() =>({})
});