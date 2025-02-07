import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/post/Editor";
import { useNavigate } from "react-router-dom";
import { addPost } from "../api/postApi";

const New = () => {
    const nav = useNavigate();
    
    const onSubmit = async (input) => {
    // 사용자에게 확인 메시지 표시
    const confirmSubmit = window.confirm("의견이 작성되면 토론을 수정할 수 없습니다.\n토론을 정말 작성할까요?");
    
    if (!confirmSubmit) {
        return; // 사용자가 취소를 누르면 함수 종료
    }

        try {
            // API 호출로 데이터를 백엔드에 저장
            await addPost({
                postTitle: input.postTitle,
                postContent: input.postContent,
            });
            alert("토론글 작성 완료!");

            nav("/", { replace: true }); // 메인 페이지로 이동
        } catch (err) {
            console.error("Failed to create new post:", err);
        }
    };
    return (
        <div>
            <Header 
                title={"새 토론 작성"}
                leftChild={
                    <Button 
                        onClick={() => nav(-1)}
                        text={"< 뒤로 가기"} />}
            />
            <Editor onSubmit={onSubmit}/>
            

        </div>
    )
}

export default New;