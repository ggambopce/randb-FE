import { useParams, useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/post/Editor";
import { useEffect, useState } from "react";
import { getOne, updatePost, deletePost } from "../api/postApi";

const Edit = () => {
    const params = useParams();
    const nav = useNavigate();
    const location = useLocation();

    const locationState = location.state;
    const [curPostItem, setCurPostItem] = useState(locationState || null);
    const [loading, setLoading] = useState(!locationState);

    useEffect(() => {
        if (!locationState) {
            // 데이터가 없다면 API 호출
            const fetchPost = async () => {
                try {
                    const result = await getOne(params.id);
                    setCurPostItem(result.data.post);
                } catch (err) {
                    console.error("게시글 불러오기 실패:", err);
                    alert("게시글을 불러오지 못했습니다.");
                    nav("/", { replace: true });
                } finally {
                    setLoading(false);
                }
            };
            fetchPost();
        }
    }, [params.id, locationState, nav]);

    const onClickDelete = async () => {
        if (window.confirm("토론을 정말 삭제할까요?")) {
            try {
                await deletePost(params.id);
                alert("삭제가 완료되었습니다.");
                nav("/", { replace: true });
            } catch (err) {
                console.error("삭제 중 오류:", err);
                alert("삭제 중 오류가 발생했습니다.");
            }
        }
    };

    const onSubmit = async (input) => {
        if (window.confirm("의견이 작성되면 토론을 수정할 수 없습니다.\n 토론을 정말 수정할까요?")) {
            try {
                await updatePost(params.id, input);
                alert("수정이 완료되었습니다!");
                nav("/", { replace: true });
            } catch (err) {
                console.error("수정 중 오류:", err);
                alert("수정 중 문제가 발생했습니다.");
            }
        }
    };

    if (loading) {
        return (
            <div>
                <Header title="로딩 중..." />
                <p>게시글 데이터를 불러오는 중입니다.</p>
            </div>
        );
    }

    if (!curPostItem) {
        return (
            <div>
                <Header title="오류" />
                <p>해당 게시글이 존재하지 않습니다.</p>
            </div>
        );
    }

    return (
        <div>
            <Header
                title={"토론 수정하기"}
                leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로 가기"} />}
                rightChild={
                    <Button onClick={onClickDelete} text={"삭제하기"} type={"NEGATIVE"} />
                }
            />
            <Editor initData={curPostItem} onSubmit={onSubmit} />
        </div>
    );
};

export default Edit;