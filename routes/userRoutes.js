const express= require("express");
const { signup, signin } = require("../controlller/userController");
const userRouter=express.Router();

userRouter.post("/signup",signup);

userRouter.post("/signin", signin);

//without this line we cannot import it elsewhere
module.exports=userRouter;