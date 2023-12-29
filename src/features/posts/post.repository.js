import CustomError from "../../middlewares/error-handling/customError.middleware.js";
import PostModel from "./post.model.js";


export default class PostRepository{

    async add(postData){
        try{
        const post = new PostModel(postData);
        const savedPost = await post.save();
        return savedPost;
        }catch(error){
            console.log(error);
            throw new CustomError(error.message, 500);
        }
    }

    async getPost(postId){
        try {
            const post = await PostModel.findById(postId);
            if(!post){
                throw new CustomError("No post with provided Id found.", 404)
            }
            return post;
        } catch (error) {
            console.log(error);
            throw new CustomError(error.message, error.code);
        }
    }

    async getUserPosts(userId){
        try {
            const posts = await PostModel.find({userId: userId});
            if(posts.length < 1){
                return "You have zero posts."
            }
            return posts;
        } catch (error) {
            console.log(error);
            throw new CustomError(error.message, 500);
        }
    }

    async getAllPosts(){
        try {
            const allPosts = await PostModel.find();
            if(allPosts.length < 1){
                return 'No posts to show.';
            }
            return allPosts;
        } catch (error) {
            console.log(error);
            throw new CustomError(error.message, error.code);
        }
    }

    async delete(postId){
        try {
            const postExists = await PostModel.findById(postId);
            if(postExists){
                return await PostModel.deleteOne({_id: postId});
            }
            return `No post with _id: ${postId} exists.`
   
        } catch (error) {
            console.log(error);
            throw new CustomError(error.message, 500);
        }
    }

    async update(postId, updateDetails){
        try {
            const update = { caption: updateDetails.caption, imageUrl: updateDetails.imageUrl};
            console.log(update);

            const updatedPost = await PostModel.findByIdAndUpdate(postId, update, {new: true});
            console.log(updatedPost)
            return updatedPost;
        } catch (error) {
            console.log(error);
            throw new CustomError(error.message, 500);
        }
    }
}