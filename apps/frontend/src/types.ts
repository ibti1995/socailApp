// src/types.ts
export interface Post {
    _id:string;
    content: string;
    likes: string[];
    comments: Comment[];
    user:User
  }
  export interface User {
    _id: string;
    fullName:string;
  }
  export interface Comment {
    user: User
    _id?: string;
    content:string;
  }
