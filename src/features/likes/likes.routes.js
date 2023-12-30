import express from 'express';
import { Authentication } from '../../middlewares/Auth.middleware.js';
import LikeController from './likes.controller.js';

export const likesRouter  = express.Router();

const likeController = new LikeController();

likesRouter.route('/:targetId').get(Authentication, (req, res, next)=>{ likeController.getLikes(req, res,next)});
likesRouter.route('/toggle/:targetId').get(Authentication, (req, res, next)=>{ likeController.toggleLike(req, res, next)});
