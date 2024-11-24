import { useParams, useNavigate, Navigate, replace } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useContext, useEffect, useState } from "react";
import { PostDispatchContext, PostStateContext } from "../App";

const Edit = () => {
    const params = useParams();
    const nav = useNavigate();
    const { onDelete } = useContext(PostDispatchContext);
    const data = useContext(PostStateContext);
    const [ curPostItem, setCurPostItem ] = useState();

    useEffect(() => {
        const currentPostItem = data.find(
            (item) => String(item.id) === String(params.id)
        );

        if(!currentPostItem) {
            window.alert("존재하지 않는 토론입니다.");
            nav("/", { replace: true });
        }

        setCurPostItem(currentPostItem);
    }, [params.id, data])

    const onClickDelete = () => {
        if(
            window.confirm("토론을 정말 삭제할까요?")
        ) {
            onDelete(params.id);
            nav("/", { replace: true});
        }
    };

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
            <Editor initData={curPostItem} />
        </div>
    )
}

export default Edit;