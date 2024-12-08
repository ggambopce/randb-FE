import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { logoutApi } from "../api/loginApi";
import { login, logout } from "../slices/loginSlice";
import { extractJwtToken } from "../util/JwtToken";

import { getUserInfo } from "../api/memberApi";

import Header from "../components/Header";
import Button from "../components/Button";
import PostList from "../components/post/PostList";
import axios from "axios";

const Home = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const { isLoggedIn, user } = useSelector((state) => state.loginSlice);


     // 사용자 정보 요청 및 상태 업데이트
     const fetchUserInfo = async () => {
        try {
            const token = extractJwtToken(); // 파라미터 또는 로컬스토리지에서 JWT 추출
            if (!token) {
                console.warn("JWT 토큰이 없습니다. 사용자 정보 요청을 생략합니다.");
                return; // 사용자 정보 요청 생략
            }

            // 사용자 정보 요청
            const userInfo = await getUserInfo(token);

            // Redux 상태 업데이트
            dispatch(login({ user: userInfo }));
        } catch (error) {
            console.error("사용자 정보 요청 실패:", error);
            alert("사용자 정보를 불러오지 못했습니다. 다시 로그인해주세요.");
            dispatch(logout());
        }
    };

    // 사용자 정보 복원
    useEffect(() => {
        if (!isLoggedIn) {
            fetchUserInfo(); // 사용자 정보 요청
        }
    }, [isLoggedIn, dispatch, nav]);

    // 로그아웃 처리
    const handleLogout = async () => {
        try {
            if (user?.id) {
                // 로그아웃 API 호출
                const response = await logoutApi(user.id);
    
                // Redux 상태 초기화
                dispatch(logout());
    
                // 로컬 스토리지 초기화
                localStorage.removeItem("authToken");
    
                // 서버 응답 메시지 확인 후 알림
                alert(response.data || "로그아웃되었습니다.");
                nav("/login", { replace: true }); // 로그인 페이지로 리디렉션
            } else {
                alert("로그아웃할 사용자가 없습니다.");
            }
        } catch (error) {
            console.error("로그아웃 실패:", error.response?.data || error.message);
            alert("로그아웃에 실패했습니다.");
        }
    };

    return (
        <div>
            <Header
                title={"RED & BLUE 찬반토론"}
                rightChild={
                    isLoggedIn ? (
                        <div>
                            <span>{user?.username} 회원님</span>
                            <Button text={"로그아웃"} onClick={handleLogout} />
                        </div>
                    ) : (
                        <div style={{ display: "flex", gap: "5px" }}>
                            <Button text={"회원가입"} onClick={() => nav("/join")} />
                            <Button text={"로그인"} onClick={() => nav("/login")} />
                        </div>
                    )
                }
            />
            {/* PostList에서 데이터 직접 가져오기 */}
            <PostList />
        </div>
    );
};


export default Home;  