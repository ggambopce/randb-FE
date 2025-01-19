import React, { useState } from "react";
import { sendVerificationCodeApi, verifyEmailCodeApi, signUpApi } from "../../api/signUpAPi";
import "./Signup.css"

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        loginId: "",
        email: "",
        password: "",
        passwordRe: "",
        code: 0, // 
    });

    const [error, setError] = useState("");
    const [isCodeSent, setIsCodeSent] = useState(false); // 인증코드 전송 여부
    const [isEmailVerified, setIsEmailVerified] = useState(false); // 이메일 인증 완료 여부

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // 이메일 인증 코드 전송
    const sendVerificationCode = async () => {
        try {
            await sendVerificationCodeApi(formData.email);
            setIsCodeSent(true);
            alert("인증 코드가 발송되었습니다. 이메일을 확인해주세요.");
        } catch (err) {
            setError(err.response?.data?.message || "인증 코드 발송 실패");
        }
    };

    // 이메일 인증 코드 확인
    const verifyEmailCode = async () => {
        try {
            const res = await verifyEmailCodeApi(formData.email, formData.code);
            if (res.data.isVerified) {
                setIsEmailVerified(true);
                alert("이메일 인증이 완료되었습니다.");
            } else {
                throw new Error("인증 코드가 일치하지 않습니다.");
            }
        } catch (err) {
            setError(err.response?.data?.message || "인증 실패");
        }
    };

     // 회원가입 처리
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // 이메일 인증
        if (!isEmailVerified) {
            setError("이메일 인증을 완료해주세요.");
            return;
        }

        // 비밀번호 확인
        if (formData.password !== formData.passwordRe) {
            setError("비밀번호가 일치하지 않습니다.");
            return;
        }

        const signupData = {
            username: formData.username,
            loginId: formData.loginId,
            email: formData.email,
            password: formData.password,
            passwordRe: formData.passwordRe,
            code: parseInt(formData.code, 10), // code를 숫자로 변환
        };

        try {
            await signUpApi(signupData);
            alert("회원가입 성공!");
            setFormData({
                username: "",
                loginId: "",
                email: "",
                password: "",
                passwordRe: "",
                code: 0,
            });
        } catch (err) {
            setError(err.response?.data?.message || "회원가입 실패");
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
                    <button type="button" onClick={sendVerificationCode} disabled={isCodeSent}>
                        인증 코드 발송
                    </button>
                </div>
                {isCodeSent && (
                    <div>
                        <label>인증 코드</label>
                        <input
                            type="text"
                            name="code"
                            value={formData.code}
                            onChange={handleChange}
                            required
                            placeholder="인증 코드를 입력하세요"
                        />
                        <button type="button" onClick={verifyEmailCode}>
                            인증 코드 확인
                        </button>
                    </div>
                )}
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
                        name="passwordRe"
                        value={formData.passwordRe}
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
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
};

export default Signup;
