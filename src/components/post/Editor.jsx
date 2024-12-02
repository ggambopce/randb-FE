
import "./Editor.css";
import Button from "../Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Editor = ({ initData,onSubmit}) => {
    const [input, setInput] = useState({
        postTitle: "",
        postContent: "",
    });

    const [loading, setLoading] = useState(false); // 로딩 상태 추가
    const nav = useNavigate();

    useEffect(() => {
        if(initData){
            setInput({
                ...initData
            })
        }
    }, [initData])

    const onChangeInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setInput({
            ...input,
            [name]: value,
        })
    }

    const onClickSubmitButton = async () => {
        if (!input.postTitle || !input.postContent) {
            alert("모든 필드를 작성해주세요.");
            return;
        }

        setLoading(true); // 로딩 상태 활성화
        try {
            await onSubmit(input); // 전달받은 onSubmit으로 API 호출
            alert("작성 완료!");
            nav("/", { replace: true }); // 작성 후 홈으로 이동
        } catch (err) {
            console.error("작성 중 오류 발생:", err);
            alert("작성 중 오류가 발생했습니다.");
        } finally {
            setLoading(false); // 로딩 상태 해제
        }
    };
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
            <Button 
                onClick={() => nav(-1)}
                text={"취소하기"} />
            <Button 
                onClick={onClickSubmitButton}
                text={loading ? "작성중..." : "작성완료"} // 로딩 상태 표시
                    type={"POSITIVE"}
                    disabled={loading} // 로딩 중 버튼 비활성화 
            />

        </section>
    </div>
    )
}

export default Editor;