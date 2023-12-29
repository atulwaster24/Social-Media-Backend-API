import PostRepository from "./post.repository.js";


export default class PostController{
    constructor(){
        this.postRepository = new PostRepository();
    }

    async addPost(req, res, next){
        try {
            const { caption} = req.body;
            const userId = req.userId;
            const imageUrl = req.file.filename;
            const post = await this.postRepository.add({userId, caption, imageUrl});
            return res.status(201).json({'Post Created': post});
        } catch (error) {
            console.log(error);
            return res.status(error.code).json({"error": error.message});
        }
    }

    async getPost(req, res, next){
        try {
            const postId = req.params.postId;
            const post = await this.postRepository.getPost(postId);
            return res.status(200).json({_id: postId, "Post": post});
        } catch (error) {
            console.log(error);
            return res.status(error.code).json({"error": error.message});
        }
    }

    async getUserPosts(req, res, next){
        try {
            const userId = req.userId;
            const posts = await this.postRepository.getUserPosts(userId);
            return res.status(200).json({UserId: userId, "Posts": posts})
        } catch (error) {
            console.log(error);
            return res.status(error.code).json({"error": error.message});
        }
    }

    async getAllPosts(req, res, next){
        try {
            const allPosts = await this.postRepository.getAllPosts();
            return res.status(200).json({"Posts": allPosts});
        } catch (error) {
            console.log(error);
            return res.status(error.code).json({"error": error.message});
        }
    }

    async deletePost(req, res, next){
        try {
            const postId = req.params.postId;
            const deletedPost = await this.postRepository.delete(postId);
            return res.status(200).json({"Response": deletedPost});
        } catch (error) {
            console.log(error);
            return res.status(error.code).json({"error": error.message});
        }
    }

    async updatePost(req, res, next){
        try {
            const postId = req.params.postId;
            const { caption } = req.body;
            const imageUrl = req.file.filename;
            const updateDetails = {caption, imageUrl};
            
            const update = await this.postRepository.update(postId, updateDetails);
            return res.status(200).json({"Updated Post": update});
        } catch (error) {
            console.log(error);
            return res.status(error.code).json({"error": error.message});
        }
    }
}