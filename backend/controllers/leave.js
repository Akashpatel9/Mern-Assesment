import mongoose from "mongoose";
import { condidateModel } from "../models/condidate.js";
import { leaveModel } from "../models/leave.js";
import { uploadToCloudinary } from "../utils/fileUpload.js";



// Add Leave
export const addLeaveHandler = async (req, res) => {
    try {
        // get file path
        const documentPath = req.file?.path;

        // get data from body
        const { fullName, designation, leaveStartDate, leaveEndDate, reason } = req.body;

        // Check if all fields are provided
        if (!fullName || !designation || !leaveStartDate || !leaveEndDate || !reason || !documentPath) {
            return res.status(400).json({
                message: "All fields are required, including the document attachment",
                success: false,
            });
        }


        // Validate leave dates
        if (new Date(leaveEndDate) < new Date(leaveStartDate)) {
            return res.status(400).json({
                message: "Leave end date must be after the start date",
                success: false,
            });
        }

        // Check if the candidate exists
        const existingUser = await condidateModel.findOne({ fullName: fullName.trim().toLowerCase() });

        if (!existingUser) {
            return res.status(404).json({
                message: "Candidate does not exist with this name",
                success: false,
            });
        }

        // Upload the document file to Cloudinary and get the URL
        const cloudinaryResult = await uploadToCloudinary(documentPath, req.file.originalname);
        const cloudinaryUrl = cloudinaryResult.secure_url;


        // Create a new leave entry
        const leaveDetails = await leaveModel.create({
            candidate: existingUser._id,
            fullName,
            designation,
            leaveStartDate,
            leaveEndDate,
            reason,
            attachement: cloudinaryUrl,
        });

        // Successful response
        return res.status(201).json({
            message: "Leave created successfully",
            success: true,
            data: leaveDetails,
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message,
            success: false,
        });
    }
};




// get all Leave
export const getAllLeaveHandler = async (req, res) => {
    try {
        // get all leave entry
        const leaveDetails = await leaveModel.find();

        // Successful response
        return res.status(201).json({
            message: "Leave get successfully",
            success: true,
            data: leaveDetails,
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message,
            success: false,
        });
    }
};





// Edit Leave Status
export const editLeaveStatusHandler = async (req, res) => {
    try {
        // Get id and status from query
        const { id, status } = req.query;
        
        
        // Check if all fields are provided
        if (!id || !status) {
            return res.status(400).json({
                message: "ID or status not provided",
                success: false
            });
        }

        // Validate if the id is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid candidate ID",
                success: false
            });
        }

        // Check if the leave entry exists
        const existingUser = await leaveModel.findById(id);

        if (!existingUser) {
            return res.status(404).json({
                message: "Leave does not exist with this ID",
                success: false
            });
        }

        // Update the leave status
        const leaveDetails = await leaveModel.findByIdAndUpdate(id, { status }, { new: true });

        // Successful response
        return res.status(200).json({
            message: "Leave status updated successfully",
            success: true,
            data: leaveDetails
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
};