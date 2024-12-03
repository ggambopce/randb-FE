import axios from "axios"


export const API_SERVER_HOST = 'http://localhost:8080'

const prefix = `${API_SERVER_HOST}/api`

export const login = async (credentials) => {
    const res = await axios.post(`${prefix}/login`, credentials, {
      withCredentials: true,
    });
  
    const { accessToken, user } = res.data.data;
    if (accessToken) {
      localStorage.setItem("authToken", accessToken); // 토큰 저장
    }
    return { accessToken, user };
  };
  
  export const logoutApi = async () => {
    const res = await axios.post(`${prefix}/logout`, null, {
      withCredentials: true,
    });
    return res.data;
  };