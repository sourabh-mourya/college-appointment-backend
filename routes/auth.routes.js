import express from "express"
import singup from "../controller/AuthControllers/singup.controller.js";
import login from "../controller/AuthControllers/login.controller.js";

const authRouter=express.Router();


authRouter.post('/singup',singup)
authRouter.post('/login',login)


export default authRouter;