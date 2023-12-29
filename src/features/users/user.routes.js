import express from "express";
import UserController from "./user.controller.js";
import { Authentication } from "../../middlewares/Auth.middleware.js";

export const userRouter = express.Router();

//Create an instance of UserController for every user request
const userController = new UserController();

userRouter.route('/signup').post((req, res, next)=>{ userController.signUpController(req, res, next)});

userRouter.route('/signin').post((req, res, next)=>{userController.signInController(req, res, next)});

userRouter.route('/logout').get(Authentication, (req, res, next)=>{userController.logoutController(req, res, next)});

userRouter.route('/get-details/:userId').get((req, res,next)=>{userController.getUser(req, res,next)});

userRouter.route('/get-all-details').get((req, res,next)=>{userController.getAllUsers(req, res,next)});

userRouter.route('/update-details/:userId').put(Authentication, (req, res, next)=>{userController.updateUser(req, res, next)});