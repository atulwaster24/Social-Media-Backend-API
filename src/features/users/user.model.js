import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {type: String, required: true, minLength: [3, "Name should be atleast 3 characters."]},
    email: {type: String, required: true, match: [/.+\@.+\../, "Please enter a valid email"]},
    password: {type: String,
        validate:{validator: function(value){
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
        }, message: "Password should be 8 or more characters and should have a special character."} 
    },
    gender: {type: String, enum: ['Male', "Female", "Prefer not to say"]}
});


const userModel = new mongoose.model('User', userSchema);

export default userModel;