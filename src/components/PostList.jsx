import React, { useState, useEffect } from "react";
import "./PostList.css";
import Button from "./Button";
import PostItem from "./PostItem";
import { replace, useNavigate } from "react-router-dom";
import { mainPosts } from "../api/postApi";

const PostList = () => {
    const nav = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const result = await mainPosts(); // API 호출
            setData(result.data.posts);
            setLoading(false);
          } catch (err) {
            console.error("Error fetching posts:", err);
            setError("Failed to load posts.");
            setLoading(false);
          }
        };
    
        fetchPosts();
      }, []);
    
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error: {error}</div>;

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