// src/components/Auth.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../../types';
import { createUser } from '../../services/userService';

const Auth: React.FC = () => {
  const [name, setName] = useState<string>('');
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    e.preventDefault();
    setError(null); 
    try {
      const newUser = await createUser(name);
      setUser(newUser);
      localStorage.setItem('userId', newUser._id); 
      localStorage.setItem('username', newUser.fullName); 
      localStorage.setItem('user', JSON.stringify(newUser)); 
      navigate('/'); 
    } catch (error) {
      setError('Error creating user. Please try again.'); 
    }
    if (!name.trim()) return;

   
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md w-80">
        <h2 className="text-2xl font-bold text-center mb-4">Enter Your Name</h2>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md w-full">
          Login
        </button>
      </form>
    </div>
  );
};

export default Auth;
