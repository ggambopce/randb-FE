import { useDispatch } from "react-redux";
import { login } from "../slices/loginSlice";
import "../components/Login.css";
const Login = () => {
    const dispatch = useDispatch();

    const handleLogin = async (event) => {
        event.preventDefault();
        const loginData = {
            loginId: event.target.loginId.value,
            password: event.target.password.value,
        };

        try {
            const response = await fetch("http://localhost:8080/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            });

            if (!response.ok) {
                throw new Error("로그인 실패");
            }

            const data = await response.json();
            const { accessToken, user } = data.data;

            // Redux 상태 업데이트
            dispatch(login({ user, accessToken }));

            // Local Storage에 Access Token 저장
            localStorage.setItem("accessToken", accessToken);

            alert("로그인 성공!");
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
        </div>
    );
};

export default Login;