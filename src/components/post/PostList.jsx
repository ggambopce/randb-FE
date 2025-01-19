import React, { useState, useEffect } from "react";
import "./PostList.css";
import Button from "../Button";
import PostItem from "./PostItem";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { mainPosts } from "../../api/postApi"; 

const PostList = () => {
    const nav = useNavigate();
    const { isLoggedIn } = useSelector((state) => state.loginSlice);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchPosts = async () => {
          try {
              const result = await mainPosts(); // API 호출
              const posts = result.data.posts;
              
              // 상태에 따라 데이터 분리
              const discussing = posts.filter((post) => post.postType === "DISCUSSING");
              const voting = posts.filter((post) => post.postType === "VOTING");
              const completed = posts.filter((post) => post.postType === "COMPLETED");
              
              setData({ discussing, voting, completed });
              setLoading(false);
          } catch (err) {
              console.error("Error fetching posts:", err);
              setError("Failed to load posts.");
              setLoading(false);
          }
      };

      fetchPosts();
  }, []);

      const handleNewPostClick = () => {
        if (isLoggedIn) {
            nav("/newpost"); // 로그인된 경우 새로운 토론 작성 페이지로 이동
        } else {
            alert("로그인이 필요합니다.");
            nav("/login"); // 로그인되지 않은 경우 로그인 페이지로 이동
        }
    };
    
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
                    onClick={handleNewPostClick}
                    text={"새로운 토론 작성하기"}
                    type={"POSITIVE"}
                />
            </div>
            <div className="list_wrapper">
                <h2>토론중</h2>
                {data.discussing.map((item) => (
                    <PostItem key={item.id} {...item} />
                ))}

                <h2>투표중</h2>
                {data.voting.map((item) => (
                    <PostItem key={item.id} {...item} />
                ))}

                <h2>토론 완료</h2>
                {data.completed.map((item) => (
                    <PostItem key={item.id} {...item} />
                ))}
            </div>
        </div>
    )
}

export default PostList;