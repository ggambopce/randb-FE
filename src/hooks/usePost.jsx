import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getOne } from "../api/postApi";


const usePost = (id) => {
    const [ curPostItem, setCurPostItem ] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const nav= useNavigate();

    const fetchPost = async () => {
        try {
            setLoading(true); // 로딩 상태 설정
            const result = await getOne(id); // getOne API 호출
            
            if (result?.data?.post) {
                setCurPostItem(result.data.post); // 게시글 데이터 설정
            } else {
                throw new Error("존재하지 않는 토론입니다.");
            }
        } catch (err) {
            console.error(err);
            setError(err.message);
            window.alert("존재하지 않는 토론입니다.");
            nav("/", { replace: true });
        } finally {
            setLoading(false); // 로딩 상태 해제
        }
    };

    useEffect(() => {
        if (id) {
            fetchPost(); // 컴포넌트가 마운트될 때 데이터 로드
        }
    }, [id, nav]);

    const reload = fetchPost; // reload를 fetchPost 함수로 매핑

    return { curPostItem, loading, error, reload }; // reload 반환
};


export default usePost;