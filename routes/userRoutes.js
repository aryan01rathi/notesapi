const express= require("express");
const { signup, signin,refreshToken } = require("../controlller/userController");
const userRouter=express.Router();
// console.log("signup called")

userRouter.post("/signup",signup);

userRouter.post("/signin", signin);
userRouter.post("/refresh", refreshToken);


//without this line we cannot import it elsewhere
module.exports=userRouter;