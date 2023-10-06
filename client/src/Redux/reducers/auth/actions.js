import * as api from '../../../api';

const actions = {
    LOGIN: "auth/LOGIN",
    FETCH_ALL: "auth/FETCH_ALL",
    CREATE: "auth/CREATE",
    UPDATE: "auth/UPDATE",
    DELETE: "auth/DELETE",
    LIKE: "auth/LIKE",

    loginUser: (token) => async (dispatch) => 
        await dispatch({
            type: actions.LOGIN,
            token: token,
        }),
    
    getPosts: () => async (dispatch) => {
        try {
            const { data } = await api.fetchPosts();
            
            await dispatch({ type: actions.FETCH_ALL, posts: data, })
        } catch (error) {
            console.log(error.message)
        }
    },

    createPost: (post) => async (dispatch) => {
        try {
            const { data } = await api.createPosts(post);
    
            await dispatch({ type: actions.CREATE, posts: data })
        } catch (error) {
            console.log(error.message)
        }
    },

    updatePost: (id, post) => async (dispatch) => {
        try {
            const { data } = await api.updatePosts(id, post);
            await dispatch({ type: actions.UPDATE, posts: data })
        } catch (error) {
            console.log(error.message)
        }
    },

    deletePost: (id) => async(dispatch) => {
        try {
            await api.deletePosts(id);
    
            await dispatch({ type: actions.DELETE, posts: id })
        } catch(error) {
            console.log(error.message)
        }
    },

    likePost: (id) => async(dispatch) => {
        try {
            const { data } = await api.likePost(id);
    
            await dispatch({ type: actions.LIKE , posts: data })
        } catch(error) {
            console.log(error.message)
        }
    }
}

export default actions;