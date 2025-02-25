import axios from "axios";
import { extractJwtToken } from "../util/JwtToken";

console.log("🚀 VITE_API_BASE_URL:", import.meta.env.VITE_API_BASE_URL);

export const API_SERVER_HOST = import.meta.env.VITE_API_BASE_URL;
const prefix = `${API_SERVER_HOST}/api`;

export const getUserInfo = async () => { // 일반로그인, 소셜로그인 통합처리
  const token = extractJwtToken(); // JWT 토큰 추출

  if (!token) {
    console.error("JWT 토큰이 없습니다.");
    throw new Error("로그인되지 않은 상태입니다.");
  }

  try {
    const response = await axios.post(
      `${prefix}/userinfo`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, // JWT 토큰 추가
        },
        withCredentials: true, // 쿠키 포함
      }
    );
    return response.data.data; // 사용자 정보 반환
  } catch (error) {
    console.error("getUserInfo 호출 실패:", error);
    throw error;
  }
};
