import axios from 'axios';

const url = 'http://localhost:5000/test'

export const fetchPosts  = () => axios.get(url);
export const createPosts  = (newPost) => axios.post(url, newPost);
export const updatePosts = (id, newPost) => axios.post(`${url}/${id}`, newPost)
export const deletePosts = (id) => axios.post(`${url}/${id}/delete`)
export const likePost = (id) => axios.post(`${url}/${id}/likePost`)
export const login = (data) => axios.post('http://localhost:5000/test/login', data)