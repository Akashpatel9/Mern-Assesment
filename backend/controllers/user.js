import jwt from "jsonwebtoken";
import { userModel } from "../models/user.js";
import bcryptjs from "bcryptjs";


// signUp handler
export const signUpHandler = async (req, res) => {
    try {
        
        // get data from body
        const { fullName, email, password } = req.body;
        
        // Check if all fields are provided
        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }
        

        // Check if the user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already registered",
                success: false
            });
        }

        // Hash the password
        const hashedPassword = await bcryptjs.hash(password, parseInt(process.env.HASH_SALT));

        // Create a new user
        const userDetails = await userModel.create({
            fullName,
            email,
            password: hashedPassword
        });

        // successfull response
        return res.status(201).json({
            message: "User signed up successfully",
            success: true,
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
};



// signIn handler
export const signInHandler = async (req, res) => {
    try {
        
        // get data from body
        const { email, password } = req.body;
        
        // Check if all fields are provided
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        // Check if the user not exists
        const existingUser = await userModel.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({
                message: "User not registered",
                success: false
            });
        }

        // check password
        const resCheckPassword = await bcryptjs.compare(password, existingUser?.password);
        if (!resCheckPassword) {
            return res.status(401).json({
                message: "Wrong Password",
                success: false
            });
        }

        // generating jwt token
        const token = await jwt.sign({ email }, process.env.JWT_SECRET, {
            expiresIn: '2h'
        });

        return res.status(200).json({
            message: "Successfully logged in",
            success: true,
            token
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message,
            success: false
        });
    }
};
