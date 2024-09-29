import { Request, Response } from 'express';
import responseHandler from '../../helpers/responseHandler';
import httpStatusCodes from '../../helpers/httpStatusCodes';
import filtersHandler from '../../helpers/filtersHandler';
import { messages, msgCode } from '../../helpers/sharedCodesMessages';
import PostService from '../../services/postService';

//like a post
export const likePost = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const { user } = req.body;

  try {
    const post = await PostService.addLikeToPost(postId, user);
    if (!post) {
      return res.status(httpStatusCodes.NOT_FOUND).json(
        responseHandler({
          success: false,
          data: null,
          msgCode: msgCode.dataRetrievalError,
          message: 'Post not found' ,
        })
      );    }
    res.status(httpStatusCodes.OK).json(
      responseHandler({
        data: { likes: post.likes },
        msgCode: msgCode.dataRetrievalSuccess,
        message: messages.dataPostLikeSuccess,
        success: true,
      })
    );
  } catch (error) {
    res.status(httpStatusCodes.BAD_REQUEST).json(
      responseHandler({
        success: false,
        data: error.message,
        msgCode: msgCode.dataRetrievalError,
        message: 'Error liking post',
      })
    );
  }
};
//comment a post
export const commentPost = async (req: Request, res: Response) => {
  const { postId } = req.params;
  const { content, user } = req.body;

  try {
    const post = await PostService.addCommentToPost(postId, {
      user: user,
      content: content,
    });
    if (!post) {
      return res.status(httpStatusCodes.NOT_FOUND).json(
        responseHandler({
          success: false,
          data: null,
          msgCode: msgCode.dataRetrievalError,
          message: 'Post not found' ,
        })
      );
    }
    res.status(httpStatusCodes.OK).json(
      responseHandler({
        data: { posts: post },
        msgCode: msgCode.dataRetrievalSuccess,
        message: messages.dataRetrievalSuccess,
        success: true,
      })
    );
  } catch (error) {
    res.status(httpStatusCodes.BAD_REQUEST).json(
      responseHandler({
        success: false,
        data: error.message,
        msgCode: msgCode.dataRetrievalError,
        message: messages.dataRetrievalError,
      })
    );
  }
};

// Create a new post
export const createPost = async (req: Request, res: Response) => {
  const { content, user } = req.body;
  const postData = { content, user };
  const result = await PostService.createPost(postData);
  console.log(result, 'result');
  return result.error
    ? res.status(httpStatusCodes.BAD_REQUEST).json(
        responseHandler({
          success: false,
          data: result.error,
          msgCode: msgCode.dataRetrievalError,
          message: messages.dataRetrievalError,
        })
      )
    : res.status(httpStatusCodes.OK).json(
        responseHandler({
          data: result,
          msgCode: msgCode.dataRetrievalSuccess,
          message: messages.dataRetrievalSuccess,
          success: true,
        })
      );
};

// Get all posts
export const getAllPosts = async (req: Request, res: Response) => {
  const populate = 'user comments.user likes.user';
  const { limit, offset } = req.params;
  const { filters, sort, select } = filtersHandler(req.query);
  const { error, list, counts } = await PostService.getPosts(
    populate,
    filters,
    parseInt(limit),
    parseInt(offset),
    sort,
    select
  );
  return error
    ? res.status(httpStatusCodes.BAD_REQUEST).json(
        responseHandler({
          success: false,
          data: {},
          msgCode: msgCode.dataRetrievalError,
          message: messages.dataRetrievalError,
        })
      )
    : res.status(httpStatusCodes.OK).json(
        responseHandler({
          data: { posts: list, counts },
          msgCode: msgCode.dataRetrievalSuccess,
          message: messages.dataRetrievalSuccess,
          success: true,
        })
      );
};

// Get a post by ID
export const getPostById = async (req: Request, res: Response) => {
  const postId = req.params.id;
  const post = await PostService.getPostById(postId);
  return post
    ? res.status(httpStatusCodes.BAD_REQUEST).json(
        responseHandler({
          success: false,
          data: {},
          msgCode: msgCode.dataRetrievalError,
          message: messages.dataRetrievalError,
        })
      )
    : res.status(httpStatusCodes.OK).json(
        responseHandler({
          data: { ...post },
          msgCode: msgCode.dataRetrievalSuccess,
          message: messages.dataRetrievalSuccess,
          success: true,
        })
      );
};

// Update a post by ID
export const updatePost = async (req: Request, res: Response) => {
  const postId = req.params.id;
  const updateData = req.body;
  const updatedPost = await PostService.updatePost(postId, updateData);
  return updatedPost
    ? res.status(httpStatusCodes.BAD_REQUEST).json(
        responseHandler({
          success: false,
          data: undefined,
          msgCode: msgCode.dataRetrievalError,
          message: messages.dataRetrievalError,
        })
      )
    : res.status(httpStatusCodes.OK).json(
        responseHandler({
          data: { ...updatedPost },
          msgCode: msgCode.dataRetrievalSuccess,
          message: messages.dataRetrievalSuccess,
          success: true,
        })
      );
};

// Delete a post by ID
export const deletePost = async (req: Request, res: Response) => {
  const postId = req.params.id;
  const result = await PostService.deletePost(postId);
  return result
    ? res.status(httpStatusCodes.BAD_REQUEST).json(
        responseHandler({
          success: false,
          data: undefined,
          msgCode: msgCode.dataDeletedSuccess,
          message: messages.dataDeletedSuccess,
        })
      )
    : res.status(httpStatusCodes.OK).json(
        responseHandler({
          data: { ...result },
          msgCode: msgCode.dataAlredyDeletedError,
          message: messages.dataAlredyDeletedError,
          success: true,
        })
      );
};
