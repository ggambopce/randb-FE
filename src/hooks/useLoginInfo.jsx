import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getUserInfo } from "../api/memberApi";
import { login, logout } from "../slices/loginSlice";

const useLoginInfo = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();
  
    useEffect(() => {
      const restoreLoginState = async () => {
        const token = localStorage.getItem("authToken");
        if (!token) {
          return; // 토큰 없으면 로그인 상태 유지하지 않음
        }
  
        try {
          const userInfo = await getUserInfo(token); // 서버에서 사용자 정보 가져오기
          dispatch(login({ user: userInfo, accessToken: token })); // Redux에 로그인 상태 복원
        } catch (err) {
          console.error("로그인 정보 복원 실패:", err);
          localStorage.removeItem("authToken"); // 유효하지 않은 토큰 제거
          dispatch(logout());
          nav("/login");
        }
      };
  
      restoreLoginState();
    }, [dispatch, nav]);
  };

export default useLoginInfo;