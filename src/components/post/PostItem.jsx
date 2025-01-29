import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../Button";
import "./PostItem.css";

const PostItem = ({id, postTitle, postContent, nickname, likeCount, postType}) => { // 토론글 상태 추가
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
        <span className={`postTypeBadge ${postType.toLowerCase()}`}>
          {postType === "DISCUSSING"
            ? "토론 중"
            : postType === "VOTING"
            ? "투표 중"
            : "토론 완료"}
        </span>
        <div className="postContentWrapper">
             {/* 닉네임 표시 */}
             {nickname && (
                    <div className="nicknameWrapper">
                        <span>작성자: <strong>{nickname}</strong></span>
                    </div>
                )}
          <h3 className="postTitle">{postTitle}</h3>
          <p className="postContent">{postContent}</p>
        </div>

        <div className="postActionWrapper">
            {/* 좋아요 버튼 */}
            <button className="likeButton">
                    👍 좋아요 {}
                </button>
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