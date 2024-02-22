import axios from "axios";
const backendPath = process.env.REACT_APP_BACKEND_PATH;

const axiosInstance = axios.create({
    baseURL: backendPath,
    withCredentials: true,
  });

  export  default axiosInstance