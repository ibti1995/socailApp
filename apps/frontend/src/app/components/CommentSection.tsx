import React, { useState } from 'react';
import { User, Comment } from '../../types';
import { addComment } from '../../services/commentService';

interface CommentSectionProps {
  currentUser: User;
  initialComments: Comment[];
  idPost:string ;
}

const CommentSection: React.FC<CommentSectionProps> = ({ currentUser, initialComments , idPost }) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [commentText, setCommentText] = useState<string>('');

  const handleComment = async(e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    else {
        const newComment = { content: commentText, user: currentUser._id };
        try {
            addComment(newComment , idPost).then((res)=> {
             if (res.succes){ 
                setComments(res.data.posts.comments);
                setCommentText('');
            }
            });
       
           } catch (error) {
             console.error('Error adding post:', error);
           }
    }

  };

  return (
    <div>
      <form onSubmit={handleComment} className="mt-2 flex items-center">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Add a comment"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button type="submit" className="bg-green-500 text-white py-1 px-2 rounded-md ml-2">
          Comment
        </button>
      </form>

      {/* Render comments */}
      {comments.length > 0 && (
        <div className="mt-2 space-y-2">
          {comments.map((comment: Comment, index: number) => (
            <div key={index} className="border border-gray-300 rounded-md p-2">
              <p className="font-semibold text-gray-800">{comment.user.fullName}:</p>
              <p className="text-gray-600">{comment.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
