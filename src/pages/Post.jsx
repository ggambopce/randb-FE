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
  const { curPostItem, loading, error, reload } = usePost(params.id);
  const nav = useNavigate();

  const [opinions, setOpinions] = useState([]); // 의견 리스트 상태
  const [isSummaryLoading, setIsSummaryLoading] = useState(false); // 요약 버튼 상태

  // 의견 데이터 로드 함수
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

  // 컴포넌트 마운트 시 의견 데이터 로드
  useEffect(() => {
    fetchOpinions();
  }, [params.id]);

  // 의견 요약 작성 API 호출
  const handleSummaryCreation = async () => {
    setIsSummaryLoading(true);
    try {
      await axios.post(`http://localhost:8080/api/user/opinionSummary`, null, {
        params: { postId: params.id },
      });
      alert("의견 요약이 성공적으로 작성되었습니다!");
      reload(); // Post 데이터 새로고침 (type 변경 반영)
    } catch (err) {
      console.error("의견 요약 실패:", err);
      alert("요약 작성 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSummaryLoading(false);
    }
  };

  if (loading) {
    return <div>데이터 로딩중...</div>;
  }

  if (error) {
    return <div>에러 발생: {error}</div>;
  }

  const { postTitle, postContent, username, type } = curPostItem;

  // 의견 작성 함수
  const handleOpinionSubmit = async (opinionData) => {
    try {
      const response = await addOpinion(opinionData); // 의견 추가 API 호출
      await fetchOpinions(); // 의견 목록 새로고침
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
        leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로가기"} />}
        rightChild={
          type === "DISCUSSING" ? (
            <Button
              onClick={handleSummaryCreation} // 의견 요약 버튼
              text={isSummaryLoading ? "요약 중..." : "의견 요약"}
              disabled={isSummaryLoading} // 로딩 중 버튼 비활성화
            />
          ) : (
            <Button onClick={reload} text={"투표완료"} />
          )
        }
      />
      <Viewer
        postTitle={postTitle}
        postContent={postContent}
        username={username}
        type={type}
      />

      {type === "DISCUSSING" ? (
        <div>
          <OpinionList
            postId={params.id}
            opinions={opinions}
            setOpinions={setOpinions}
          />
          <OpinionEditor postId={params.id} onSubmit={handleOpinionSubmit} />
        </div>
      ) : (
        <OpinionSummaryItem postId={params.id} type={type} />
      )}
    </div>
  );
};

export default Post;
