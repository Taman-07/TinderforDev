const express=require('express');
const profileRouter=express.Router();
const bcrypt=require("bcrypt");

const {userAuth}=require("../middlewares/auth");
const {validateEditProfileData}=require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async(req,res)=>{
    try{
        const user=req.user;
        if(!user){
            throw new Error("Please log in again❗");
        }
        res.send(user);
    }
    catch(err){
        res.status(404).send("Error❗: " + err.message);
    }
});


profileRouter.patch("/profile/edit", userAuth, async(req,res)=>{
    try{
        if(!validateEditProfileData(req)){
            return res.status(404).send("Error❗");
        }
        const user=req.user;

        Object.keys(req.body).forEach(key => user[key] = req.body[key]);
        await user.save();

        res.json({message : `${user.firstName}, your profile is updated successfully 😊`, 
                data: user});
    }
    catch(err){
        res.status(404).send("Error❗");
    }
});


profileRouter.patch("/profile/edit/password", userAuth, async (req, res) => {
    try {

        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).send("Please provide oldPassword and newPassword");
        }

        const user = req.user;

        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

        if (!isPasswordValid) {
            return res.status(400).send("Please provide correct details ❎");
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        res.send("Password Updated successfully 🔑");

    }
    catch (err) {
        res.status(500).send("Error❗ " + err.message);
    }
});

module.exports=profileRouter;