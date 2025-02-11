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

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    useEffect(() => {
        if (initData) {
            setInput({
                ...initData,
                age: initData.age ? initData.age.split("T")[0] : "",
            });
        }
    }, [initData]);

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setInput({
            ...input,
            [name]: value,
        });
    };

    const onChangeFile = (e) => {
        setFile(e.target.files[0]);
    };

    const onClickSubmitButton = async () => {
        if (!input.nickname || !input.gender || !input.age) {
            alert("필수 입력 필드를 작성해주세요.");
            return;
        }

        setLoading(true);
        try {
            await addProfile(input, file);
            nav("/", { replace: true });
        } catch (err) {
            console.error("프로필 작성 중 오류 발생:", err);
            alert("프로필 작성 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="EditorProfile">
            <h2>프로필 수정</h2>

            <section className="profile-form">
                <label>별명</label>
                <input
                    name="nickname"
                    value={input.nickname}
                    onChange={onChangeInput}
                    placeholder="별명을 입력해주세요"
                    required
                />

                <label>성별</label>
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

                <label>생년월일</label>
                <input
                    name="age"
                    type="date"
                    value={input.age}
                    onChange={onChangeInput}
                    required
                />

                <label>자기소개</label>
                <textarea
                    name="bio"
                    value={input.bio}
                    onChange={onChangeInput}
                    placeholder="자기소개를 작성해주세요 (최대 500자)"
                />

                <label>Instagram URL</label>
                <input
                    name="instagramUrl"
                    value={input.instagramUrl}
                    onChange={onChangeInput}
                    placeholder="Instagram URL을 입력해주세요"
                />

                <label>Blog URL</label>
                <input
                    name="blogUrl"
                    value={input.blogUrl}
                    onChange={onChangeInput}
                    placeholder="Blog URL을 입력해주세요"
                />

                <label>YouTube URL</label>
                <input
                    name="youtubeUrl"
                    value={input.youtubeUrl}
                    onChange={onChangeInput}
                    placeholder="YouTube URL을 입력해주세요"
                />

                <label>프로필 이미지</label>
                <input type="file" onChange={onChangeFile} accept="image/*" />
            </section>

            <section className="button-section">
                <Button onClick={() => nav(-1)} text="취소하기" />
                <Button
                    onClick={onClickSubmitButton}
                    text={loading ? "작성중..." : "작성완료"}
                    type="POSITIVE"
                    disabled={loading}
                />
            </section>
        </div>
    );
};

export default EditorProfile;
