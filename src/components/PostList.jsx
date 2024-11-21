import "./PostList.css";
import Button from "./Button";
import PostItem from "./PostItem";

const PostList = () => {
    return (
        <div className="PostList">
            <div className="menu_bar">
                <select>
                    <option value={"latest"}>최신순</option>
                    <option value={"oldest"}>오래된 순</option>
                </select>
                <Button 
                    text={"새로운 토론 작성하기"}
                    type={"POSITIVE"} 
                />
            </div>
            <div className="list_wrapper">
                <PostItem />
            </div>
        </div>
    )
}

export default PostList;