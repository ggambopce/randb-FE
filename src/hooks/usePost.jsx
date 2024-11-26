import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getOne } from "../api/postApi";


const usePost = (id) => {
    const [ curPostItem, setCurPostItem ] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const nav= useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const result = await getOne(id); // getOne API 호출
                if (!result) {
                    throw new Error("존재하지 않는 토론입니다.");
                }
                setCurPostItem(result.data.post);
            } catch (err) {
                console.error(err);
                setError(err.message);
                window.alert("존재하지 않는 토론입니다.");
                nav("/", { replace: true });
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPost();
        }
    }, [id]);

    return { curPostItem, loading, error }; // 상태 반환
};

export default usePost;