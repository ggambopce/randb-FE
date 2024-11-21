import Button from "./Button";
import "./PostItem.css";

const PostItem = () => {
    return (
        <div className="PostItem">
            <div className="info_section">
                <div className="postTitle">안락사 찬반 토론</div>
                <div className="postContent">안락사의 합법화에 대해서 의견을 나눠주세요</div>
            </div>
            <div className="button_section">
                <Button text={"참여하기"} />
            </div>
        </div>
    )
}

export default PostItem;