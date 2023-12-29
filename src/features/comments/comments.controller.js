import CommentRepository from "./comments.repository.js";

export default class CommentController {
  constructor() {
    this.commentRepository = new CommentRepository();
  }

  async addComment(req, res, next) {
    try {
      const content = req.body.content;
      const userId = req.userId;
      const postId = req.params.postId;

      const comment = await this.commentRepository.add(userId, postId, content);
      return res.status(201).json(comment);
    } catch (error) {
      console.log(error);
      return res.status(error.code).json({ error: error.message });
    }
  }

  async getComments(req, res, next) {
    try {
      const postId = req.params.postId;
      const retrievedComments = await this.commentRepository.get(postId);
      return res.status(200).json({ Comments: retrievedComments });
    } catch (error) {
      console.log(error);
      return res.status(error.code).json({ error: error.message });
    }
  }

  async updateComment(req, res, next) {
    try {
      const commentId = req.params.commentId;
      const content = req.body.content;
      const userId = req.userId;

      const update = await this.commentRepository.update(
        userId,
        commentId,
        content
      );
      return res.status(201).json({ "Updated Comment": update });
    } catch (error) {
      console.log(error);
      return res.status(error.code).json({ error: error.message });
    }
  }

  async deleteComment(req, res, next) {
    try {
      const commentId = req.params.commentId;
      const userId = req.userId;

      const deletion = await this.commentRepository.delete(userId, commentId);
      return res.status(200).json(deletion);
    } catch (error) {
      console.log(error);
      return res.status(error.code).json({ error: error.message });
    }
  }
}
