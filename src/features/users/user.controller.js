import UserRepository from "./user.repository.js";
import jwt from "jsonwebtoken";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async signUpController(req, res, next) {
    try {
      const { name, email, password, gender } = req.body;
      const user = await this.userRepository.signUp(req.body);
      return res.status(201).json({ "User Created": user });
    } catch (error) {
      console.log(error);
      return res.status(error.code).json({ error: error.message });
    }
  }

  async signInController(req, res, next) {
    if (req.cookies.authToken) {
      return res
        .status(300)
        .json({
          "Bad Request":
            "You are already logged in. Log out to login with another account.",
        });
    }
    try {
      const { email, password } = req.body;
      const status = await this.userRepository.signIn(email, password);
      if (status) {
        const token = jwt.sign(
          {
            userId: status._id,
            userEmail: status.email,
          },
          process.env.SecretKey,
          { expiresIn: "1h" }
        );
        res.cookie("authToken", token);
      }
      return res.status(200).json({ "Login Successful": status.name });
    } catch (error) {
      console.log(error);
      return res.status(error.code).json({ error: error.message });
    }
  }

  async logoutController(req, res, next) {
    try {
      res.clearCookie("authToken");
      res.status(200).json({ Message: "Logged out successfully." });
    } catch (error) {
      res
        .status(500)
        .json({ Message: "Failed to Logout. Try again after some time." });
    }
  }

  async getUser(req, res, next) {
    try {
      const userId = req.params.userId;
      const user = await this.userRepository.getUser(userId);
      return res.status(200).json({ userId: userId, res: user });
    } catch (error) {
      return res.status(error.code).json({ error: error.message });
    }
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await this.userRepository.getAllUsers();
      return res.status(200).json({ Users: users });
    } catch (error) {
      return res.status(error.code).json({ error: error.message });
    }
  }

  async updateUser(req, res, next) {
    try {
      const { name, email, gender } = req.body;
      const userToUpdate = req.params.userId;

      if (userToUpdate !== req.userId) {
        return res
          .status(400)
          .json({
            Message:
              "You are unauthorized to update someone else's user information.",
          });
      }
      const updatedUser = await this.userRepository.updateUser(userToUpdate, {
        name,
        email,
        gender,
      });

      return res.status(201).json({ "Updated User": updatedUser });
    } catch (error) {
      console.log(error);
      return res.status(error.code).json({ error: error.message });
    }
  }

//   async sendFriendRequest(req, res, next) {}

//   async sendOTPforPasswordReset(req, res, next) {
//     try {
//       const email = req.body.email;
//       const userId = req.userId;
//       const OTPsent = await this.userRepository.sendOTP(email, userId);
//       return res.send(200).send(OTPsent);
//     } catch (error) {
//       console.log(error);
//       return res.status(error.code).json({ error: error.message });
//     }
//   }
}
