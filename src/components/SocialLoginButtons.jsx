import "./SocialLoginButtons.css";

const SocialLoginButtons = () => {
    const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth?client_id=543606885868-pfvasbjji7ufkg2c3kc2q0388s9i48ch.apps.googleusercontent.com&redirect_uri=http://localhost:8080/login/oauth2/code/google&response_type=code&scope=email profile";
    const NAVER_AUTH_URL = "https://nid.naver.com/oauth2.0/authorize?client_id=fAtYeWygXzFVymRFNVnt&redirect_uri=http://localhost:8080/login/oauth2/code/naver&response_type=code";

    return (
        <div className="SocialLoginButtons">
            <button className="GoogleLoginButton" onClick={() => window.location.href = GOOGLE_AUTH_URL}>
                Google로 로그인
            </button>
            <button className="NaverLoginButton" onClick={() => window.location.href = NAVER_AUTH_URL}>
                Naver로 로그인
            </button>
        </div>
    );
};
export default SocialLoginButtons;
