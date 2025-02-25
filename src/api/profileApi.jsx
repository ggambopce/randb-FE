import axios from "axios";

export const API_SERVER_HOST = import.meta.env.VITE_API_BASE_URL;

const prefix = `${API_SERVER_HOST}/api` 

// 로컬 스토리지에서 JWT 토큰 가져오기
const getAuthToken = () => localStorage.getItem("authToken");

export const addProfile = async(profileData, file) => {
    const token = getAuthToken();

    // FormData 객체 생성
  const formData = new FormData();

  // JSON 데이터를 문자열로 변환하여 추가 (Postman과 동일한 형식)
  formData.append("profileAddRequest", JSON.stringify(profileData));

  // 파일이 있을 경우에만 추가
  if (file) {
    formData.append("multipartFile", file);
  }
  //  디버깅용 FormData 로그 출력
  console.log(" FormData 확인:");
  for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
  }

  try {
      // 서버 요청
      const res = await axios.post(
          `${prefix}/user/profiles`,
          formData,
          {
              headers: {
                  Authorization: `Bearer ${token}`, // 인증 토큰 추가
                  // "Content-Type": "multipart/form-data"는 자동 설정됨
              },
          }
      );

      return res.data; // 서버 응답 데이터 반환
  } catch (error) {
      console.error("Failed to create new profile:", error.response?.data || error.message);
      throw error;
  }

}

export const getOneProfile = async(id) => {

    const res = await axios.get(`${prefix}/user/profiles/${id}`);
    return res.data; // 서버 응답 데이터 반환
}



