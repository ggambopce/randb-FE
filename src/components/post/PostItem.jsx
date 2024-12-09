import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../Button";
import "./PostItem.css";

const PostItem = ({id, postTitle, postContent, type}) => { // 토론글 상태 추가
    const nav = useNavigate();
    const { isLoggedIn } = useSelector((state) => state.loginSlice);

    const handleParticipateClick = () => {
        if (isLoggedIn) {
            nav(`/detailpost/${id}`); // 로그인된 경우 참여 페이지로 이동
        } else {
            alert("로그인이 필요합니다.");
            nav("/login"); // 로그인되지 않은 경우 로그인 페이지로 이동
        }
    };

    return (
        <div className="PostItem">
            <div className="postContentWrapper">
                <h3 className="postTitle">{postTitle}</h3>
                <p className="postContent">{postContent}</p>
                {/* 상태 표시 */}
                <p className="postType">{type === "DISCUSSING" ? "토론 중" : type}</p>
            </div>
            <div className="postActionWrapper">
                <Button 
                    onClick={handleParticipateClick}
                    text={"참여하기"}
                    type={"POSITIVE"} 
                />
            </div>
        </div>
    );
};

export default PostItem;