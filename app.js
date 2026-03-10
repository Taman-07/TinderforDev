const express=require('express');
const connectDB = require("./config/databaseM");
const app=express();
const User=require("./models/user");
const {validateSignupData} = require("./utils/validation");
const bcrypt=require("bcrypt");
const cookieParser=require("cookie-parser");
const jwt=require("jsonwebtoken");
const {userAuth}=require("./middlewares/auth");



app.use(express.json());
app.use(cookieParser());



// get user data using email
app.get("/user", userAuth, async (req,res)=>{
    const userName=req.body.lastName;
    try{
        const users=await User.find({lastName: userName});
        if(users.length===0){
            res.status(404).send("User not found");
        }
        else{
            res.send(users);
        }
    }
    catch(err){
        res.status(400).send("Cannot find User");
    }
});

// get all the data of the users
app.get("/feed", async (req,res)=>{
    try{
        const users=await User.find({});
        res.send(users);
    }
    catch(err){
        res.status(400).send("Cannot find User");
    }
});


// deleting a user data
app.delete("/user", async(req,res)=>{
    const userId=req.body.userId;
    try{
        const users=await User.findByIdAndDelete(userId);
        // const users=await User.findByIdAndDelete({_id:userId});
        res.send("User deleted successfully!");
    }
    catch(err){
        res.status(404).send("User not found");
    }
});



// profile of users 
app.get("/profile", userAuth, async(req,res)=>{
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




// adding users dynamically
app.post("/signup", async (req,res) => {
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
        await user.save();
        res.send("User Added Successfully❗😁");
    }
    catch(err){
        res.status(404).send("Error in saving user❗: " + " " + err.message);
    }
});



// login api 
app.post("/login", async (req,res) =>{
    try{
        // VALIDATING 
        const {emailId, password}=req.body;
        
        const user=await User.findOne({emailId : emailId});

        if(!user){
            throw new Error("Invalid credentials❗")
        }
        const isPasswordValid=await bcrypt.compare(password, user.password);


        if(isPasswordValid){

            // create a JWT Token 
            const token=jwt.sign({_id : user._id}, "DEV@Tinder$790");
    

            // Add the token to cookie and res back to user 
            res.cookie("token", token);
            res.send("Login Successfully❗😁 ");
        }
        else{
            throw new Error("Invalid credentials❗");
        }
    }
    catch(err){
        res.status(404).send("Error in login user❗: " + err.message);
    }
});





// updating the user data
app.patch("/user/:userId", async(req,res)=>{
    const userId=req.params?.userId;
    const data=req.body;

    try{
        // const users=await User.findByIdAndUpdate({_id : userId} , data, {returnDocument: "after"});
        const users=await User.findByIdAndUpdate({_id : userId} , data, {
            returnDocument: "after",
            runValidators: true
        });

        const ALLOWED_UPDATES =["photoUrl", "about", "skills", "password"];
        const isAllowed=Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));

        if(!isAllowed){
            res.status(404).send("Update failed❗🫢");
        }

        console.log(users);
        res.send("User data updated Successfully❗ 😁");
    }
    catch(err){
        res.status(404).send("Update failed❗🫢" + " " + err.message);
    }
});


connectDB()
    .then(()=>{
        console.log("Database connection done");
        app.listen(3000, () => {
            console.log("Server is listening");
        });
    })
    .catch((err)=>{
        console.log("Database is not connected");
    });
