import axios from 'axios'; 

// Create an Axios instance with default settings
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', 
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, 
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
     return Promise.reject(error);
  }
);

export default axiosInstance;
