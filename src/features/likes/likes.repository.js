import PostModel from "../posts/post.model.js";
import CommentModel from "../comments/comments.model.js";
import { LikeModel } from "./likes.model.js";
import CustomError from "../../middlewares/error-handling/customError.middleware.js";

export default class LikeRepository {
  async get(targetId) {
    try {

      const inPost = await PostModel.findById(targetId);
      const inComment = await CommentModel.findById(targetId);

      if(!inPost && !inComment){
        throw new CustomError('No post or comment with provided _id found', 404);
      }

      const likesObject = await LikeModel.find({ targetId: targetId }).select(
        "-__v -targetId"
      );

      if (likesObject.length < 1) {
        throw new CustomError("No likes to show", 400);
      }

      const targetType = likesObject[0].targetType;
  
      return { targetType, likesObject };


    } catch (error) {
      console.log(error);
      throw new CustomError(error.message, error.code ? error.code : 500);
    }
  }

  async toggle(userId, targetId, type) {
    try {
      const targetModel = type == "Post" ? PostModel : CommentModel;
      const aim = await targetModel.findById(targetId);

      if (!aim) {
        throw new CustomError(`No ${type} with _id: ${targetId} found.`, 404);
      }

      const existingLike = await LikeModel.findOne({
        userId: userId,
        targetId,
        targetType: type,
      });

      if (existingLike) {
        await LikeModel.deleteOne({ _id: existingLike._id });
        await targetModel.findByIdAndUpdate(targetId, {
          $pull: { likes: existingLike._id },
          $inc: { likesCount: -1 },
        });
        return `Unliked ${type}`;
      }

      const newLike = await new LikeModel({
        userId,
        targetId,
        targetType: type,
      });
      await newLike.save();
      await targetModel.findByIdAndUpdate(targetId, {
        $push: { likes: newLike._id },
        $inc: { likesCount: 1 },
      });
      return `Liked ${type}`;
    } catch (error) {
      console.log(error);
      throw new CustomError(error.message, error.code ? error.code : 500);
    }
  }
}
