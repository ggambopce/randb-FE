import { useParams } from "react-router-dom";

const Post = () => {

    const params = useParams();

    return (
        <div>
            {params.id}번 토론입니다!!
        </div>
    )
}

export default Post;