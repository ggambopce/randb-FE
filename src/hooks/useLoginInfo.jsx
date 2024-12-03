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
      const token = localStorage.getItem("authToken"); // 로컬 스토리지에서 토큰 가져오기
      if (!token) {
        console.log("로그인 토큰 없음");
        return; // 토큰 없으면 로그인 상태 유지하지 않음
      }

      try {
        const userInfo = await getUserInfo(token); // 서버에서 사용자 정보 가져오기
        
        if (userInfo && userInfo.id && userInfo.username) {
          dispatch(login({ user: userInfo, accessToken: token }));
        } else {
          throw new Error("유효하지 않은 사용자 정보");
        }
      } catch (err) {
        console.error("로그인 정보 복원 실패:", err);

        // 유효하지 않은 토큰 제거
        localStorage.removeItem("authToken");
        dispatch(logout());
        nav("/login", { replace: true });
      }
    };

    restoreLoginState();
  }, [dispatch, nav]);
};

export default useLoginInfo;