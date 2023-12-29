import mongoose from "mongoose";
import CustomError from "../../middlewares/error-handling/customError.middleware.js";
import PostModel from "../posts/post.model.js";
import CommentModel from "./comments.model.js";

export default class CommentRepository {
  async add(userId, postId, content) {
    try {
      // Check if the post exists
      const postExists = await PostModel.findById(postId);
      if (!postExists) {
        throw new CustomError(`Post with _id: ${postId} does not exist.`, 404);
      }

      // Creating a new Comment
      const newComment = new CommentModel({ userId, postId, content });
      const savedComment = await newComment.save();

      // Update posts comments array
      postExists.comments.push(savedComment._id);
      postExists.save();

      return newComment;
    } catch (error) {
      console.log(error);
      if (error instanceof mongoose.Error.ValidationError) {
        throw new CustomError(error.message, 400);
      }
      throw error;
    }
  }

  async get(postId) {
    try {
      const post = await PostModel.findById(postId);
      if (!post) {
        throw new CustomError(`Post with _id: ${postId} does not exist.`, 404);
      }

      const comments = await CommentModel.find({
        _id: { $in: post.comments },
      }).select("-postId -_id -__v");
      return comments;
    } catch (error) {
      console.log(error);
      throw new CustomError(error.message, error.code ? error.code : 500);
    }
  }

  async update(userId, commentId, updateContent) {
    try {
      const comment = await CommentModel.findById(commentId);
      if (comment.userId != userId) {
        throw new CustomError(
          "You are unauthorized to update the comment made by someone else.",
          400
        );
      }

      comment.content = updateContent;
      await comment.save();
      return comment;
    } catch (error) {
      console.log(error);
      throw new CustomError(error.message, error.code ? error.code : 500);
    }
  }

  async delete(userId, commentId) {
    try {
      const comment = await CommentModel.findById(commentId);
      if (!comment) {
        throw new CustomError(`No comment with _id: ${commentId} found.`, 404);
      }
      const post = await PostModel.findById(comment.postId);

      if (userId != comment.userId && userId != post.userId) {
        throw new CustomError(
          "You are unauthorized to delete this comment.",
          400
        );
      }

      await CommentModel.deleteOne({ _id: commentId });
      return { Deletion: "Successful", "Comment Deleted": comment };
    } catch (error) {
      console.log(error);
      throw new CustomError(error.message, error.code ? error.code : 500);
    }
  }
}
