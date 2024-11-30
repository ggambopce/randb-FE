import axios from "axios";

const prefix = "http://localhost:8080/api"; // API 기본 URL

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
