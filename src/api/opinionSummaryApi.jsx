import axios from "axios";

export const API_SERVER_HOST = 'http://localhost:8080'

const prefix = `${API_SERVER_HOST}/api` 

// 로컬 스토리지에서 JWT 토큰 가져오기
const getAuthToken = () => localStorage.getItem("authToken");

/**
 * 의견 요약 API 호출 함수
 * @param {number} postId - 요약하려는 토론글의 ID
 * @returns {Promise<Object>} 요약된 RED와 BLUE 의견을 포함한 데이터
 */
export const getOpinionSummary = async (postId) => {
  try {
    const res = await axios.get(`${prefix}/opinions/summary`, {
      params: { postId }, // 쿼리 파라미터 전달
    });
    return res.data; // API에서 받은 데이터 반환
  } catch (error) {
    console.error("의견 요약 데이터를 가져오는 중 오류 발생:", error);
    throw error; // 오류를 호출한 쪽에서 처리할 수 있도록 throw
  }
};
