import "./Viewer.css";
import { updatePost, deletePost } from "../../api/postApi";
import { useNavigate } from "react-router-dom";

const Viewer = ({ 
    id,
    postTitle, 
    postContent, 
    nickname, 
    postType, 
    likeCount, 
    onLike }) => { // 토론글 상태 추가
      const nav = useNavigate();

    // 수정 페이지로 이동하는 함수
    const handleEdit = () => {
      nav(`/updatepost/${id}`, { 
          state: { id, postTitle, postContent, nickname, postType } 
      });
  };

  // 게시글 삭제 함수
  const handleDelete = async () => {
      const confirmDelete = window.confirm("정말 이 게시글을 삭제하시겠습니까?");
      if (confirmDelete) {
          try {
              await deletePost(id);
              alert("게시글이 삭제되었습니다.");
              nav("/"); // 삭제 후 메인 페이지로 이동
          } catch (error) {
              console.error("게시글 삭제 실패:", error);
              alert("게시글 삭제에 실패했습니다.");
          }
      }
  };



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
          <button className="edit_button" onClick={handleEdit}>수정</button>
          <button className="delete_button" onClick={handleDelete}>삭제</button>
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
