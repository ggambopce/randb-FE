import axios from "axios"


export const API_SERVER_HOST = 'http://localhost:8080'

const prefix = `${API_SERVER_HOST}/api`

// **로그인/로그아웃 API**
export const login = async (credentials) => {
    try {
      const res = await axios.post(`${prefix}/login`, credentials, {
        withCredentials: true, // 쿠키 사용 설정
      });
  
      const token = res.data.data.accessToken; // 서버에서 받은 토큰
      if (token) {
        localStorage.setItem("authToken", token); // 로컬 스토리지에 토큰 저장
        console.log("로그인 성공 및 토큰 저장:", token);
      } else {
        console.error("로그인 응답에 토큰이 없습니다.");
        throw new Error("토큰이 제공되지 않았습니다.");
      }
  
      return res.data;
    } catch (err) {
      console.error("로그인 실패:", err);
      throw err;
    }
  };
  
  export const logoutApi = async (accountId) => {
    const res = await axios.post(
      `${prefix}/logout`,
      { "account-id": accountId },
      { withCredentials: true }
    );
  
    return res.data;
  };