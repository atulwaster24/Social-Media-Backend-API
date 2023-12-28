import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();


const URL = process.env.DB_URL
const connectToMongoDB = async ()=>{
   try {
    await mongoose.connect(URL)
    console.log("Connected to MongoDB using mongoose.")
   } catch (error) {
    console.log("Connection to MongoDB using mongoose failed :\n",error)
   }
}

export default connectToMongoDB;