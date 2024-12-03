import { useDispatch } from "react-redux";
import { login } from "../../slices/loginSlice";
import { replace, useNavigate } from "react-router-dom";
import "./Login.css";
import SocialLoginButtons from "../SocialLoginButtons";
import axios from "axios";


const Login = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        const loginData = {
            loginId: event.target.loginId.value,
            password: event.target.password.value,
        };

        try {
            const response = await axios.post(
                "http://localhost:8080/api/login", 
                loginData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true, // 쿠키를 포함하는 요청
                }
            );

            const { accessToken, user } = response.data.data;

            // Redux 상태 업데이트
            dispatch(login({ user, accessToken }));

            // Local Storage에 Access Token 저장
            localStorage.setItem("authToken", accessToken);

            alert("로그인 성공!");
            nav("/", {replace:true});

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