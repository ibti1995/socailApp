import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const createUserSchema = Joi.object({
  fullName: Joi.string().min(3).max(30).required(),
});

export const validateCreateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = createUserSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};
