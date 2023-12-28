import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema({
    name: {type: String, required: true, minLength: [3, "Name should be atleast 3 characters."]},
    email: {type: String, unique: true, required: true, match: [/.+\@.+\../, "Please enter a valid email"]},
    password: {type: String,
        validate:{validator: function(value){
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
        }, message: "Password should be 8 or more characters and should have a special character."} 
    },
    gender: {type: String, enum: ['Male', "Female", "Prefer not to say"]}
});

// Hash the password before saving to the database
userSchema.pre('save', async function (next) {
    try {
      if (this.isModified('password') || this.isNew) {
        const hashedPassword = await bcrypt.hash(this.password, 12);
        this.password = hashedPassword;
      }
      return next();
    } catch (error) {
      return next(error);
    }
  });

const UserModel = new mongoose.model('User', userSchema);

export default UserModel;