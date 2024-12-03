import "./Header.css";
import { useSelector } from "react-redux";



const Header = ({title, leftChild, rightChild}) => {
    const { isLoggedIn, user } = useSelector((state) => state.loginSlice);

    return (
        <header className="Header">
            {/* 좌측 콘텐츠 */}
            <div className="header_left">
                {leftChild}
            </div>

            {/* 중앙 제목 */}
            <div className="header_center">{title}</div>

            {/* 우측 콘텐츠 */}
            <div className="header_right">
                {rightChild}
            </div>
        </header>
    );
} 

export default Header;