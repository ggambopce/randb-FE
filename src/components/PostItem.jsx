import Button from "./Button";
import "./PostItem.css";

const PostItem = ({id, postTitle, postContent}) => {
    return (
        <div className="PostItem">
            <div className="info_section">
                <div className="postTitle">{postTitle}</div>
                <div className="postContent">{postContent}</div>
            </div>
            <div className="button_section">
                <Button text={"참여하기"} />
            </div>
        </div>
    )
}

export default PostItem;