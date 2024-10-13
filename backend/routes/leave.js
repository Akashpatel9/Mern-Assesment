import { Router } from "express";
import { upload } from "../utils/multer.js";
import { addLeaveHandler, editLeaveStatusHandler, getAllLeaveHandler } from "../controllers/leave.js";
import { auth } from "../middlewares/user.js";

const route = Router();


route.post('/addleave',auth, upload.single('file'), addLeaveHandler);
route.put('/editLeavestatus',auth, editLeaveStatusHandler)
route.get('/getAllLeaves',auth, getAllLeaveHandler)




export default route;
