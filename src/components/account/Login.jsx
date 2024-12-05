import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../slices/loginSlice";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";
import SocialLoginButtons from "../SocialLoginButtons";
import { getUserInfo } from "../../api/memberApi";
import axios from "axios";

const Login = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const location = useLocation();


    // 일반 로그인 처리
    const handleLogin = async (event) => {
        event.preventDefault();
        const loginData = {
            loginId: event.target.loginId.value,
            password: event.target.password.value,
        };

        try {
            // 로그인 요청
            const response = await axios.post(
                "http://localhost:8080/api/login",
                loginData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true, // 쿠키 포함
                }
            );

            // JWT AccessToken 가져오기
            const accessToken = response.data.data.accessToken;

            // JWT AccessToken을 로컬스토리지에 저장
            localStorage.setItem("authToken", accessToken);
            console.log("JWT AccessToken이 로컬스토리지에 저장되었습니다:", accessToken);
    
            // 사용자 정보 요청
            const user = await getUserInfo(); // getUserInfo 함수 재사용

            // Redux 상태 업데이트
            dispatch(login({ user }));

            alert("로그인 성공!");
            nav("/", { replace: true });
        } catch (error) {
            console.error("로그인 에러:", error);
            alert("로그인에 실패했습니다.");
        }
    };

    return (
        <div className="LoginContainer">
            <div className="LoginHeader">
                <h1>RED & BLUE</h1>
                <p>찬반토론에 로그인하세요</p>
            </div>
            <form onSubmit={handleLogin} className="LoginForm">
                <input name="loginId" placeholder="아이디" required />
                <input name="password" placeholder="비밀번호" type="password" required />
                <button type="submit">로그인</button>
            </form>
            <h2 className="OrText">또는</h2>
            <SocialLoginButtons />
        </div>
    );
};

export default Login;
