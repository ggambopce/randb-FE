import axios from "axios"

export const API_SERVER_HOST = import.meta.env.VITE_API_BASE_URL || "https://jinorandb.com";

const prefix = `${API_SERVER_HOST}/api` 

// 로컬 스토리지에서 JWT 토큰 가져오기
const getAuthToken = () => localStorage.getItem("authToken");

export const getOne = async(id) => {
    const res = await axios.get(`${prefix}/user/detail/posts/${id}`)

    return res.data
}

export const getPosts = async(pageParam) => {

    const {page, size} = pageParam

    const res = await axios.get(`${prefix}/posts`, {params:{page,size}})

    return res.data 
}

export const mainPosts = async() => {
    const res = await axios.get(`${prefix}/main/posts`)

    return res.data
}

export const addPost = async(postData) => {
    const token = getAuthToken();
    const res = await axios.post(
        `${prefix}/user/posts`, 
        postData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )

    return res.data
}

export const updatePost = async (id, postData) => {
    const token = getAuthToken();
    const res = await axios.post(
        `${prefix}/user/update/posts/${id}`,
        postData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return res.data;
};

export const deletePost = async (id) => {
    const token = getAuthToken();
    const res = await axios.delete(
        `${prefix}/user/posts/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return res.data;
};

/**
 * 토론 검색 + 무한 스크롤 API (검색어 및 필터 적용)
 * @param {string} searchKeyword - 검색어 (제목, 내용 검색)
 * @param {string} postType - 토론 상태 ("DISCUSSING", "VOTING", "COMPLETED")
 * @param {number} page - 현재 페이지 번호
 * @param {number} size - 한 번에 가져올 게시글 개수
 */
export const searchPosts = async ({ searchKeyword = "", postType = "", page = 0, size = 4 }) => {
    const token = getAuthToken();
    const res = await axios.get(`${prefix}/posts/search`, {
        params: { searchKeyword, postType, page, size },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};
