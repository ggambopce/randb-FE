import axios from "axios";

const prefix = "http://localhost:8080/api"; // API 기본 URL

// 로컬 스토리지에서 JWT 토큰 가져오기
const getAuthToken = () => localStorage.getItem("authToken");

export const getOpinions = async (postId) => {
  const token = getAuthToken();
    const res = await axios.get(
        `${prefix}/user/opinions?postId=${postId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return res.data;
};

// 의견 추가하기
export const addOpinion = async (opinionData) => {
  const token = getAuthToken();
  const res = await axios.post(
      `${prefix}/user/opinions`,
      opinionData,
      {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      }
  );
  return res.data;
};

// 의견 수정하기
export const updateOpinion = async (id, opinionData) => {
  const token = getAuthToken();
  const res = await axios.post(
      `${prefix}/user/opinions/${id}`,
      opinionData,
      {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      }
  );
  return res.data;
};

// 의견 삭제하기
export const deleteOpinion = async (id) => {
  const token = getAuthToken();
  const res = await axios.delete(
      `${prefix}/user/opinions/${id}`,
      {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      }
  );
  return res.data;
};