import axiosInstance from './axiosInstance';

export const toggleLike = async (idUser:string , idPost:string): Promise<any> => {
  try {
    const response = await axiosInstance.post<any>('/posts/'+idPost+'/like',  {user:idUser});
    return response.data;
  } catch (error) {
    console.error('Error adding post:', error);
    throw error;
  }
};
