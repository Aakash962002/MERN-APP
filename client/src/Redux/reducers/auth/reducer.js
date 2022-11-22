import types from './actions';

const initialState = {
    posts: [],
    token: ""
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case types.LOGIN:
            return {
                ...state,
                token: action.token
            };
        case types.FETCH_ALL:
            return {
                ...state,
                posts: action.posts
            };
        case types.CREATE:
            return {
                ...state, 
                posts: action.posts
            };
        case types.UPDATE:
        case types.LIKE:
            return {
                ...state,
                posts: state.posts.map((post) => post._id === action.posts._id ? action.posts : post)
            }
        case types.DELETE:
            return {
                ...state,
                posts: state.posts.filter((post) => post._id !== action.posts)
            }
        default:
            return state;
    }
}