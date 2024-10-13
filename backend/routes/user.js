import { Router } from "express";
import { signInHandler, signUpHandler } from "../controllers/user.js";

const route = Router();

route.post("/signup", signUpHandler);
route.post("/signin", signInHandler);

export default route;
