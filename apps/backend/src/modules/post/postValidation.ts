import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const createPostSchema = Joi.object({
    content: Joi.string().min(3).max(255).required(),
    user: Joi.string().required(),
});
const createCommentSchema = Joi.object({
  content: Joi.string().min(3).max(255).required(),
  user: Joi.string().required(),
});
const createLikeSchema = Joi.object({
  user: Joi.string().required(),
});
export const validateCreatePost = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = createPostSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

export const validateCreateComment = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = createCommentSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

export const validateCreateLike = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = createLikeSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};