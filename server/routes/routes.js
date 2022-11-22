import express from "express";
import { 
    getPosts, 
    createPosts, 
    updatePosts, 
    deletePosts, 
    likePost,
    registerUser,
    loginUser
} from "../controllers/posts.js";
const router = express.Router();


router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/', getPosts)
router.post('/', createPosts)
router.post('/:id', updatePosts)
router.post('/:id/delete', deletePosts)
router.post('/:id/likePost', likePost)

export default router;