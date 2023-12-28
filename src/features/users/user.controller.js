
import UserRepository from "./user.repository.js";
import jwt from 'jsonwebtoken';


export default class UserController{
    constructor(){
        this.userRepository = new UserRepository;
    }

    async signUpController(req, res, next){
        try {
            const {name, email, password, gender} = req.body;
            const user = await this.userRepository.signUp(req.body);
            return res.status(201).json({"User": user})
        } catch (error) {
            console.log(error)
            return res.status(error.code).json({"error": error.message});
        }
    }

    async signInController(req, res, next){
        try {
            const {email, password} = req.body;
            const status = await this.userRepository.signIn(email, password);
            if(status){
                const token = jwt.sign({
                    userId: status._id,
                    userEmail: status.email
                }, process.env.SecretKey, {expiresIn: '1h'})
                res.cookie('authToken', token);
            }
            return res.status(200).json({"Logged User": status.name});
        } catch (error) {
            console.log(error);
            return res.status(error.code).json({"error": error.message});
        }
    }

    async logoutController(req, res, next){
        try {
            res.clearCookie('authToken');
            res.status(200).json({"Message": "Logged out successfully."})
        } catch (error) {
            res.status(500).json({"Message": "Failed to Logout. Try again after some time."})
        }
    }

    async getUser(req, res, next){
        try {
            const userId = req.params.userId;
            const user = await this.userRepository.getUser(userId);
            return res.status(200).json({"userId": userId, "res": user});
        } catch (error) {
            return res.status(error.code).json({"error": error.message});
        }
    }

    async getAllUsers(req, res, next){
        try {
            const users = await this.userRepository.getAllUsers();
            return res.status(200).json({"Users": users});
        } catch (error) {
            return res.status(error.code).json({"error": error.message});
        }
    }
}