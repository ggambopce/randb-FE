import React, { useEffect } from "react";
import "./SocialLoginButtons.css";

const SocialLoginButtons = () => {
    const GOOGLE_AUTH_URL = "https://jinorandb.com/oauth2/authorization/google";
    const NAVER_AUTH_URL = "https://jinorandb.com/oauth2/authorization/naver";


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
