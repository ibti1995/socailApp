import React, { useState } from 'react';
import { Post, User } from '../../types';

interface PostFormProps {
  addPost: (post: Post) => void;
}

const PostForm: React.FC<PostFormProps> = ({ addPost}) => {
  const [postText, setPostText] = useState<string>('');
  const currentUser = {
    id: localStorage.getItem('userId'),
    fullName: localStorage.getItem('username') || ''
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postText.trim()) return;

    const newPost: any = {
      content: postText,
      user:currentUser.id
    };

    addPost(newPost);
   setPostText(''); // Reset form
  };

  return (
    <div className="mx-auto my-4 p-4 border border-gray-300 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md"
          rows={3}
          placeholder="What's on your mind?"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        ></textarea>
        <div className="flex justify-end mt-2"> {/* Flex container for button */}
          <button 
            type="submit" 
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
