import mongoose, { STATES } from "mongoose";

const leaveSchema = new mongoose.Schema({
    candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Condidate",
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        lowercase : true,
    },
    designation: {
        type: String,
        required: true,
        trim: true,
    },
    leaveStartDate:{
        type:Date,
        required:true
    },
    leaveEndDate:{
        type:Date,
        required:true
    },
    reason:{
        type: String,
        required: true,
        trim: true,
    },
    attachement:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["Pending","Approved","Rejected"],
        default:"Pending"
    }
});

export const leaveModel = mongoose.model("Leave", leaveSchema);
