import { Schema, model, Document, Types } from 'mongoose';

export interface IComment {
  user: Schema.Types.ObjectId;
  content: string;
  createdAt: Date;
}

export interface IPost extends Document {
   content: string;
  likes: Types.Array<string>;
  comments: Types.Array<IComment>;
  user: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<IComment>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const postSchema = new Schema<IPost>(
  {
     content: { type: String, required: true, unique: false },
    likes: [{ type: String }],
    comments: [commentSchema],
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);

export const Post = model<IPost>('Post', postSchema);
