const express=require('express');
const connectDB = require("./config/databaseM");
const app=express();
const User=require("./models/user");

app.use(express.json());

app.post("/signup", async (req,res) => {

    const user=new User(req.body);
    try{
        await user.save();
        res.send("User Added Successfully");
    }
    catch(err){
        res.send(400).send("Error in saving user" + err.message);
    }
})

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


