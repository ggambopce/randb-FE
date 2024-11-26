import { useEffect, useState } from "react";
import "./PostList.css";
import Button from "./Button";
import PostItem from "./PostItem";
import { replace, useNavigate } from "react-router-dom";
import { mainPosts } from "../api/postApi";

const PostList = () => {
    const [data, setData] = useState([]);
    const nav = useNavigate();

    // 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const posts = await mainPosts(); // mainPosts 호출
                setData(posts); // 상태 업데이트
            } catch (error) {
                console.error("Failed to fetch posts:", error);
            }
        };

        fetchData(); // 컴포넌트가 마운트될 때 데이터 가져오기
    }, []);

    return (
        <div className="PostList">
            <div className="menu_bar">
                <select>
                    <option value={"latest"}>최신순</option>
                    <option value={"oldest"}>오래된 순</option>
                </select>
                <Button 
                    onClick={() => nav("/newpost")}
                    text={"새로운 토론 작성하기"}
                    type={"POSITIVE"}
                />
            </div>
            <div className="list_wrapper">
                {data.map((item)=>
                    <PostItem key={item.id} {...item}/>)}
            </div>
        </div>
    )
}

export default PostList;