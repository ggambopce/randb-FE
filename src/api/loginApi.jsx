import axios from "axios"


export const API_SERVER_HOST = 'http://localhost:8080'

const prefix = `${API_SERVER_HOST}/api`

// **로그인/로그아웃 API**
export const login = async (credentials) => {
    const res = await axios.post(`${prefix}/login`, credentials, {
      withCredentials: true,
    });
  
    return res.data;
  };
  
  export const logoutApi = async (accountId) => {
    const res = await axios.post(
      `${prefix}/logout`,
      { "account-id": accountId },
      { withCredentials: true }
    );
  
    return res.data;
  };