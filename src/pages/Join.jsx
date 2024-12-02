
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import Signup from "../components/account/Signup";

const Join = () => {
   
    const nav = useNavigate();

    return (
        <div>
            <Header 
                title={"회원 가입"}
                leftChild={
                    <Button 
                        onClick={()=> nav(-1)}
                        text={"< 뒤로가기"} />}
                rightChild={
                    <Button 
                        onClick={()=> nav(`/`)}
                        text={"Home"} />}
            />
            <Signup />
        </div>
    )
}

export default Join;