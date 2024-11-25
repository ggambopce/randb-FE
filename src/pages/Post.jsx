import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Viewer from "../components/Viewer";
import usePost from "../hooks/usePost";

const Post = () => {
    const params = useParams();
    const nav = useNavigate();

    const curPostItem = usePost(params.id);

    if (!curPostItem) {
        return <div>데이터 로딩중...</div>
    }

    const { postTitle, postContent } = curPostItem;

    return (
        <div>
            <Header 
                title={"토론 상세페이지"}
                leftChild={
                    <Button 
                        onClick={()=> nav(-1)}
                        text={"< 뒤로가기"} />}
                rightChild={
                    <Button 
                        onClick={()=> nav(`/updatepost/${params.id}`)}
                        text={"수정하기"} />}
            />
            <Viewer postTitle={postTitle} postContent={postContent} />
        </div>
    )
}

export default Post;