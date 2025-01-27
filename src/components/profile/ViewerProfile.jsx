import React, { useEffect, useState } from "react";
import { getOneProfile } from "../../api/profileApi";

const ViewerProfile = ({ profileId }) => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getOneProfile(profileId);
        setProfile(data.data); // 응답에서 `data` 사용
      } catch (err) {
        setError("프로필 정보를 가져오는 데 실패했습니다.");
      }
    };

    fetchProfile();
  }, [profileId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!profile) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <h2>프로필 상세 정보</h2>
      <p>닉네임: {profile.nickname}</p>
      <p>성별: {profile.gender}</p>
      <p>생년월일: {profile.age}</p>
      <p>자기소개: {profile.bio}</p>
      {profile.instagramUrl && <p>Instagram: <a href={profile.instagramUrl}>{profile.instagramUrl}</a></p>}
      {profile.blogUrl && <p>Blog: <a href={profile.blogUrl}>{profile.blogUrl}</a></p>}
      {profile.youtubeUrl && <p>YouTube: <a href={profile.youtubeUrl}>{profile.youtubeUrl}</a></p>}
    </div>
  );
};

export default ViewerProfile;
