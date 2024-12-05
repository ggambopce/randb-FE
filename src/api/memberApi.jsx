import axios from "axios";

export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api`;

export const getUserInfo = async () => { // 일반로그인, 소셜로그인 통합처리
  try {
    const response = await axios.post(
      `${prefix}/userinfo`,
      {},
      {
        withCredentials: true, // 쿠키 포함
      }
    );
    return response.data.data; // 사용자 정보 반환
  } catch (error) {
    console.error("getUserInfo 호출 실패:", error);
    throw error;
  }
};
