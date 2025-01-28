import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Viewer from "../components/post/Viewer";
import usePost from "../hooks/usePost";
import VoteResults from "../components/voteResult/VoteResults";
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
  const [summary, setSummary] = useState(null); // 요약 데이터 상태
  const [isSummaryLoading, setIsSummaryLoading] = useState(false); // 요약 버튼 상태
  const [isCompletingVote, setIsCompletingVote] = useState(false); // 투표완료 버튼 상태
  const [statistics, setStatistics] = useState(null); // 통계 데이터 상태

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

  // 투표 완료 후 통계 데이터 로드
  const fetchStatistics = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/user/posts/${params.id}/statistics`
      );
      setStatistics(response.data);
    } catch (err) {
      console.error("통계 데이터 로드 실패:", err);
    }
  };

  const fetchSummary = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/user/opinionSummary`, {
        params: { postId: params.id },
      });
      setSummary(response.data.data); // 요약 데이터 상태 업데이트
    } catch (err) {
      console.error("요약 데이터 로드 실패:", err);
    }
  };

  // 컴포넌트 마운트 시 의견 데이터 로드
  useEffect(() => {
    fetchOpinions();
    if (curPostItem?.postType === "COMPLETED") {
      fetchStatistics(); // '완료' 상태에서 통계 데이터 로드
    }else if (curPostItem?.postType === "VOTING") {
      fetchSummary(); // '투표 중' 상태에서 요약 데이터 로드
    }
  }, [params.id, curPostItem?.postType]);

  // 의견 요약 작성 API 호출
  const handleSummaryCreation = async () => {
    setIsSummaryLoading(true);
    try {
      // 요약 작성 API 호출
      await axios.post(`http://localhost:8080/api/user/opinionSummary`, null, {
        params: { postId: params.id },
      });
      alert("의견 요약이 성공적으로 작성되었습니다!");

      // 요약 데이터 상태를 업데이트
    await fetchSummary();

    reload();
  } catch (err) {
    console.error("요약 작성 중 오류 발생:", err);
    alert("요약 작성 중 문제가 발생했습니다. 다시 시도해주세요.");
  } finally {
    setIsSummaryLoading(false);
  }
  };

  // 투표 완료 API 호출
  const handleCompleteVote = async () => {
    setIsCompletingVote(true);
    try {
      await axios.post(`http://localhost:8080/api/user/posts/${params.id}/complete`);
      alert("투표가 완료되었습니다!");
      
      reload(); // Post 상태 새로고침

        // 통계 데이터를 즉시 로드 및 반영
      const statisticsResponse = await axios.get(
        `http://localhost:8080/api/user/posts/${params.id}/statistics`
      );
      setStatistics(statisticsResponse.data.data);

      
    } catch (err) {
      console.error("투표 완료 실패:", err);
      alert("투표 완료 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsCompletingVote(false);
    }
  };

  if (loading) {
    return <div>데이터 로딩중...</div>;
  }

  if (error) {
    return <div>에러 발생: {error}</div>;
  }

  const { postTitle, postContent, username, postType } = curPostItem;

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
        title={"토론의 장"}
        leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로가기"} />}
        rightChild={
          postType === "DISCUSSING" ? (
            <Button
              onClick={handleSummaryCreation}
              text={isSummaryLoading ? "요약 중..." : "의견 요약"}
              disabled={isSummaryLoading}
            />
          ) : postType === "VOTING" ? (
            <Button
              onClick={handleCompleteVote}
              text={isCompletingVote ? "완료 중..." : "투표완료"}
              disabled={isCompletingVote}
            />
          ) : null // 투표 완료 상태에서는 버튼 없음
        }
      />
      <Viewer
        postTitle={postTitle}
        postContent={postContent}
        username={username}
        postType={postType}
      />
      {postType === "DISCUSSING" && (
        <>
          <OpinionList opinions={opinions} setOpinions={setOpinions} />
          <OpinionEditor postId={params.id} onSubmit={handleOpinionSubmit} />
        </>
      )}
      {postType === "VOTING" && (
        <OpinionSummaryItem postId={params.id} postType={postType} />
      )}
      {postType === "COMPLETED" && (
        <>
          <VoteResults
            redVotes={statistics?.redVotes}
            blueVotes={statistics?.blueVotes}
            winningVoteType={statistics?.winningVoteType}
            redVotePercentage={statistics?.redVotePercentage}
            blueVotePercentage={statistics?.blueVotePercentage}
          />
          <OpinionSummaryItem postId={params.id} postType={postType} />
        </>
      )}
    </div>
  );
};

export default Post;
