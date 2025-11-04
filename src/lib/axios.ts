import config from "@/config";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: config.baseUrl,
  //   timeout: 1000,
  //   headers: { "X-Custom-Header": "foobar" },
  withCredentials: true,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (
      error.response.status === 500 &&
      error.response.data.message === "jwt expired"
    ) {
      console.log("Your token is expired");

      try {
        const res = await axiosInstance.post("/auth/refresh-token");
        console.log("New Token arrived", res);
      } catch (error) {
        console.error(error);
      }
    }

    // for everything
    return Promise.reject(error);
  }
);
