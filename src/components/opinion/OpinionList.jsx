import React from "react";
import OpinionItem from "./OpinionItem";
import "./OpinionList.css";

const OpinionList = ({ opinions, setOpinions }) => {
  const handleOpinionUpdate = (id, updatedContent) => {
    setOpinions((prevOpinions) =>
      prevOpinions.map((opinion) =>
        opinion.id === id ? { ...opinion, opinionContent: updatedContent } : opinion
      )
    );
  };

  const handleOpinionDelete = (id) => {
    setOpinions((prevOpinions) => prevOpinions.filter((opinion) => opinion.id !== id));
  };

  return (
    <div className="opinion-list">
      <h3>의견 목록</h3>
      {opinions.length === 0 ? (
        <p>의견이 없습니다.</p>
      ) : (
        opinions
        .filter((opinion) => opinion) // null 또는 undefined 방지
        .map((opinion) => (
          
          <OpinionItem
            key={opinion.id}
            opinion={opinion}
            onOpinionUpdate={handleOpinionUpdate}
            onOpinionDelete={handleOpinionDelete}
          />
        ))
      )}
    </div>
  );
};

export default OpinionList;
