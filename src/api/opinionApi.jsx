import axios from "axios";

const prefix = "http://localhost:8080/api"; // API 기본 URL

export const getOpinions = async (postId) => {
  try {
    const res = await axios.get(`${prefix}/opinions`, {
      params: { postId }, // 쿼리 파라미터 전달
    });
    return res.data; // API에서 받은 전체 데이터를 반환
  } catch (error) {
    console.error("Opinions 데이터를 가져오는 중 오류 발생:", error);
    throw error; // 오류를 호출한 쪽에서 처리할 수 있도록 throw
  }
};
