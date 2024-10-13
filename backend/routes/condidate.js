import { Router } from "express";
import { addCandidateHandler, deleteCandidateHandler, editCandidateHandler, getCandidateHandler, statusCandidateHandler, updateTaskHandler } from "../controllers/condidate.js";
import { upload } from "../utils/multer.js";
import { auth } from "../middlewares/user.js";

const route = Router();

route.post("/addCondidate", auth, upload.single('resume'), addCandidateHandler);//--
route.put('/editCondidate/:id',auth, editCandidateHandler); //--
route.delete("/deleteCondidate/:id",auth, deleteCandidateHandler); //--
route.put("/updateCondidate",auth, statusCandidateHandler); //--
route.get("/getCondidate",auth, getCandidateHandler); //--
route.put("/updateTask",auth, updateTaskHandler);




export default route;
