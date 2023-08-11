import express from 'express';

import { getPosts, getPostsBySearch, getPost, createPost, updatePost, likePost, commentPost, deletePost } from '../controllers/posts.js';
// , getPostsByCreator

const router = express.Router();
import auth from "../middleware/auth.js";

// router.get('/creator', getPostsByCreator);
router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/:id', getPost);

router.post('/', auth,  createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.post('/:id/commentPost', commentPost);

export default router;