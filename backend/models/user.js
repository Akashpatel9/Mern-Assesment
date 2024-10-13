import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required: true,
        trim:true,
        unique:true,
        lowercase : true,
    },
    email:{
        type:String,
        required: true,
        trim:true,
        lowercase : true,
        unique:true
    },
    password:{
        type:String,
        required: true,
        minLength: 6,
    }
});

export const userModel = mongoose.model("User", userSchema);
