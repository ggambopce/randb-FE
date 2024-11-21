import Header from "../components/Header";
import Button from "../components/Button";
import PostList from "../components/PostList";

const Home = () => {
    return (
        <div>
            <Header title={"RED & BLUE 찬반토론"}
                rightChild={<Button text={"회원가입"}/>
                } 
            />
            <PostList />
        </div>
    )
}

export default Home;