import { useParams, useNavigate, Navigate, replace } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useContext, useEffect, useState } from "react";
import { PostDispatchContext, PostStateContext } from "../App";
import usePost from "../hooks/usePost";

const Edit = () => {
    const params = useParams();
    const nav = useNavigate();
    const { onDelete, onUpdate } = useContext(PostDispatchContext);
    const curPostItem = usePost(params.id);
    
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