import mongoose from "mongoose";

const condidateSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        unique:true,
        lowercase : true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique:true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique:true
    },
    position: {
        type: String,
        enum:["Intern", "Full Time", "Junior", "Senior", "Team Lead"],
        trim: true,
    },
    department: {
        type: String,
        required: true,
        trim: true,
    },
    experience: {
        type: String,
        required: true,
    },
    resume: {
        type: String,
        required: true
    },
    status:{
        type: String,
        enum:["New", "Rejected", "Ongoing", "Selected", "Scheduled"],
        default:"New"
    },
    dateOfJoining:{
        type:Date,
        default:Date.now,
    },
    task:{
        type:String,
        trim:true,
        default:"N/A"
    },
    attendenceStatus:{
        type:String,
        enum:["Present","Absent","Medical Leave","Work From Home"],
        default:"Present"
    },
    leaves:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Leave"
        }
    ]
});

export const condidateModel = mongoose.model("Condidate", condidateSchema);
