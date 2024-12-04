import axios from "axios";

// Axios 인스턴스 생성
const apiClient = axios.create({
    baseURL: "http://localhost:8080/api",
    withCredentials: true,
});

// 요청 인터셉터
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default apiClient;
