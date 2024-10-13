import express from "express";
import { dbConnect } from "./configs/db.js";
import dotenv from "dotenv";
import cors from "cors"
import userRouter from "./routes/user.js";
import condidateRouter from "./routes/condidate.js";
import leaveRouter from "./routes/leave.js";
import { configCloudinary } from "./configs/cloudinary.js";

const app = express();


// configs
dotenv.config();

dbConnect();
configCloudinary();


app.use(cors())
app.use(express.json());


app.use("/user",userRouter)
app.use("/condidate",condidateRouter)
app.use("/leave",leaveRouter)

const PORT = process.env.PORT || 3000;

// test route
app.get('/', (req, res) => {
    res.send("Hello World!")
})


// undefined route
app.get("*", (req, res) => {
    res.status(404).json({
        message: "Route Not Found",
        success: false
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});


// global catch
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({
        message: "Something went wrong!",
        error: err.message
    });
});