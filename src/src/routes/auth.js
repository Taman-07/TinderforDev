const express=require('express');
const authRouter=express.Router();


const {validateSignupData} = require("../utils/validation");
const User=require("../models/user");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");


authRouter.post("/signup", async (req,res) => {
    const data=req.body;
    try{
        // validation of data
        validateSignupData(req);

        // encrypt the password 
        const {firstName,lastName,emailId,password,age,gender,dateOfBirth,photoUrl,about,skills,} = req.body;

        const passwordHash=await bcrypt.hash(password, 10);

        // entering and saving the user
        const user=new User({
            firstName, 
            lastName, 
            emailId, 
            password:passwordHash,
            age, 
            gender, 
            dateOfBirth,
            photoUrl,
            about,
            skills,
        });
        const savedUser = await user.save();

        const token=await user.getJWT();

        res.cookie("token", token, {expires: new Date(Date.now() + 8 * 60 * 60 * 1000)},);
        
        res.json({message: "User Added Successfully❗😁", data: savedUser});
    }
    catch(err){
        res.status(404).send("Error in saving user❗: " + " " + err.message);
    }
});

authRouter.post("/login", async (req,res) =>{
    try{
        // VALIDATING 
        const {emailId, password}=req.body;
        
        const user=await User.findOne({emailId : emailId});

        if(!user){
            throw new Error("Invalid credentials❗")
        }

        const isPasswordValid=await user.validatePassword(password);


        if(isPasswordValid){

            // create a JWT Token 
            const token=await user.getJWT();
    

            // Add the token to cookie and res back to user 
            res.cookie("token", token, {expires: new Date(Date.now() + 8 * 60 * 60 * 1000)},);
            res.send(user);
        }
        else{
            throw new Error("Invalid credentials❗");
        }
    }
    catch(err){
        res.status(404).send("Error in login user❗: " + err.message);
    }
});

authRouter.post("/logout", async(req, res)=>{
    res.cookie("token", null,{
        expires: new Date(Date.now()),
    });
    res.send("Logout successfully❗");
});




module.exports=authRouter;