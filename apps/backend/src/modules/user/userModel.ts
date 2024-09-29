import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  fullName: string;
}

const userSchema = new Schema<IUser>({
  fullName: { type: String, required: true },
});

export const User = model<IUser>('User', userSchema);
