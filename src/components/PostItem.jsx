import { useParams, useNavigate } from "react-router-dom";
import Button from "./Button";
import "./PostItem.css";

const PostItem = ({id, postTitle, postContent}) => {
    const params = useParams();
    const nav = useNavigate();

    return (
        <div className="PostItem">
            <div className="info_section">
                <div className="postTitle">{postTitle}</div>
                <div className="postContent">{postContent}</div>
            </div>
            <div className="button_section">
                <Button 
                    onClick={()=> nav(`/detailpost/${id}`)}
                    text={"참여하기"}
                    type={"POSITIVE"} />
            </div>
        </div>
    )
}

export default PostItem;