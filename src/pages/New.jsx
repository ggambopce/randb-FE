import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { PostDispatchContext } from "../App";

const New = () => {
    const { onCreate } = useContext(PostDispatchContext);
    const nav = useNavigate();
    
    const onSubmit = (input) => {
        onCreate(
            input.postTitle, 
            input.postContent
        );
        nav('/', {replace: true})
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