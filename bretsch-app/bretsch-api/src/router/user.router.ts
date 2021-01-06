import { Router } from 'express';
import {
    createUser,
    deleteUser,
    getAllUser,
    getBookingsByUserId,
    getSpecificUser,
    updateUser
} from '../controller/user.controller';


export const userRouter = Router({ mergeParams: true });


userRouter.post('/', createUser);
userRouter.delete('/:userId', deleteUser);
userRouter.get('/', getAllUser);
userRouter.get('/:userId/bookings', getBookingsByUserId);
userRouter.get('/:userId', getSpecificUser);
userRouter.patch('/:userId', updateUser);
