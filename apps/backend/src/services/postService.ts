import { Schema } from 'mongoose';
import crudHandler from '../helpers/crudHandler';
import { IPost, Post } from '../modules/post/postModel';

interface PostData {
  content: string;
  user: Schema.Types.ObjectId;
}
class PostService {
  async createPost(postData: PostData) {
    try {
      const post = await crudHandler.create<IPost>({
        model: Post,
        data: postData,
        populate: 'user',
      });
      return post;
    } catch (err) {
      return err;
    }
  }

  async addLikeToPost(postId: string, user: string): Promise<IPost | null> {
    try {
      const post = await Post.findById(postId);

      if (!post) {
        throw new Error('Post not found');
      }

      const hasLiked = post.likes.includes(user);

      const update = hasLiked
        ? { $pull: { likes: user } }
        : { $addToSet: { likes: user } };

      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        update,

        { new: true }
      );

      return updatedPost;
    } catch (err) {
      throw new Error(err.message || 'Error updating likes');
    }
  }

  async addCommentToPost(
    postId: string,
    comment: { user: string; content: string }
  ): Promise<IPost | null> {
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { $push: { comments: comment } },
        { new: true }
      );

      const getUpdatedPost = await Post.findById(updatedPost._id).populate(
        'comments.user'
      ); // Populate the user field in comments

      return getUpdatedPost;
    } catch (err) {
      throw new Error(err.message || 'Error adding comment');
    }
  }

  async getPosts(
    populate?: string,
    filters: Partial<IPost> = {},
    limit?: number,
    offset?: number,
    sort?: string,
    select?: string
  ) {
    try {
      const posts = await crudHandler.getList<IPost>({
        populate: populate,
        model: Post,
        filters,
        limit: limit || 10,
        offset: offset || 0,
        sort: sort || '-createdAt',
        select: select,
      });
      return posts;
    } catch (err) {
      return { error: err };
    }
  }

  async getPostById(postId: string) {
    try {
      const post = await crudHandler.getById<IPost>({
        model: Post,
        id: postId,
      });
      return post;
    } catch (err) {
      return { error: err };
    }
  }

  async updatePost(postId: string, postData: Partial<PostData>) {
    try {
      const updatedPost = await crudHandler.update<IPost>({
        model: Post,
        id: postId,
        data: postData,
        populate: '',
        select: '',
      });
      return updatedPost;
    } catch (err) {
      return { error: err };
    }
  }

  async deletePost(postId: string) {
    try {
      const result = await crudHandler.delete<IPost>({
        model: Post,
        filters: { _id: postId },
      });
      return result;
    } catch (err) {
      return { error: err };
    }
  }

  async countPosts(filters: Partial<IPost> = {}) {
    try {
      const count = await crudHandler.getCounts<IPost>({
        model: Post,
        filters,
      });
      return count;
    } catch (err) {
      return { error: err };
    }
  }
}

export default new PostService();
