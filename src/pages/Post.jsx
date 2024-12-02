import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Viewer from "../components/post/Viewer";
import usePost from "../hooks/usePost";
import OpinionSummaryItem from "../components/opinionSummary/OpinionSummaryItem";
import OpinionList from "../components/opinion/OpinionList";
import OpinionEditor from "../components/opinion/OpinionEditor";

const Post = () => {
  const params = useParams();
  const { curPostItem, loading, error } = usePost(params.id);
  const nav = useNavigate();

  const [isSummaryView, setIsSummaryView] = useState(false); // 요약 보기 상태

  if (loading) {
    return <div>데이터 로딩중...</div>;
  }

  if (error) {
    return <div>에러 발생: {error}</div>;
  }

  const { postTitle, postContent, username } = curPostItem;

  return (
    <div>
      <Header
        title={"토론 상세페이지"}
        leftChild={
          <Button onClick={() => nav(-1)} text={"< 뒤로가기"} />
        }
        rightChild={
          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              onClick={() => nav(`/updatepost/${params.id}`)}
              text={"수정하기"}
            />
            <Button
              onClick={() => setIsSummaryView(true)}
              text={"의견 요약"}
            />
          </div>
        }
      />
      <Viewer postTitle={postTitle} postContent={postContent} username={username} />

      {isSummaryView ? (
        <OpinionSummaryItem postId={params.id} />
      ) : (
        <div>
          <OpinionList postId={params.id} />
          <OpinionEditor postId={params.id} />
        </div>
      )}
    </div>
  );
};

export default Post;
