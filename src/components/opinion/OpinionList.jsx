import React, { useEffect, useState } from "react";
import axios from "axios";
import OpinionItem from "./OpinionItem";
import "./OpinionList.css";

const OpinionList = ({ postId }) => {
  const [opinions, setOpinions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOpinions = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/opinions`, {
          params: { postId },
        });
        setOpinions(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOpinions();
  }, [postId]); // postId 변경 시 새로 데이터 가져오기

  if (loading) return <div>의견 로딩중...</div>;
  if (error) return <div>의견 불러오기 실패: {error}</div>;

  return (
    <div className="opinion-list">
      <h3>의견 목록</h3>
      {opinions.length === 0 ? (
        <p>의견이 없습니다.</p>
      ) : (
        opinions.map((opinion) => (
          <OpinionItem key={opinion.create_at} opinion={opinion} />
        ))
      )}
    </div>
  );
};

export default OpinionList;
