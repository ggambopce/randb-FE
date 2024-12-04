import React, { useEffect, useState } from "react";
import OpinionItem from "./OpinionItem";
import "./OpinionList.css";

const OpinionList = ({ postId, opinions }) => {
  
  return (
    <div className="opinion-list">
      <h3>의견 목록</h3>
      {opinions.length === 0 ? (
        <p>의견이 없습니다.</p>
      ) : (
        opinions.map((opinion, index) => (
          <OpinionItem 
            key={opinion.id || opinion.create_at || index} // 순서대로 대체
            opinion={opinion}
          />
        ))
      )}
    </div>
  );
};

export default OpinionList;
