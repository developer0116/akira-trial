import axios from "axios";

const API = (opts = {}, optsHeader = {}) => {
  /*
  |--------------------------------------------------
  | Custom axios api
  |--------------------------------------------------
  */
  const token = localStorage.getItem("jwt");

  const defaultOptions = {
    ...opts,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      ...optsHeader,
    },
    mode: "cors",
    credentials: "same-origin",
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  const baseURL = "http://localhost:8080";
  const axiosApi = axios.create({
    baseURL,
    ...defaultOptions,
  });

  axiosApi.interceptors.response.use(undefined, (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("jwt");
      if (window.location.pathname !== "/") {
        window.location.href = `/?redirect=${window.location.href}`;
      }
    }
    return Promise.reject(error);
  });

  return axiosApi;
};

export { API };
