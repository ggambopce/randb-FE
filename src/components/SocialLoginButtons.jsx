import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../slices/loginSlice";
import axios from "axios";
import "./SocialLoginButtons.css";

const SocialLoginButtons = () => {
    const GOOGLE_AUTH_URL = "http://localhost:8080/oauth2/authorization/google";
    const NAVER_AUTH_URL = "http://localhost:8080/oauth2/authorization/naver";
    const dispatch = useDispatch();
    const nav = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleSocialLoginRedirect = async () => {
            const params = new URLSearchParams(location.search);
            const accessToken = params.get("access-token");

            if (accessToken) {
                try {
                    // 사용자 정보 요청
                    const userInfoResponse = await axios.post(
                        "http://localhost:8080/api/userinfo",
                        null,
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            },
                            withCredentials: true,
                        }
                    );

                    const user = userInfoResponse.data.data;

                    // Redux 상태 업데이트
                    dispatch(login({ user, accessToken }));

                    alert("소셜 로그인 성공!");
                    nav("/", { replace: true });
                } catch (error) {
                    console.error("소셜 로그인 에러:", error);
                    alert("소셜 로그인에 실패했습니다.");
                }
            }
        };

        handleSocialLoginRedirect();
    }, [location.search, dispatch, nav]);

    return (
        <div className="SocialLoginButtons">
            <button
                className="GoogleLoginButton"
                onClick={() => (window.location.href = GOOGLE_AUTH_URL)}
            >
                Google로 로그인
            </button>
            <button
                className="NaverLoginButton"
                onClick={() => (window.location.href = NAVER_AUTH_URL)}
            >
                Naver로 로그인
            </button>
        </div>
    );
};

export default SocialLoginButtons;
