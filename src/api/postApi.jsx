import axios from "axios"


export const API_SERVER_HOST = 'http://localhost:8080'

const prefix = `${API_SERVER_HOST}/api` 

export const getOne = async(id) => {
    const res = await axios.get(`${prefix}/user/posts/${id}`)

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
