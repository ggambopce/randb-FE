import axios from "axios";

export const API_SERVER_HOST = 'http://localhost:8080'

const prefix = `${API_SERVER_HOST}/api` 

// 로컬 스토리지에서 JWT 토큰 가져오기
const getAuthToken = () => localStorage.getItem("authToken");

export const addProfile = async(profileData, file) => {
    const token = getAuthToken();

    // FormData 객체 생성
  const formData = new FormData();

  // JSON 데이터를 문자열로 변환하여 추가
  formData.append("profileAddRequest", JSON.stringify(profileData));

  // 파일 추가
  formData.append("multipartFile", file);

    // 서버 요청
  const res = await axios.post(
    `${prefix}/user/profiles`, 
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`, // 인증 토큰 헤더 추가
        "Content-Type": "multipart/form-data", // Content-Type 설정
      },
    }
  );

  return res.data; // 서버 응답 데이터 반환

}

export const getOneProfile = async(id) => {

    const res = await axios.get(`${prefix}/user/profiles/${id}`);
    return res.data; // 서버 응답 데이터 반환
}



