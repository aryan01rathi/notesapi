const userModel= require("../models/user");
const bcrypt = require("bcrypt");
const jwt= require("jsonwebtoken");
const SECRET_KEY= process.env.SECRET_KEY ;

const signup=async (req,res)=>{

    //1. Existing user check
    //2. Hashed password
    //3. User Creation
    //4. Token Generate
    const {username,email, password}= req.body;
    try{
        //1.
        const existinguser =  await  userModel.findOne({email: email});
        if(existinguser){
            return res.status(400).json({message:"User Already exists"});
        }
        //2.
        const hashedPassword= await bcrypt.hash(password,10);

        //3.
        const result= await userModel.create({
            email:email,
            password:hashedPassword,
            username:username
        });

        //4. we have paylaod to identify the user and a secret key to encrypt user
        const token= jwt.sign({email:result.email,id:result._id},SECRET_KEY);
        res.status(200).json({user:result,token:token});


    } catch(error){
        console.log(error);
        res.status(500).json({message:"Something went wrong "+error});
    }

};

const signin=async (req,res)=>{
    const {email,password}=req.body;
    
    try {
        //check if user exist or not
        const existingUser=await userModel.findOne({email:email});
        if(!existingUser){
            return res.status(404).json({message:"User not found"});
        }

        //check if the password matches or not
        const matchPassword= await bcrypt.compare(password,existingUser.password);

        if(!matchPassword){
            return res.status(400).json({message:"Invalid Password"});
        }
        
        //create a token
        const token= jwt.sign({email:existingUser.email,id:existingUser._id},SECRET_KEY);
        res.status(201).json({user:existingUser,token:token});


    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong"+error});
    }


};

module.exports={signin,signup};