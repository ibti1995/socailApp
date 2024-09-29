import { Router } from 'express';
import {
  likePost,
  commentPost,
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
} from './postController';
import { validateCreateComment, validateCreateLike, validateCreatePost } from './postValidation';

const postRoute = () => {
  const router = Router();

  router.post('/posts/:postId/like',validateCreateLike, likePost);

  router.post('/posts/:postId/comment', validateCreateComment,commentPost);

  router.post('/posts', validateCreatePost, createPost);

  router.get('/posts', getAllPosts);

  router.get('/posts/:id', getPostById);

  router.patch('/posts/:id', updatePost);

  router.delete('/posts/:id', deletePost);

  return router;
};

export default postRoute;
