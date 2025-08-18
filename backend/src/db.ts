import mongoose from 'mongoose';
import {model, Schema} from 'mongoose'
import dotenv from "dotenv";
dotenv.config()


const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI as string);
    console.log(`MongoDB Connected:`);
  } catch (error) {
    console.error('Database connection error:', error);

  }
};

export default connectDB;

//user schema
const UserSchema = new Schema({
    username:{type:String, unique:true},
    password:String,
    name:{type:String, trim:true}
})

export const userModel = model("User", UserSchema)