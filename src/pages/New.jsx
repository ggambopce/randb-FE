import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/post/Editor";
import { useNavigate } from "react-router-dom";
import { addPost } from "../api/postApi";

const New = () => {
    const nav = useNavigate();
    
    const onSubmit = async (input) => {
        try {
            // API 호출로 데이터를 백엔드에 저장
            await addPost({
                postTitle: input.postTitle,
                postContent: input.postContent,
            });
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