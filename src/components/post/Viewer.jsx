import "./Viewer.css";
import { updatePost, deletePost } from "../../api/postApi";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";


const Viewer = ({ 
    id,
    postTitle, 
    postContent, 
    nickname,
    profileId, 
    postType, 
    likeCount, 
    onLike,
    opinions = [] 
   }) => { // 토론글 상태 추가
    
    const nav = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null); 

  // 프로필 페이지 이동 함수 추가
  const handleProfileClick = () => {
    console.log("닉네임 클릭됨! profileId:", profileId); // 디버깅 로그 추가
    if (profileId) {
        console.log(`🔗 이동할 URL: /detailprofile/${profileId}`);
        nav(`/detailprofile/${profileId}`);
    } else {
        console.warn("⚠️ 프로필 ID가 존재하지 않습니다!");
    }
};

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

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  return (
    <div className="Viewer">
      <section className="post_side_section"> 
        {/* 토론 상태 표시 */}
        <div className="status_wrapper">
          <span>{postType === "DISCUSSING" ? "토론 중" : postType === "VOTING" ? "투표 중" : "토론 완료"}</span>
        </div>
        {/* 더보기 버튼 */}
        <div className="more_options" ref={menuRef}>
    <button onClick={() => setMenuOpen(!menuOpen)}>⋮</button>
    {menuOpen && (
      <div className="dropdown_menu">
        {opinions.length === 0 && ( // 의견이 없을 때만 수정 버튼 표시
                                <button onClick={() => { handleEdit(); setMenuOpen(false); }}>수정</button>
                            )}
        <button className="text-red-600" onClick={() => { handleDelete(); setMenuOpen(false); }}>삭제</button>
      </div>
    )}
</div>
        {/* 작성자 */}
        {nickname && (
          <div className="username_wrapper">
            <span>
              작성자: 
              <strong 
                className="clickable_nickname" // 클릭 가능한 스타일 추가
                onClick={() => handleProfileClick()}
              >
               {nickname}
              </strong>
            </span>
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
