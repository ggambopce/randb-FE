import React, { useState } from "react";
import axios from "axios";
import "./OpinionSummaryItem.css";

const OpinionSummaryItem = ({ postId }) => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSummaryClick = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `http://localhost:8080/api/opinions/summary`,
        {
          params: { postId }, // Query parameter 전달
        }
      );
      setSummary(response.data.data); // RED와 BLUE 요약 결과 저장
    } catch (err) {
      console.error("요약 API 호출 중 오류 발생:", err);
      setError("요약 중 문제가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="opinion-summary-item">
      <button onClick={handleSummaryClick} className="summary-button">
        요약하기
      </button>

      {loading && <p>요약 중입니다...</p>}
      {error && <p className="error-message">{error}</p>}

      {summary && (
        <div className="summary-results">
          <h3>RED 요약</h3>
          <p>{summary.RED || "요약된 RED 의견이 없습니다."}</p>

          <h3>BLUE 요약</h3>
          <p>{summary.BLUE || "요약된 BLUE 의견이 없습니다."}</p>
        </div>
      )}
    </div>
  );
};

export default OpinionSummaryItem;
