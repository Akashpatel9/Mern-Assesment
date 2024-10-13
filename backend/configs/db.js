import mongoose from "mongoose";

export function dbConnect() {
    mongoose.connect(process.env.DB_URL)
    .then(() => console.log("Successfully Connected to DB"))
    .catch((err) => {
        console.log("Problem Occurred while Connecting to DB");
        console.error(err.message);
    });
}
