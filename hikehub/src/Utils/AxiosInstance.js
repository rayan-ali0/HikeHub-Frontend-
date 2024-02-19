import axios from "axios";
const backendPath = process.env.BACKEND_PATH;

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/",
  });

  export  default axiosInstance