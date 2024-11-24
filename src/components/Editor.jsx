
import "./Editor.css";
import Button from "./Button";
import { useState } from "react";

const Editor = ({onSubmit}) => {
    const [input, setInput] = useState({
        postTitle: "",
        postContent: "",
    });

    const onChangeInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setInput({
            ...input,
            [name]: value,
        })
    }

    const onClickSubmitButton = () => {
        onSubmit(input);
    }

    return( 
    <div className="Editor">
        <section className="post_section">
            <h4>토론 주제</h4>
            <input 
                name="postTitle"
                value={input.postTitle}
                onChange={onChangeInput}
                placeholder="나누고 싶은 주제를 작성해주세요" />
            <h4>토론 내용</h4>
            <textarea
                name="postContent"
                value={input.postContent}
                onChange={onChangeInput}
                placeholder="주제에 대한 내용과 RED와 BLUE의 기준을 작성해주세요" /> 

        </section>
        <section className="button_section">
            <Button text={"취소하기"} />
            <Button 
                onClick={onClickSubmitButton}
                text={"작성완료"} 
                type={"POSITIVE"} />

        </section>
    </div>
    )
}

export default Editor;