import express from "express";
import { Authentication } from "../../middlewares/Auth.middleware.js";
import CommentController from "./comments.controller.js";

export const commentsRouter = express.Router();

const commentController = new CommentController();

commentsRouter.route("/:postId").get(Authentication, (req, res, next) => {
  commentController.getComments(req, res, next);
});
commentsRouter.route("/:postId").post(Authentication, (req, res, next) => {
  commentController.addComment(req, res, next);
});
commentsRouter.route("/:commentId").put(Authentication, (req, res, next) => {
  commentController.updateComment(req, res, next);
});
commentsRouter.route("/:commentId").delete(Authentication, (req, res, next) => {
  commentController.deleteComment(req, res, next);
});
