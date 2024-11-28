import React, { useState } from "react";
import axios from "axios";
import "./OpinionEditor.css";

const OpinionEditor = ({ postId }) => {
  const [opinionContent, setOpinionContent] = useState("");
  const [opinionType, setOpinionType] = useState("RED");

  const handleSubmit = async () => {
    if (!opinionContent.trim()) {
      alert("의견 내용을 입력하세요.");
      return;
    }

    try {
      // 의견 작성 API 호출
      await axios.post(`http://localhost:8080/api/opinions`, {
        postId,
        opinionContent,
        opinionType,
      });
      alert("의견이 추가되었습니다.");
      setOpinionContent(""); // 입력 필드 초기화
    } catch (err) {
      console.error("의견 추가 실패:", err);
      alert("의견을 추가하는 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="opinion-editor">
      <h3>의견 작성</h3>
      <textarea
        value={opinionContent}
        onChange={(e) => setOpinionContent(e.target.value)}
        placeholder="의견을 입력하세요"
      />
      <select
        value={opinionType}
        onChange={(e) => setOpinionType(e.target.value)}
      >
        <option value="RED">RED</option>
        <option value="BLUE">BLUE</option>
      </select>
      <button onClick={handleSubmit}>의견 추가</button>
    </div>
  );
};

export default OpinionEditor;
