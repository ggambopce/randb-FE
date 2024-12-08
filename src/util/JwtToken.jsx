
// 일반로그인은 body에서 JWT토큰반환, 소셜로그인은 url에서 JWT토큰반환
export const extractJwtToken = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessTokenFromUrl = urlParams.get("access-token");
  
    if (accessTokenFromUrl) {

      // URL에서 토큰 추출 후 로컬스토리지에 저장
      localStorage.setItem("authToken", accessTokenFromUrl);
      return accessTokenFromUrl; // 소셜 로그인 토큰 반환
    }
  
    const storedToken = localStorage.getItem("authToken"); // 일반 로그인 저장 토큰
    if (storedToken) {
      return storedToken;
    }
  
    return null; // 토큰이 없는 경우
  };  
  