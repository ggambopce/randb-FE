import axios from "axios";

export const API_SERVER_HOST = import.meta.env.VITE_API_BASE_URL || "https://jinorandb.com";
const prefix = `${API_SERVER_HOST}/api`;

const axiosInstance = axios.create({
    baseURL: prefix,
    withCredentials: true,
});

export default axiosInstance;
