import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import { getUserInfo } from "../api/memberApi";
import { login } from "../slices/loginSlice";

const useLoginInfo = () => {
    const nav = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation(); // 현재 경로 확인
    
    
    useEffect(() => {
        const fetchLoginInfo = async () => {
            const token = localStorage.getItem("accessToken"); // 토큰 가져오기
            if (!token) {
                if (location.pathname !== "/login") {
                nav("/login"); // 토큰이 없으면 로그인 페이지로 리다이렉트
                }
                return;
            }

            try {
                const res = await getUserInfo(token); // 유저 정보 요청
                const { username, id, roles } = res.data; // 필요한 정보 추출
                
                // Redux 상태 업데이트
                dispatch(login({ user: { username, id, roles }, accessToken: token }));
            } catch (err) {
                console.error("유저 정보를 가져오는 데 실패했습니다.", err);
                if (location.pathname !== "/login") {
                    nav("/login"); // 실패 시 로그인 페이지로 리다이렉트
                }
            }
        };

        fetchLoginInfo();
    }, [dispatch, nav, location]);
};

export default useLoginInfo;