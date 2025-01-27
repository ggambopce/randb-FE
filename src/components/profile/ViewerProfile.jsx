import React, { useEffect, useState } from "react";
import { getOneProfile } from "../../api/profileApi";

const ViewerProfile = ({ profileId }) => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getOneProfile(profileId);
        setProfile(data.data.profile); // 응답에서 `data` 사용
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

      {/* 프로필 이미지 */}
      {profile.profileImgUrl && (
        <div>
          <img
            src={profile.profileImgUrl}
            alt={`${profile.nickname}의 프로필 이미지`}
            style={{ width: "150px", height: "150px", borderRadius: "50%" }}
          />
        </div>
      )}

      {/* 프로필 정보 */}
      <p>닉네임: {profile.nickname}</p>
      <p>성별: {profile.gender}</p>
      <p>생년월일: {profile.age}</p>
      <p>자기소개: {profile.bio}</p>

      {/* 실명 및 이메일 */}
      {profile.account && (
        <>
          <p>실명: {profile.account.username}</p>
          <p>이메일: {profile.account.email}</p>
        </>
      )}

      {/* 소셜 미디어 링크 */}
      {profile.instagramUrl && (
        <p>
          Instagram: <a href={profile.instagramUrl} target="_blank" rel="noopener noreferrer">{profile.instagramUrl}</a>
        </p>
      )}
      {profile.blogUrl && (
        <p>
          Blog: <a href={profile.blogUrl} target="_blank" rel="noopener noreferrer">{profile.blogUrl}</a>
        </p>
      )}
      {profile.youtubeUrl && (
        <p>
          YouTube: <a href={profile.youtubeUrl} target="_blank" rel="noopener noreferrer">{profile.youtubeUrl}</a>
        </p>
      )}
    </div>
  );
};

export default ViewerProfile;
