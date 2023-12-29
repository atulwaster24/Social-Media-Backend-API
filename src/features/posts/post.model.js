import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    imageUrl: {type: String, required: true},
    caption: {type: String, required: true, trim: true},
    timestamp:{type: Date, default: Date.now},
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Like', default: []}],
    likesCount: {type: Number, default: 0},
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: []}]
});


const PostModel = new mongoose.model('Post', postSchema);

export default PostModel;

