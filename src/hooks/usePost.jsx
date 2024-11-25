import { useContext, useState, useEffect } from "react";
import { PostStateContext } from "../App";
import { useNavigate } from "react-router-dom";


const usePost = (id) => {
    const data = useContext(PostStateContext);
    const [ curPostItem, setCurPostItem ] = useState();
    const nav= useNavigate();

    useEffect(() => {
        const currentPostItem = data.find(
            (item) => String(item.id) === String(id)
        );

        if(!currentPostItem) {
            window.alert("존재하지 않는 토론입니다.");
            nav("/", { replace: true });
        }

        setCurPostItem(currentPostItem);
    }, [id, data])

    return curPostItem
}

export default usePost;