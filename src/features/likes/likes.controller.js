import LikeRepository from "./likes.repository.js";

export default class LikeController {
  constructor() {
    this.likeRepository = new LikeRepository();
  }

  async getLikes(req, res, next) {
    try {
      const targetId = req.params.targetId;
      const likes = await this.likeRepository.get(targetId);
      return res.status(200).json({_id: targetId, Type: likes.targetType, Likes: likes.likesObject});
  
    } catch (error) {
      console.log(error);
      return res.status(error.code).json({ error: error.message });
    }
  }

  async toggleLike(req, res, next) {
    try {
        const targetId = req.params.targetId;
        const targetType = req.query.type;

        const userId = req.userId;

        const toggle = await this.likeRepository.toggle(userId, targetId, targetType);
        return res.status(200).json({Message: toggle});
    } catch (error) {
        console.log(error);
      return res.status(error.code).json({ error: error.message });
    }
  }
}
