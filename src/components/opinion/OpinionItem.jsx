import React from "react";
import "./OpinionItem.css";

const OpinionItem = ({ opinion }) => {
  const { opinionContent, username, opinionType, create_at } = opinion;

  return (
    <div className={`opinion-item ${opinionType.toLowerCase()}`}>
      <div className="opinion-header">
        <strong className="opinion-type">{opinionType}</strong>
        <span className="opinion-user">작성자: {username}</span>
        <span className="opinion-date">{new Date(create_at).toLocaleString()}</span>
      </div>
      <div className="opinion-content">
        <p>{opinionContent}</p>
      </div>
    </div>
  );
};

export default OpinionItem;
