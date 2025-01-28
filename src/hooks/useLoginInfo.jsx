import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../slices/loginSlice";
import { getUserInfo } from "../api/memberApi";
import { useNavigate } from "react-router-dom";

const useLoginInfo = () => { // 일반로그인, 소셜로그인 통합처리
  const nav = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.loginSlice.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    const restoreLoginState = async () => {
      try {
        // 사용자 정보 가져오기
        const userInfo = await getUserInfo();

        if (userInfo) {

          // 프로필이 없는 경우(profileId가 null), 프로필 작성 페이지로 이동
          if (userInfo.profileId === null) {
            nav("/newprofile", { replace: true }); // 프로필 작성 페이지로 리다이렉트
            return;
          }

          // Redux 상태 업데이트
          dispatch(
            login({
              user: userInfo,
            })
          );
        } else {
          throw new Error("유효하지 않은 사용자 정보");
        }
      } catch (error) {
        console.error("로그인 상태 복원 실패:", error);
        dispatch(logout());
        nav("/login", { replace: true });
      }
    };

    restoreLoginState();
  }, [isLoggedIn,dispatch, nav]);
};

export default useLoginInfo;
