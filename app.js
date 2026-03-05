const express=require('express');
const connectDB = require("./config/databaseM");
const app=express();
const User=require("./models/user");

app.use(express.json());


// get user data using email
app.get("/user", async (req,res)=>{
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


// adding users dynamically
app.post("/signup", async (req,res) => {

    const user=new User(req.body);
    try{
        await user.save();
        res.send("User Added Successfully");
    }
    catch(err){
        res.send(400).send("Error in saving user" + err.message);
    }
});

// deleting a user data
app.delete("/user", async(req,res)=>{
    const userId=req.body.userId;
    try{
        const users=await User.findByIdAndDelete(userId);
        // const users=await User.findByIdAndDelete({_id:userId});
        res.send("User deleted successfully");
    }
    catch(err){
        res.send(400).send("User not found");
    }
});


// updating the user data
app.patch("/user", async(req,res)=>{
    const userId=req.body.userId;
    const data=req.body;
    try{
        // const users=await User.findByIdAndUpdate({_id : userId} , data, {returnDocument: "after"});
        const users=await User.findByIdAndUpdate({_id : userId} , data);
        // console.log(users);
        res.send("User data updated Successfully");
    }
    catch(err){
        res.send(404).send("User not found");
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
