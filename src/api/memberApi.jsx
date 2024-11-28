import axios from "axios"


export const API_SERVER_HOST = 'http://localhost:8080'

const prefix = `${API_SERVER_HOST}/api` 

// 유저 정보 가져오기
export const getUserInfo = async (token) => {
    const res = await axios.post(`${prefix}/userinfo`, null, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
}
