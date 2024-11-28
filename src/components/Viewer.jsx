import "./Viewer.css";

const Viewer = ({ postTitle, postContent, username }) => {
  return (
    <div className="Viewer">
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

      {/* 작성자 및 보조 섹션 */}
      <section className="post_side_section">
        {username && (
          <div className="username_wrapper">
            <span>작성자: <strong>{username}</strong></span>
          </div>
        )}
        <div className="action_buttons">
          <button className="like_button">좋아요</button>
          <button className="bookmark_button">즐겨찾기</button>
        </div>
      </section>
    </div>
  );
};

export default Viewer;
