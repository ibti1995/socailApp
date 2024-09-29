import React from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import PostList from './components/PostList';
import Auth from './components/Auth';
import logo from '../assets/images/logo.jpeg'; 

const App: React.FC = () => {
  const navigate = useNavigate();
  const currentUser = {
    id: localStorage.getItem('userId'),
    fullName: localStorage.getItem('username') || ''
  };



  const handleDisconnect = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('userId'); // Optionally clear userId if you are using it
    navigate('/auth');
  };

  return (
    <div className="container mx-auto p-4 w-full lg:w-[800px] ">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
         {/* Left side of the header (logo and title) */}
         <div className="flex items-center space-x-4">
          <img src={logo} alt="Social App Logo" className="h-12 w-12" /> {/* Adjust size */}
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            linkup
          </h1>
        </div>

        {/* Right side (Disconnect button) */}
        {localStorage.getItem('username') && (
          <button
            onClick={handleDisconnect}
            className="bg-red-500 text-white py-2 px-4 rounded-md"
          >
            Logout
          </button>
        )}
      </div>

      {/* Main Routes */}
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/"
          element={
            localStorage.getItem('username') ? (
              <>
               
                <PostList/>
              </>
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
