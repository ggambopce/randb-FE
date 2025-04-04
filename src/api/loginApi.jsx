import axios from "axios"


export const API_SERVER_HOST = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const prefix = `${API_SERVER_HOST}/api`

export const login = async (credentials) => {
    const res = await axios.post(`${prefix}/login`, credentials, {
      withCredentials: true,
    });
  
    const { accessToken } = res.data.data;
  
    return { accessToken };
  };
  
  export const logoutApi = async (accountId) => {
    const res = await axios.post(
        `${prefix}/logout`,
        { "account-id": accountId }, // account-id 전달
        {
            withCredentials: true,
        }
    );
    return res.data;
};