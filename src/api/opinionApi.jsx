import axios from "axios";

export const API_SERVER_HOST = import.meta.env.VITE_API_BASE_URL || "https://jinorandb.com";

const prefix = `${API_SERVER_HOST}/api`;

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
      `${prefix}/user/update/opinions/${id}`,
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