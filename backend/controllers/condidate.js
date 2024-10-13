import mongoose from "mongoose";
import { condidateModel } from "../models/condidate.js";
import { uploadToCloudinary } from "../utils/fileUpload.js";


//add condidate
export const addCandidateHandler = async (req, res) => {
    try {
        // get file
        const resumePath = req.file.path;

        // get data from body
        const { fullName, email, phoneNumber, department, experience } = req.body;

        // Check if all fields are provided
        if (!fullName || !email || !phoneNumber || !department || !experience || !resumePath) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        // Check if the candidate already exists
        const existingUser = await condidateModel.findOne({
            $or: [{ email: email }, { phoneNumber: phoneNumber }]
        });

        if (existingUser) {
            return res.status(400).json({
                message: "Candidate already exists with this email or phone number",
                success: false
            });
        }

        // Upload the resume file to Cloudinary
        const cloudinaryResult = await uploadToCloudinary(resumePath, req.file.originalname);

        const cloudinaryUrl = cloudinaryResult.secure_url;


        // Create a new candidate entry
        const userDetails = await condidateModel.create({
            fullName,
            email,
            phoneNumber,
            department,
            experience,
            resume: cloudinaryUrl
        });

        // Successful response
        return res.status(201).json({
            message: "Candidate created successfully",
            success: true,
            data: userDetails
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
};




//add condidate
export const getCandidateHandler = async (req, res) => {
    try {
        // get all candidate entry
        const userDetails = await condidateModel.find();

        // Successful response
        return res.status(201).json({
            message: "get all successfully",
            success: true,
            data: userDetails
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
};





//edit condidate
export const editCandidateHandler = async (req, res) => {
    try {

        // get id from query
        const { id } = req.params;

        // Check if id is provided
        if (!id) {
            return res.status(400).json({
                message: "ID not found",
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

        // get data from body
        const { fullName, email, phoneNumber, department, position, dateOfJoining } = req.body;

        // Check if all fields are provided
        if (!fullName || !email || !phoneNumber || !department || !position || !dateOfJoining) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        // Check if the candidate already exists
        const existingUser = await condidateModel.findById(id);

        if (!existingUser) {
            return res.status(400).json({
                message: "Candidate not exists with this id",
                success: false
            });
        }

        const existingUpdatedUser = await condidateModel.findByIdAndUpdate(id, { fullName, email, phoneNumber, department, position, dateOfJoining }, { new: true });

        // Successful response
        return res.status(201).json({
            message: "Candidate updated successfully",
            success: true,
            data: existingUpdatedUser
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
};




//update task condidate
export const updateTaskHandler = async (req, res) => {
    try {

        // get id from query
        const { id, attendenceStatus, task } = req.query;

        // Check if id is provided
        if (!id) {
            return res.status(400).json({
                message: "ID not found",
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


        // Check if the candidate already exists
        const existingUser = await condidateModel.findById(id);

        if (!existingUser) {
            return res.status(400).json({
                message: "Candidate not exists with this id",
                success: false
            });
        }



        const updateFields = {};
        if (task !== undefined) {
            updateFields.task = task;
        }
        if (attendenceStatus !== undefined) {
            updateFields.attendenceStatus = attendenceStatus;
        }

        // Update the candidate with the fields provided
        const updatedUser = await condidateModel.findByIdAndUpdate(
            id,
            updateFields,
            { new: true }
        );

        // Successful response
        return res.status(201).json({
            message: "Candidate updated successfully",
            success: true,
            data: updatedUser
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
};





// delete Candidate
export const deleteCandidateHandler = async (req, res) => {
    try {
        // get id from query
        const { id } = req.params;

        // Check if id is provided
        if (!id) {
            return res.status(400).json({
                message: "ID not found",
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

        // Check if the candidate exists
        const existingUser = await condidateModel.findById(id);

        if (!existingUser) {
            return res.status(404).json({
                message: "Candidate does not exist",
                success: false
            });
        }

        // Delete the candidate
        const response = await condidateModel.findByIdAndDelete(id);

        // Successful response
        return res.status(200).json({
            message: "Candidate deleted successfully",
            success: true,
            data: response
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
};




// Update Candidate Status
export const statusCandidateHandler = async (req, res) => {
    try {
        // get id and status from query parameters
        const { id, status } = req.query;

        // Check if id and status are provided
        if (!id || !status) {
            return res.status(400).json({
                message: "ID or status not found",
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

        // Check if the candidate exists
        const existingUser = await condidateModel.findById(id);

        if (!existingUser) {
            return res.status(404).json({
                message: "Candidate does not exist",
                success: false
            });
        }

        // Update the candidate's status
        const response = await condidateModel.findByIdAndUpdate(id, {
            status,
            dateOfJoining: Date.now()
        }, { new: true });

        // Successful response
        return res.status(200).json({
            message: "Candidate status updated successfully",
            success: true,
            data: response
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
};