import { Router } from 'express';
import {
  checkMailExists,
  deleteUser,
  getAllUser,
  getBookingsByUserId,
  getSpecificUser,
  loginUser,
  registerUser,
  updateUser,
  validatePassword,
} from '../controller/user.controller';
import { Authentication } from '../middleware/authentication';

export const userRouter = Router({ mergeParams: true });

userRouter.post('/', registerUser);
userRouter.post('/token', loginUser);
userRouter.post('/checkpwd', Authentication.verifyAccess, validatePassword);
userRouter.delete('/:userId', Authentication.verifyAccess, deleteUser);
userRouter.get('/', Authentication.verifyAccess, getAllUser);
userRouter.get('/email/:email', Authentication.verifyAccess, checkMailExists);
userRouter.get('/:userId/bookings', Authentication.verifyAccess, getBookingsByUserId);
userRouter.get('/:userId', Authentication.verifyAccess, getSpecificUser);
userRouter.patch('/:userId', Authentication.verifyAccess, updateUser);
