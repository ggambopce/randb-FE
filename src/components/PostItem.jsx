import { useParams, useNavigate } from "react-router-dom";
import Button from "./Button";
import "./PostItem.css";

const PostItem = ({id, postTitle, postContent}) => {
    const params = useParams();
    const nav = useNavigate();

    return (
        <div className="PostItem">
            <div className="postContentWrapper">
                <h3 className="postTitle">{postTitle}</h3>
                <p className="postContent">{postContent}</p>
            </div>
            <div className="postActionWrapper">
                <Button 
                    onClick={() => nav(`/detailpost/${id}`)}
                    text={"참여하기"}
                    type={"POSITIVE"} 
                />
            </div>
        </div>
    );
};

export default PostItem;