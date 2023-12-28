import mongoose from "mongoose";
import UserModel from "./user.model.js";
import bcrypt from "bcrypt";
import CustomError from "../../middlewares/error-handling/customError.middleware.js";

export default class UserRepository {
  async signUp(userData) {
    try {
      const newUser = new UserModel(userData);
      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      console.log(error);
      if (error instanceof mongoose.Error.ValidationError) {
        throw new CustomError(error.message, 400);
      } else {
        throw new CustomError(error.message, 500);
      }
    }
  }

  async signIn(email, password){
    try {

        const foundUser = await UserModel.findOne({email: email});
        if(!foundUser){
            throw new CustomError("User not found.", 404)
        };
        const validUser = await bcrypt.compare(password, foundUser.password);
        if(!validUser){
            throw new CustomError("Invalid password", 401);
        }

        return foundUser;
    } catch (error) {
        console.log(error)
        throw new CustomError(error.message, 400);
    }
  }

  async getUser(userId){
    try {
        const result =  await UserModel.findById(userId);
        if(!result){
            throw new CustomError("No user found with provided Id.", 404);
        }
        return result;
    } catch (error) {
        console.log(error);
        throw new CustomError(error.message, error.code);
    }
  }

  async getAllUsers(){
    try {
        const result =  await UserModel.find();
        if(!result){
            throw new CustomError("No users to show.", 400);
        }
        return result;
    } catch (error) {
        console.log(error);
        throw new CustomError(error.message, error.code);
    }
  }
}
