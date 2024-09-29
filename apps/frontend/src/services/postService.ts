import axiosInstance from './axiosInstance';
import { Post } from '../types'; // Adjust the import path as necessary

// Fetch all posts
export const getPosts = async (): Promise<Post[]> => {
  try {
    const response = await axiosInstance.get<any>('/posts');
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

// Add a new post
export const addPost = async (post:any): Promise<any> => {
  try {
    const response = await axiosInstance.post<any>('/posts',post);
    return response.data;
  } catch (error) {
    console.error('Error adding post:', error);
    throw error;
  }
};