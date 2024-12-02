import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import Login from "../components/account/Login";

const LoginPage = () => {
   
    const nav = useNavigate();

    return (
        <div>
            <Header 
                title={"로그인"}
                leftChild={
                    <Button 
                        onClick={()=> nav(-1)}
                        text={"< 뒤로가기"} />}
                rightChild={
                    <Button 
                        onClick={()=> nav(`/`)}
                        text={"Home"} />}
            />
            <Login />
        </div>
    )
}

export default LoginPage;