import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Viewer from "../components/post/Viewer";
import usePost from "../hooks/usePost";
import OpinionSummaryItem from "../components/opinionSummary/OpinionSummaryItem";
import OpinionList from "../components/opinion/OpinionList";
import OpinionEditor from "../components/opinion/OpinionEditor";
import { addOpinion } from "../api/opinionApi"; // 의견 추가 API 함수
import axios from "axios";


const Post = () => {
  const params = useParams();
  const { curPostItem, loading, error } = usePost(params.id);
  const nav = useNavigate();

  const [opinions, setOpinions] = useState([]); // 의견 리스트 상태
  const [isSummaryView, setIsSummaryView] = useState(false); // 요약 보기 상태

  // 의견 데이터 로드
  useEffect(() => {
    const fetchOpinions = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/opinions`, {
          params: { postId: params.id },
        });
        setOpinions(response.data.data); // 초기 의견 데이터 설정
      } catch (err) {
        console.error("의견 불러오기 실패:", err);
      }
    };

    fetchOpinions();
  }, [params.id]);


  if (loading) {
    return <div>데이터 로딩중...</div>;
  }

  if (error) {
    return <div>에러 발생: {error}</div>;
  }

  const { postTitle, postContent, username } = curPostItem;

  // 의견 작성 함수
  const handleOpinionSubmit = async (opinionData) => {
    try {
      const response = await addOpinion(opinionData); // 의견 추가 API 호출
      console.log("의견 작성 성공:", response);
      alert("의견이 성공적으로 추가되었습니다!");
    } catch (err) {
      console.error("의견 작성 실패:", err);
      alert("의견 작성 중 오류가 발생했습니다.");
    }
  };

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
              onClick={() => nav(`/updatepost/${params.id}`, { state: curPostItem })}
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
          <OpinionList postId={params.id} opinions={opinions}/>
          <OpinionEditor postId={params.id} onSubmit={handleOpinionSubmit} />
        </div>
      )}
    </div>
  );
};

export default Post;
