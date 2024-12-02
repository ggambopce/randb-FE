import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../slices/loginSlice";
import { useNavigate } from "react-router-dom";

const OAuth2RedirectHandler = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();

    useEffect(() => {
        // 현재 URL에서 access-token 추출
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get("access-token");

        if (accessToken) {
            // 토큰을 로컬 스토리지에 저장
            localStorage.setItem("accessToken", accessToken);

            // 서버로부터 사용자 정보를 가져오는 API 호출
            fetch("http://localhost:8080/api/userinfo", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        const user = data.data;

                        // Redux에 사용자 정보 저장
                        dispatch(
                            login({
                                user: {
                                    id: user.id,
                                    username: user.nickName,
                                    loginType: user.loginType,
                                },
                                accessToken: accessToken,
                            })
                        );

                        // 홈 화면으로 이동
                        nav("/", { replace: true });
                    } else {
                        console.error("사용자 정보 불러오기 실패:", data.message);
                        alert("로그인에 실패했습니다.");
                    }
                })
                .catch((error) => {
                    console.error("API 호출 에러:", error);
                    alert("로그인 처리 중 문제가 발생했습니다.");
                });
        } else {
            console.error("Access Token이 없습니다.");
            alert("로그인에 실패했습니다.");
            nav("/login", { replace: true });
        }
    }, [dispatch, nav]);

    return <div>로그인 처리 중...</div>;
};

export default OAuth2RedirectHandler;
