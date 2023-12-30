import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  content: {
    type: String,
    required: true,
    trim: true,
    minLength: [1, "Content should be atleast 1 character."],
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like", default: [] }],
  likesCount: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now },
});

const CommentModel = new mongoose.model("Comment", commentSchema);

export default CommentModel;
