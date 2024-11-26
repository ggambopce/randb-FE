import { useEffect, useState } from "react";
import { getOne } from "../api/postApi";

const initState = {
    id:0,
    postTitle: '',
    postContent: '', 
}



const ReadComponent = ({id}) => {
    
    const [post, setPost] = useState(initState)
    
    useEffect(()=> {

        getOne(id).then(data => {
            console.log(data)
            setPost(data)
        })

    }, [id]);

    return (
        <div>

        </div>
    );
}

export default ReadComponent;