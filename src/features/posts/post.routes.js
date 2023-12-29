import express from 'express';
import PostController from './post.controller.js';
import { Authentication } from '../../middlewares/Auth.middleware.js';
import {upload} from '../../middlewares/fileUpload.middleware.js';

export const postsRouter = express.Router();

const postController = new PostController();


postsRouter.route('/').post(Authentication, upload.single('imageUrl'), (req, res, next)=>{postController.addPost(req, res, next)});

postsRouter.route('/all').get(Authentication, (req, res, next)=>{postController.getAllPosts(req, res, next)});

postsRouter.route('/').get(Authentication, (req, res, next)=>{postController.getUserPosts(req, res, next)});

postsRouter.route('/:postId').get(Authentication, (req, res, next)=>{postController.getPost(req, res, next)});

postsRouter.route('/:postId').delete(Authentication, (req, res, next)=>{postController.deletePost(req, res, next)});

postsRouter.route('/:postId').put(Authentication, upload.single('imageUrl'), (req, res, next)=>{postController.updatePost(req, res, next)});