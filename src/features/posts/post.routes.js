import express from 'express';
import PostController from './post.controller.js';
import { Authentication } from '../../middlewares/Auth.middleware.js';
import {upload} from '../../middlewares/fileUpload.middleware.js';

export const postRouter = express.Router();

const postController = new PostController();


postRouter.route('/').post(Authentication, upload.single('imageUrl'), (req, res, next)=>{postController.addPost(req, res, next)});

postRouter.route('/all').get(Authentication, (req, res, next)=>{postController.getAllPosts(req, res, next)});

postRouter.route('/').get(Authentication, (req, res, next)=>{postController.getUserPosts(req, res, next)});

postRouter.route('/:postId').get(Authentication, (req, res, next)=>{postController.getPost(req, res, next)});

postRouter.route('/:postId').delete(Authentication, (req, res, next)=>{postController.deletePost(req, res, next)});

postRouter.route('/:postId').put(Authentication, upload.single('imageUrl'), (req, res, next)=>{postController.updatePost(req, res, next)});