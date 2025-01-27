import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import ViewerProfile from "../components/profile/ViewerProfile";
import { getOneProfile } from "../api/profileApi";


const Profile = () => {

    const { id } = useParams(); // URL에서 profileId 추출
    const nav = useNavigate();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getOneProfile(id); // 프로필 조회 API 호출
                setProfile(data.data); // 응답 데이터 설정
            } catch (err) {
                console.error("프로필 정보를 가져오는 데 실패했습니다:", err);
                setError("프로필 정보를 불러오지 못했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [id]);

    if (loading) {
        return (
            <div>
                <Header title="로딩 중..." />
                <p>프로필 데이터를 불러오는 중입니다.</p>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <Header title="오류" />
                <p>{error}</p>
                <Button onClick={() => nav(-1)} text={"< 뒤로 가기"} />
            </div>
        );
    }

    if (!profile) {
        return (
            <div>
                <Header title="프로필 없음" />
                <p>해당 프로필이 존재하지 않습니다.</p>
                <Button onClick={() => nav(-1)} text={"< 뒤로 가기"} />
            </div>
        );
    }

    return (
        <div>
            <Header
                title={"프로필 조회"}
                leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로 가기"} />}
            />
            <ViewerProfile profileId={id} />
        </div>
    );
}

export default Profile;