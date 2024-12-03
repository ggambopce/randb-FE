import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import { getUserInfo } from "../api/memberApi";
import { login, logout } from "../slices/loginSlice";
import { logoutApi } from "../api/loginApi";

const useLoginInfo = () => {
    const nav = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation(); // 현재 경로 확인
    
    
    useEffect(() => {
        const fetchLoginInfo = async () => {
            const token = localStorage.getItem("accessToken"); // 토큰 가져오기
            if (!token) {
                // 로그인 페이지와 특정 허용 경로에서는 리다이렉트하지 않음
                if (
                    location.pathname !== "/login" &&
                    location.pathname !== "/" &&
                    location.pathname !== "/join"
                ) {
                    nav("/login");
                }
                return;
            }

            try {
                const res = await getUserInfo(token); // 유저 정보 요청
                const userInfo = res.data.data; // 응답의 data 객체 내의 user 정보
                const { username, id, roles, loginType } = userInfo
                
                // Redux 상태 업데이트
                dispatch(login({ user: { username, id, roles, loginType }, accessToken: token }));
            } catch (err) {

                console.error("유저 정보를 가져오는 데 실패했습니다.", err);

                // 인증 실패 시 로그아웃 처리
                if (token) {
                    try {
                        await logoutApi(); // 서버 로그아웃 호출
                    } catch (logoutErr) {
                        console.error("로그아웃 중 오류 발생:", logoutErr);
                    }
                }
               
                // 인증 실패 시 토큰 초기화 및 로그인 페이지로 리다이렉트
                dispatch(logoutApi()); // Redux 상태 초기화
                localStorage.removeItem("accessToken"); // 로컬 스토리지 토큰 삭제

                if (
                    location.pathname !== "/login" &&
                    location.pathname !== "/" &&
                    location.pathname !== "/join"&&
                    !location.pathname.startsWith("/login/oauth2/code")
                ) {
                    nav("/login");
                }
            }
        };

        fetchLoginInfo();
    }, [dispatch, nav, location]);
};

export default useLoginInfo;