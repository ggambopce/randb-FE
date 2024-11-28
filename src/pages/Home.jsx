import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../slices/loginSlice";
import { PostStateContext } from "../App";

import Header from "../components/Header";
import Button from "../components/Button";
import PostList from "../components/PostList";

const Home = () => {
    const data = useContext(PostStateContext);
    const dispatch = useDispatch();
    const nav = useNavigate();
    const { isLoggedIn, user } = useSelector((state) => state.loginSlice);
    
    // 로그아웃 처리
    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("accessToken");
        alert("로그아웃되었습니다.");
    };

    return (
        <div>
            <Header title={"RED & BLUE 찬반토론"}
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
            <PostList data={data}/>
        
        </div>
    )
}

export default Home;  