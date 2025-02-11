import React, { useEffect, useState } from "react";
import { getOneProfile } from "../../api/profileApi";
import "./ViewerProfile.css"; // CSS 파일 임포트

const ViewerProfile = ({ profileId }) => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getOneProfile(profileId);
        setProfile(data.data.profile);
      } catch (err) {
        setError("프로필 정보를 가져오는 데 실패했습니다.");
      }
    };

    fetchProfile();
  }, [profileId]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!profile) {
    return <div className="loading-message">로딩 중...</div>;
  }

  return (
    <div className="ViewerProfile">
      <h2>프로필 상세 정보</h2>

      {/* 프로필 이미지 */}
      {profile.profileImgUrl && (
        <div className="profile-image">
          <img
            src={profile.profileImgUrl}
            alt={`${profile.nickname}의 프로필 이미지`}
          />
        </div>
      )}

      {/* 프로필 정보 */}
      <div className="profile-info">
        <p className="profile-bio"> {profile.bio}</p>
        <p><strong>닉네임:</strong> {profile.nickname}</p>
        <p><strong>성별:</strong> {profile.gender}</p>
        <p><strong>생년월일:</strong> {profile.age}</p>
        

        {/* 실명 및 이메일 */}
        {profile.account && (
          <>
            <p className="profile-realname"><strong>실명:</strong> {profile.account.username}</p>
            <p className="profile-email"><strong>이메일:</strong> {profile.account.email}</p>
          </>
        )}

      </div>

      {/* 소셜 미디어 링크 */}
      <div className="profile-links">
        {profile.instagramUrl && (
          <p>
            <strong>Instagram:</strong> <a href={profile.instagramUrl} target="_blank" rel="noopener noreferrer">{profile.instagramUrl}</a>
          </p>
        )}
        {profile.blogUrl && (
          <p>
            <strong>Blog:</strong> <a href={profile.blogUrl} target="_blank" rel="noopener noreferrer">{profile.blogUrl}</a>
          </p>
        )}
        {profile.youtubeUrl && (
          <p>
            <strong>YouTube:</strong> <a href={profile.youtubeUrl} target="_blank" rel="noopener noreferrer">{profile.youtubeUrl}</a>
          </p>
        )}
      </div>
    </div>
  );
};

export default ViewerProfile;
