import axios from "axios"

export const API_SERVER_HOST = 'http://localhost:8080'

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

