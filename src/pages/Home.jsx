import { useState, useContext } from "react";
import { PostStateContext } from "../App";

import Header from "../components/Header";
import Button from "../components/Button";
import PostList from "../components/PostList";

const Home = () => {
    const data = useContext(PostStateContext);
    
    return (
        <div>
            <Header title={"RED & BLUE 찬반토론"}
                rightChild={<Button text={"회원가입"}/>
                } 
            />
            <PostList data={data}/>
        </div>
    )
}

export default Home;