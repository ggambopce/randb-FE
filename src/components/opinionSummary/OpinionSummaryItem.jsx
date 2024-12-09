import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OpinionSummaryItem.css";

// 로컬 스토리지에서 JWT 토큰 가져오기
const getAuthToken = () => localStorage.getItem("authToken");

const OpinionSummaryItem = ({ postId, type, reloadPost }) => {
  const [summary, setSummary] = useState(null); // 요약 결과 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const [voteError, setVoteError] = useState(null); // 투표 에러 상태
  const [voteSuccess, setVoteSuccess] = useState(null); // 투표 성공 상태

  // Axios 인스턴스 생성 (JWT 토큰 포함)
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api/user", // 공통 URL
    headers: {
      Authorization: `Bearer ${getAuthToken()}`, // JWT 토큰 추가
    },
  });
  // 요약된 의견 조회 및 요약 작성 API 호출
  const handleSummaryFetch = async () => {
    setLoading(true);
    setError(null);

    try {
      // "토론 중" 상태에서만 요약 작성 API 호출
      if (type === "DISCUSSING") {
        await axios.post(`http://localhost:8080/api/user/opinionSummary`, null, {
          params: { postId },
        });
        alert("의견 요약이 성공적으로 작성되었습니다!");
        if (reloadPost) reloadPost(); // 부모 컴포넌트에서 PostType 업데이트
      }

      // 요약 조회 API 호출
      const response = await axios.get(
        `http://localhost:8080/api/user/opinionSummary`,
        {
          params: { postId },
        }
      );
      setSummary(response.data.data); // RED와 BLUE 요약 결과 저장
    } catch (err) {
      console.error("요약 처리 중 오류 발생:", err);
      setError("요약 처리 중 문제가 발생했습니다. 다시 시도해주세요.");
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
      const response = await axios.post(
        `http://localhost:8080/api/user/posts/votes`,
        votePayload,
        {
          headers: {
            "Content-Type": "application/json", // 추가
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );

      console.log("Server Response:", response.data); // 서버 응답 확인
      setVoteSuccess(response.data.message);
    } catch (err) {
      console.error("투표 처리 중 오류 발생:", err);
      setVoteError("투표 처리 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  };

  // 컴포넌트가 마운트될 때 요약 데이터 로드
  useEffect(() => {
    handleSummaryFetch();
  }, [postId]);

  return (
    <div className="opinion-summary-item">
      <h2>의견 요약</h2>

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

      <div className="action-buttons">
        {type === "DISCUSSING" && (
          <button onClick={handleSummaryFetch} className="fetch-button">
            의견 요약 작성 및 조회
          </button>
        )}

        {/* 투표 버튼 */}
        {type === "VOTING" && (
          <div className="vote-buttons">
            <button onClick={() => handleVote("RED")} className="vote-red">
              RED에 투표
            </button>
            <button onClick={() => handleVote("BLUE")} className="vote-blue">
              BLUE에 투표
            </button>
          </div>
        )}  
      </div>

      {/* 투표 결과 메시지 */}
      {voteSuccess && <p className="success-message">{voteSuccess}</p>}
      {voteError && <p className="error-message">{voteError}</p>}
    </div>
  );
};

export default OpinionSummaryItem;
