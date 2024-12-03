import { useParams, useNavigate, useLocation, Navigate, replace } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/post/Editor";
import { useContext } from "react";
import { PostDispatchContext } from "../App";
import usePost from "../hooks/usePost";

const Edit = () => {
    const params = useParams();
    const nav = useNavigate();
    const { onDelete, onUpdate } = useContext(PostDispatchContext);
    const location = useLocation();
    

    const onClickDelete = () => {
        if(
            window.confirm("토론을 정말 삭제할까요?")
        ) {
            onDelete(params.id);
            nav("/", { replace: true});
        }
    };

    const onSubmit = (input) => {
        if (window.confirm("토론을 정말 수정할까요?")){
            onUpdate(
                params.id, 
                input.postTitle, 
                input.postContent
            );
            nav("/", {replace: true});
        };    
    }
    // Post 컴포넌트에서 전달받은 데이터
    const curPostItem = location.state;

    // curPostItem이 없으면 usePost 훅을 사용하여 데이터 가져오기
    const { curPostItem: fetchedPostItem, loading } = usePost(params.id);
    const postData = curPostItem || fetchedPostItem;

    // 게시글 데이터를 가져오는 중이거나 데이터가 없는 경우 처리
    if (!curPostItem) {
        return (
            <div>
                <Header title="로딩 중..." />
                <p>게시글 데이터를 불러오는 중입니다.</p>
            </div>
        );
    }

    return (
        <div>
            <Header
                title={"토론 수정하기"}
                leftChild={
                    <Button onClick={()=>nav(-1)} text={"< 뒤로 가기"} />}
                rightChild={
                    <Button 
                        onClick={onClickDelete}
                        text={"삭제하기"} type={"NEGATIVE"} />}
            />
            <Editor initData={curPostItem} onSubmit={onSubmit} />
        </div>
    )
}

export default Edit;