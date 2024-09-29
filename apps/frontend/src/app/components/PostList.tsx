import React, { useEffect, useState } from 'react';
import PostItem from './PostItem';
import { Post, User } from '../../types';
import { addPost, getPosts } from '../../services/postService';
import PostForm from './PostForm';

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    getPosts().then((res: any) => {
      if (res.succes) setPosts(res.data.posts);
    });
  }, []);

  const currentUser = {
    _id: localStorage.getItem('userId') || '',
    fullName: localStorage.getItem('username') || '',
  };

  useEffect(() => {
    console.log('posts', posts);
  }, [posts]);

  const addPostToList = async (newPost: Post) => {
    console.log('Post added:', newPost);
    try {
      addPost(newPost).then((res) => {
        if (res.succes) setPosts([res.data, ...posts]);
      });

      console.log('Post added:', newPost);
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };
  return (
    <div>
      <PostForm addPost={addPostToList} />
      {posts.map((post) => (
        <PostItem
          key={post._id}
          post={post}
          currentUser={currentUser} // Pass the current user
        />
      ))}
    </div>
  );
};

export default PostList;
