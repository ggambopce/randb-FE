import "./EditorProfile.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import { addProfile } from "../../api/profileApi";

const EditorProfile = ({ initData }) => {
    const [input, setInput] = useState({
        nickname: "",
        gender: "",
        age: "",
        bio: "",
        instagramUrl: "",
        blogUrl: "",
        youtubeUrl: "",
    });

    const [file, setFile] = useState(null); // 프로필 이미지 파일 상태
    const [loading, setLoading] = useState(false); // 로딩 상태
    const nav = useNavigate();

    // 초기값 설정
    useEffect(() => {
        if (initData) {
            setInput({
                ...initData,
                age: initData.age ? initData.age.split("T")[0] : "", // "YYYY-MM-DD"
        });
        }
    }, [initData]);

    // 입력 필드 변경 핸들러
    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value,
        });
    };

    // 파일 변경 핸들러
    const onChangeFile = (e) => {
        setFile(e.target.files[0]);
    };

    // 제출 버튼 클릭 핸들러
    const onClickSubmitButton = async () => {
        if (!input.nickname || !input.gender || !input.age) {
            alert("필수 입력 필드를 작성해주세요.");
            return;
        }

        setLoading(true); // 로딩 상태 활성화
        try {
            await addProfile(input, file);
            nav("/", { replace: true }); // 작성 후 홈으로 이동
        } catch (err) {
            console.error("프로필 작성 중 오류 발생:", err);
            alert("프로필 작성 중 오류가 발생했습니다.");
        } finally {
            setLoading(false); // 로딩 상태 해제
        }
    };
    
    return (
        <div className="ProfileEditor">
            <section className="profile_section">
                <h4>별명</h4>
                <input
                    name="nickname"
                    value={input.nickname}
                    onChange={onChangeInput}
                    placeholder="별명을 입력해주세요"
                    required
                />

                <h4>성별</h4>
                <select
                    name="gender"
                    value={input.gender}
                    onChange={onChangeInput}
                    required
                >
                    <option value="">성별 선택</option>
                    <option value="MALE">남성</option>
                    <option value="FEMALE">여성</option>
                </select>

                <h4>생년월일</h4>
                <input
                    name="age"
                    type="date"
                    value={input.age}
                    onChange={onChangeInput}
                    required
                />

                <h4>자기소개</h4>
                <textarea
                    name="bio"
                    value={input.bio}
                    onChange={onChangeInput}
                    placeholder="자기소개를 작성해주세요 (최대 500자)"
                />

                <h4>Instagram URL</h4>
                <input
                    name="instagramUrl"
                    value={input.instagramUrl}
                    onChange={onChangeInput}
                    placeholder="Instagram URL을 입력해주세요"
                />

                <h4>Blog URL</h4>
                <input
                    name="blogUrl"
                    value={input.blogUrl}
                    onChange={onChangeInput}
                    placeholder="Blog URL을 입력해주세요"
                />

                <h4>YouTube URL</h4>
                <input
                    name="youtubeUrl"
                    value={input.youtubeUrl}
                    onChange={onChangeInput}
                    placeholder="YouTube URL을 입력해주세요"
                />

                <h4>프로필 이미지</h4>
                <input
                    type="file"
                    onChange={onChangeFile}
                    accept="image/*"
                />
            </section>

            <section className="button_section">
                <Button onClick={() => nav(-1)} text="취소하기" />
                <Button
                    onClick={onClickSubmitButton}
                    text={loading ? "작성중..." : "작성완료"}
                    type="POSITIVE"
                    disabled={loading} // 로딩 중 버튼 비활성화
                />
            </section>
        </div>
    );
}

export default EditorProfile;

