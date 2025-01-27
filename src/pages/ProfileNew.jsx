import Header from "../components/Header";
import Button from "../components/Button";
import EditorProfile from "../components/profile/EditorProfile";
import { useNavigate } from "react-router-dom";
import { addProfile } from "../api/profileApi";

const ProfileNew = () => {
    const nav = useNavigate();

    const onSubmit = async (input, file) => {
        try {
            // API 호출로 데이터를 백엔드에 저장
            await addProfile(
                {
                    nickname: input.nickname,
                    gender: input.gender,
                    age: input.age,
                    bio: input.bio,
                    instagramUrl: input.instagramUrl,
                    blogUrl: input.blogUrl,
                    youtubeUrl: input.youtubeUrl,
                },
                file // 업로드할 이미지 파일
            );
            nav("/", { replace: true }); // 메인 페이지로 이동
        } catch (err) {
            console.error("Failed to create new profile:", err);
            alert("프로필 생성에 실패했습니다.");
        }
    };

    return (
        <div>
            <Header
                title={"새 프로필 작성"}
                leftChild={
                    <Button onClick={() => nav(-1)} text={"< 뒤로 가기"} />
                }
            />
            <EditorProfile onSubmit={onSubmit} />
        </div>
    );



}

export default ProfileNew;
