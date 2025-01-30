import React, { useState, useEffect, useCallback} from "react";
import "./PostList.css";
import Button from "../Button";
import PostItem from "./PostItem";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { mainPosts, searchPosts } from "../../api/postApi"; 

const PostList = () => {
    const nav = useNavigate();
    const { isLoggedIn } = useSelector((state) => state.loginSlice);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [postType, setPostType] = useState(""); // 토론 상태 필터

    // API 호출 함수 (검색어에 따라 다르게 호출)
    const fetchPosts = useCallback(async () => {
        setLoading(true);
        try {
            let result;
            if (searchKeyword.trim()) {
                result = await searchPosts({ searchKeyword, postType, page: 0, size: 4 });
            } else {
                result = await mainPosts();
            }

            const posts = result.data.posts;
            const discussing = posts.filter((post) => post.postType === "DISCUSSING");
            const voting = posts.filter((post) => post.postType === "VOTING");
            const completed = posts.filter((post) => post.postType === "COMPLETED");

            setData({ discussing, voting, completed });
        } catch (err) {
            console.error("Error fetching posts:", err);
            setError("데이터를 불러오는 데 실패했습니다.");
        } finally {
            setLoading(false);
        }
    }, [searchKeyword, postType]);

    //  검색어 입력 시 500ms 후 API 호출 (디바운싱 적용)
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchPosts();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchKeyword, postType, fetchPosts]);

    //  첫 렌더링 시 기본 게시글 가져오기
    useEffect(() => {
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
            {/* 검색 바 및 필터 */}
            <div className="search_bar">
                <input
                    type="text"
                    placeholder="토론 제목을 검색해주세요"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <button onClick={() => setPostType("")} className={postType === "" ? "active" : ""}>
                    전체
                </button>
                <button
                    onClick={() => setPostType("DISCUSSING")}
                    className={postType === "DISCUSSING" ? "active" : ""}
                >
                    토론중
                </button>
                <button
                    onClick={() => setPostType("VOTING")}
                    className={postType === "VOTING" ? "active" : ""}
                >
                    투표중
                </button>
                <button
                    onClick={() => setPostType("COMPLETED")}
                    className={postType === "COMPLETED" ? "active" : ""}
                >
                    완료
                </button>
            </div>

            {/* 새 글 작성 버튼 */}
            <div className="menu_bar">
                <Button 
                    onClick={handleNewPostClick}
                    text={"새로운 토론 작성하기"}
                    type={"POSITIVE"}
                />
            </div>
            <div className="list_wrapper">
    
                {data.discussing.map((item) => (
                    <PostItem key={item.id} {...item} />
                ))}

                {data.voting.map((item) => (
                    <PostItem key={item.id} {...item} />
                ))}

                {data.completed.map((item) => (
                    <PostItem key={item.id} {...item} />
                ))}
            </div>
        </div>
    )
}

export default PostList;