import React, { useState } from "react";
import "./Signup.css"

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        loginId: "",
        email: "",
        password: "",
        confirmPassword: "",
        loginType: "DEFAULT", // 기본 로그인 타입
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // 비밀번호 확인
        if (formData.password !== formData.confirmPassword) {
            setError("비밀번호가 일치하지 않습니다.");
            return;
        }

        const signupData = {
            username: formData.username,
            loginId: formData.loginId,
            email: formData.email,
            password: formData.password,
            login_type: formData.loginType,
            join_date: new Date().toISOString().split("T")[0], // 가입 날짜
        };

        try {
            const response = await fetch("http://localhost:8080/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(signupData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "회원가입 실패");
            }

            alert("회원가입 성공!");
            setFormData({
                username: "",
                loginId: "",
                email: "",
                password: "",
                confirmPassword: "",
                loginType: "DEFAULT",
            });
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="Signup">
            <div className="SignupHeader">
                <h2>RED & BLUE 찬반토론</h2>
                <p>토론에 참여하려면 회원가입을 완료하세요!</p>
            </div>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit} className="SignupForm">
                <div>
                    <label>아이디</label>
                    <input
                        type="text"
                        name="loginId"
                        value={formData.loginId}
                        onChange={handleChange}
                        required
                        placeholder="아이디를 입력하세요"
                    />
                </div>
                <div>
                    <label>이메일</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="이메일을 입력하세요"
                    />
                </div>
                <div>
                    <label>비밀번호</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="비밀번호를 입력하세요"
                    />
                </div>
                <div>
                    <label>비밀번호 확인</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        placeholder="비밀번호를 다시 입력하세요"
                    />
                </div>
                <div>
                    <label>이름</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        placeholder="이름을 입력하세요"
                    />
                </div>
                <div>
                    <label>로그인 타입</label>
                    <select
                        name="loginType"
                        value={formData.loginType}
                        onChange={handleChange}
                    >
                        <option value="DEFAULT">일반 로그인</option>
                    </select>
                </div>
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
};

export default Signup;
