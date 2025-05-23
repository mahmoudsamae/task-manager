import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;


const axiosClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});


export default axiosClient;