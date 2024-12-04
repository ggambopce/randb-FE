import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SocialLoginRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // 현재 URL에서 토큰 추출
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get("access-token");

        if (accessToken) {
            // 토큰 저장
            localStorage.setItem("accessToken", accessToken);

            // 메인 페이지로 리디렉션
            navigate("/main");
        } else {
            // 에러 처리
            alert("로그인에 실패했습니다.");
            navigate("/login");
        }
    }, [navigate]);

    return <div>소셜 로그인 처리 중...</div>;
};

export default SocialLoginRedirect;
