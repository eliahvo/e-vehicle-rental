import { Router } from "express";
import {
  registerUser,
  deleteUser,
  getAllUser,
  getBookingsByUserId,
  getSpecificUser,
  updateUser,
  loginUser,
  checkMailExists,
} from "../controller/user.controller";
// import { Authentication } from '../middleware/authentication';

export const userRouter = Router({ mergeParams: true });

userRouter.post("/", registerUser);
userRouter.post("/token", loginUser);
userRouter.delete("/:userId", deleteUser);
userRouter.get("/", /*Authentication.verifyAccess,*/ getAllUser);
userRouter.get("/email/:email", /*Authentication.verifyAccess,*/ checkMailExists);
userRouter.get("/:userId/bookings", /*Authentication.verifyAccess,*/ getBookingsByUserId);
userRouter.get("/:userId", getSpecificUser);
userRouter.patch("/:userId", /*Authentication.verifyAccess,*/ updateUser);
