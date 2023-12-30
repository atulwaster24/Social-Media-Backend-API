import mongoose from "mongoose";

const likeSchema = mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    targetId: {type: mongoose.Schema.Types.ObjectId, refPath: 'type', required: true},
    targetType: {type: String, enum: ["Post", "Comment"], required: true},
    timestamp: {type: Date, default: Date.now}
});

export const LikeModel = mongoose.model('Like', likeSchema);