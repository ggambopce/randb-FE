import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutApi } from "../api/loginApi";
import { logout } from "../slices/loginSlice";

import useLoginInfo from "../hooks/useLoginInfo";

import Header from "../components/Header";
import Button from "../components/Button";
import PostList from "../components/post/PostList";

const Home = () => {
    useLoginInfo(); // 로그인 상태 복원
    const dispatch = useDispatch();
    const nav = useNavigate();
    const { isLoggedIn, user } = useSelector((state) => state.loginSlice);

    // 로그아웃 처리
    const handleLogout = async () => {
        try {
            if (user?.id) {
                // 로그아웃 API 호출
                await logoutApi(user.id);
    
                // Redux 상태 초기화
                dispatch(logout());
    
                // 로컬 스토리지 초기화
                localStorage.removeItem("accessToken");
    
                alert("로그아웃되었습니다.");
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