import "./Viewer.css";

const Viewer = ({ 
    postTitle, 
    postContent, 
    nickname, 
    postType, 
    likeCount, 
    onLike }) => { // 토론글 상태 추가
  return (
    <div className="Viewer">
      <section className="post_side_section"> 
        {/* 토론 상태 표시 */}
        <div className="status_wrapper">
          <span>{postType === "DISCUSSING" ? "토론 중" : postType === "VOTING" ? "투표 중" : "토론 완료"}</span>
        </div>
        {/* 작성자 */}
        {nickname && (
          <div className="username_wrapper">
            <span>작성자: <strong>{nickname}</strong></span>
          </div>
        )}
        <div className="action_buttons">
        <button className="like_button" onClick={onLike}>
            좋아요 {likeCount > 0 && `(${likeCount})`}
          </button>
        </div>
      </section>

      {/* 주제와 내용 섹션 */}
      <section className="post_main_section">
        <div className="post_header">
          <h4>토론 주제</h4>
          <div className="title_wrapper">
            <p>{postTitle}</p>
          </div>
        </div>
        <div className="post_body">
          <h4>토론 내용</h4>
          <div className="content_wrapper">
            <p>{postContent}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Viewer;
