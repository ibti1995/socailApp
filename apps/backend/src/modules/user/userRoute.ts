import { Router } from 'express';
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from './userController';
import { validateCreateUser } from './userValidation';

const userRoute = () => {
  const router = Router();

  router.post('/users', validateCreateUser, createUser);

  router.get('/users', getAllUsers);

  router.get('/users/:id', getUserById);

  router.patch('/users/:id', updateUser);

  router.delete('/users/:id', deleteUser);

  return router;
};

export default userRoute ;