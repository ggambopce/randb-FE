import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/loginSlice";



const Header = ({title, leftChild, rightChild}) => {
    const dispatch = useDispatch();
    const { isLoggedIn, user } = useSelector((state) => state.loginSlice);

    const handleLogout = () => {
        dispatch(logout()); // Redux 상태 초기화
        localStorage.removeItem("accessToken"); // 로컬 스토리지에서 Access Token 삭제
    };

    return (
        <header className="Header">
            {/* 좌측 콘텐츠 */}
            <div className="header_left">
                {leftChild ? (
                    leftChild
                ) : (
                    isLoggedIn && (
                        <button onClick={handleLogout}>로그아웃</button>
                    )
                )}
            </div>

            {/* 중앙 제목 */}
            <div className="header_center">{title}</div>

            {/* 우측 콘텐츠 */}
            <div className="header_right">
                {rightChild ? (
                    rightChild
                ) : (
                    isLoggedIn ? (
                        <span>{user?.username}님</span>
                    ) : (
                        <button>로그인</button>
                    )
                )}
            </div>
        </header>
    );
} 

export default Header;