import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OpinionSummaryItem.css";

// 로컬 스토리지에서 JWT 토큰 가져오기
const getAuthToken = () => localStorage.getItem("authToken");

const OpinionSummaryItem = ({ postId, postType, reloadPost }) => {
  const [summary, setSummary] = useState(null); // 요약 결과 상태
  const [voteCounts, setVoteCounts] = useState({ redVotes: 0, blueVotes: 0 }); // 투표 결과 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const [voteError, setVoteError] = useState(null); // 투표 에러 상태
  const [voteSuccess, setVoteSuccess] = useState(null); // 투표 성공 상태

  // Axios 인스턴스 생성 (JWT 토큰 포함)
  const axiosInstance = axios.create({
    baseURL: "https://jinorandb.com/api/user", // 공통 URL
    headers: {
      Authorization: `Bearer ${getAuthToken()}`, // JWT 토큰 추가
    },
  });

  // 요약 데이터 및 투표 결과 가져오기
  const fetchSummaryAndVotes = async () => {
    try {
      setLoading(true);
      setError(null);

      // 요약 조회 API 호출
      const summaryResponse = await axiosInstance.get(`/opinionSummary`, {
        params: { postId },
      });

      setSummary(summaryResponse.data.data); // RED와 BLUE 요약 결과 저장

      // 투표 결과 조회 API 호출
      const voteResponse = await axiosInstance.get(`/posts/votes/${postId}`);
      setVoteCounts(voteResponse.data.data); // RED와 BLUE 투표 결과 저장
    } catch (err) {
      console.error("데이터 로드 중 오류 발생:", err);
      setError("데이터를 불러오는 중 문제가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };


  // 투표 진행 API 호출
  const handleVote = async (voteType) => {
    setVoteError(null);
    setVoteSuccess(null);

    try {
      const votePayload = {
        postId: postId,
        voteType: voteType,
      };

      console.log("Vote Payload:", votePayload); // 요청 데이터 확인
      const response = await axiosInstance.post(`/posts/votes`, votePayload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Server Response:", response.data); // 서버 응답 확인
      setVoteSuccess(response.data.message);

      // 투표 성공 후 데이터 갱신
      const updatedVotes = await axiosInstance.get(`/posts/votes/${postId}`);
      setVoteCounts(updatedVotes.data.data); // 투표 결과를 업데이트
    } catch (err) {
      console.error("투표 처리 중 오류 발생:", err);
      setVoteError("투표 처리 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  };

  // 컴포넌트가 마운트될 때 초기 데이터 로드
  useEffect(() => {
    fetchSummaryAndVotes();
  }, [postId]);

  
  return (
    <div className="opinion-summary-item">

      {loading && <p>요청을 처리 중입니다...</p>}
      {error && <p className="error-message">{error}</p>}

      {summary && (
        <div className="summary-results">
          <h3>RED 요약</h3>
          <p>{summary.redSummary || "요약된 RED 의견이 없습니다."}</p>

          <h3>BLUE 요약</h3>
          <p>{summary.blueSummary || "요약된 BLUE 의견이 없습니다."}</p>
        </div>
      )}

      <div className="vote-results">
        <h3>투표 현황</h3>
        <p>RED <br></br>{voteCounts.redVotes}표</p>
        <p>BLUE<br></br>{voteCounts.blueVotes}표</p>
      </div>

      <div className="action-buttons">
        {postType === "DISCUSSING" && (
          <button onClick={fetchSummaryAndVotes} className="fetch-button">
            의견 요약 작성 및 조회
          </button>
        )}

        {postType === "VOTING" && (
          <div className="vote-buttons">
            <button onClick={() => handleVote("RED")} className="vote-red">
              RED에 한표
            </button>
            <button onClick={() => handleVote("BLUE")} className="vote-blue">
              BLUE에 한표
            </button>
          </div>
        )}
      </div>

      {voteSuccess && <p className="success-message">{voteSuccess}</p>}
      {voteError && <p className="error-message">{voteError}</p>}
    </div>
  );
};

export default OpinionSummaryItem;
