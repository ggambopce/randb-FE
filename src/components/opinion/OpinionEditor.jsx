import React, { useState } from "react";
import { useParams } from "react-router-dom";

import "./OpinionEditor.css";
import Button from "../Button";

const OpinionEditor = ({ postId, onSubmit }) => {
  const [input, setInput] = useState({
    opinionContent: "",
    opinionType: "RED",
  });
  const [loading, setLoading] = useState(false); // 로딩 상태 추가

  // 입력 필드 변경 핸들러
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  // 제출 버튼 클릭 핸들러
  const onClickSubmitButton = async () => {
    if (!input.opinionContent.trim()) {
      alert("의견 내용을 입력하세요.");
      return;
    }

    if (typeof onSubmit !== "function") {
      alert("의견 제출 기능이 정의되지 않았습니다.");
      return;
    }

    setLoading(true); // 로딩 상태 활성화
    try {
      await onSubmit({
        postId, // 게시글 ID
        ...input, // 의견 데이터
      });
      alert("의견이 추가되었습니다.");
      setInput({ opinionContent: "", opinionType: "RED" }); // 입력 필드 초기화
    } catch (err) {
      console.error("의견 작성 중 오류 발생:", err);
      alert("의견 작성 중 오류가 발생했습니다.");
    } finally {
      setLoading(false); // 로딩 상태 해제
    }
  };

  return (
    <div className="opinion-editor">
      <h3>의견 작성</h3>
      <textarea
        name="opinionContent"
        value={input.opinionContent}
        onChange={onChangeInput}
        placeholder="의견을 입력하세요"
      />
      <select
        name="opinionType"
        value={input.opinionType}
        onChange={onChangeInput}
      >
        <option value="RED">RED</option>
        <option value="BLUE">BLUE</option>
      </select>
      <div className="button-section">
        <Button
          onClick={onClickSubmitButton}
          text={loading ? "작성중..." : "의견 추가"} // 로딩 상태 표시
          disabled={loading} // 로딩 중 버튼 비활성화
        />
      </div>
    </div>
  );
};

export default OpinionEditor;
