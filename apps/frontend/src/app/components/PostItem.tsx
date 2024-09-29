import React from 'react';
import { Post, User, Comment } from '../../types';
import LikeSection from './LikeSection';
import CommentSection from './CommentSection';

interface PostItemProps {
  post: Post;
  currentUser: User; // Pass the logged-in user as a prop
}

const PostItem: React.FC<PostItemProps> = ({ post, currentUser }) => {
 
  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-4 shadow-sm">
       <h3 className="font-semibold text-lg text-gray-800">{post.user?.fullName}</h3>
      <p className="p-2 text-gray-800">{post.content}</p>

      {/* Like Section */}
      <LikeSection
        likes={post.likes}
        currentUser={currentUser}
        idPost={post._id}
    
      />

      <div className="my-2 border-t border-gray-300"></div>

      {/* Comment Section */}
      <CommentSection
        currentUser={currentUser}
        initialComments={post.comments}
        idPost={post._id}
       />
    </div>
  );
};

export default PostItem;
