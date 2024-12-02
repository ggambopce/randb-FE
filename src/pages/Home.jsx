import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { replace, useNavigate } from "react-router-dom";
import { logoutApi } from "../api/loginApi";
import { logout } from "../slices/loginSlice";
import { PostStateContext } from "../App";

import Header from "../components/Header";
import Button from "../components/Button";
import PostList from "../components/post/PostList";

const Home = () => {
    const data = useContext(PostStateContext);
    const dispatch = useDispatch();
    const nav = useNavigate();
    const { isLoggedIn, user } = useSelector((state) => state.loginSlice);
    
    // 로그아웃 처리
    const handleLogout = async () => {
        try {
            if (user?.id) {
                // 로그아웃 API 호출
                await logoutApi(user.id);

                // 추가: 소셜 사용자 로그아웃 처리 (백엔드에서 처리)
                if (user.loginType === 'google' || user.loginType === 'naver') {
                    await fetch(`http://localhost:8080/api/oauth2/unlink/${user.loginType}`, {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                        },
                    });
                }

                // Redux 상태 초기화
                dispatch(logout());

                // 로컬 스토리지 초기화
                localStorage.removeItem("accessToken");

                alert("로그아웃되었습니다.");
                nav("/", { replace: true }); // 메인 페이지로 리디렉션
            } else {
                alert("로그아웃할 사용자가 없습니다.");
            }
        } catch (error) {
            console.error("로그아웃 실패:", error.response?.data || error.message);
            alert("로그아웃에 실패했습니다.");
        }
    };

    // useEffect(() => {
    //     if (!isLoggedIn) {
    //         // 로그인 상태가 아닐 경우 로그인 페이지로 이동
    //         nav("/login", { replace: true });
    //     }
    // }, [isLoggedIn, nav]);

    return (
        <div>
            <Header title={"RED & BLUE 찬반토론"}
                rightChild={
                    isLoggedIn ? (
                        <div>
                            <span>
                                {user?.username} 회원님{" "}
                                {user?.loginType && <small>({user.loginType})</small>}
                            </span>
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
            <PostList data={data}/>
        
        </div>
    )
}

export default Home;  