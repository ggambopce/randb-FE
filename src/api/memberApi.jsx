import axios from "axios"


export const API_SERVER_HOST = 'http://localhost:8080'

const prefix = `${API_SERVER_HOST}/api` 

// 유저 정보 가져오기
export const getUserInfo = async (token) => {
    try {
        const res = await axios.post(`${prefix}/userinfo`, null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        // 응답 형식에 맞춰 데이터 반환
        return res.data.data; // `data` 객체 내부의 `data` 반환
    } catch (err) {
        console.error("유저 정보 요청 실패:", err.response?.data || err.message);
        throw err; // 오류를 호출자에게 전달
    }
}

