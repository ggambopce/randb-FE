import axios from "axios"

export const API_SERVER_HOST = import.meta.env.VITE_API_BASE_URL || "https://jinorandb.com";
const prefix = `${API_SERVER_HOST}/api`

// 이메일 인증 코드 발송 API
export const sendVerificationCodeApi = async (email) => {
    const res = await axios.post(`${prefix}/signup/email-confirmation`, null, {
        params: { email },
    });
    return res.data;
};

// 이메일 인증 코드 확인 API
export const verifyEmailCodeApi = async (email, code) => {
    const res = await axios.post(`${prefix}/signup/email-confirmation/verify`, {
        email,
        code,
    });
    return res.data;
};

// 회원가입 API
export const signUpApi = async (signupData) => {
    const res = await axios.post(`${prefix}/signup`, signupData, {
        withCredentials: true,
    });
    return res.data;
};