import axiosInstance from './axiosInstance';

// Fetch all posts

// Add a new post
export const addComment = async (comment:any , idPost:string): Promise<any> => {
  try {
    const response = await axiosInstance.post<any>('/posts/'+idPost+'/comment', comment);
    return response.data;
  } catch (error) {
    console.error('Error adding post:', error);
    throw error;
  }
};
