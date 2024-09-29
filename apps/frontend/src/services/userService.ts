import axiosInstance from './axiosInstance';
import { User } from '../types'; // Adjust the import path as necessary

// Create a new user
export const createUser = async (name: string): Promise<User> => {
  try {
    const response = await axiosInstance.post<any>('/users', { fullName:name });
    return response.data.data; // Return the created user
  } catch (error) {
    console.error('Error creating user:', error);
    throw error; 
  }
};
