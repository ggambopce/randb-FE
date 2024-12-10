import React, { useState } from "react";
import "./OpinionItem.css";
import { updateOpinion, deleteOpinion } from "../../api/opinionApi";

const OpinionItem = ({ opinion, onOpinionUpdate, onOpinionDelete }) => {
  const { id, opinionContent, username, opinionType, create_at } = opinion;
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(opinionContent);

  const handleUpdate = async () => {
    try {
      await updateOpinion(id, { opinionContent: editedContent, opinionType });
      alert("의견이 수정되었습니다.");
      onOpinionUpdate(id, editedContent); // 부모 컴포넌트에 수정된 데이터 전달
      setIsEditing(false); // 수정 모드 종료
    } catch (err) {
      console.error("의견 수정 실패:", err);
      alert("의견 수정 중 오류가 발생했습니다.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      try {
        await deleteOpinion(id);
        alert("의견이 삭제되었습니다.");
        onOpinionDelete(id); // 부모 컴포넌트에 삭제 알림
      } catch (err) {
        console.error("의견 삭제 실패:", err);
        alert("의견 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className={`opinion-item ${opinionType.toLowerCase()}`}>
      <div className="opinion-header">
        <strong className="opinion-type">{opinionType}</strong>
        <span className="opinion-user">작성자: {username}</span>
        <span className="opinion-date">{new Date(create_at).toLocaleString()}</span>
      </div>
      {isEditing ? (
        <div className="opinion-edit">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <button onClick={handleUpdate} className="small-button save-button">
            저장
          </button>
          <button onClick={() => setIsEditing(false)} className="small-button cancel-button">
            취소
          </button>
        </div>
      ) : (
        <div className="opinion-content">
          <p>{opinionContent}</p>
          <div className="opinion-actions">
            <button onClick={() => setIsEditing(true)} className="small-button edit-button">
              수정
            </button>
            <button onClick={handleDelete} className="small-button delete-button">
              삭제
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpinionItem;
 