const express=require('express');

const connectDB = require("../databaseM");

const app=express();

const User=require("./models/user");

app.post("/signup", async (req,res) => {
    const userObj={
        firstName: "Tamanjot",
        lastName: "K",
        email: "tamanjot_k@gmail.com",
        password: "tamank123"
    }

    const user=new User(userObj);

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


// const { adminAuth, userAuth }=require('./middlewares/auth');


// app.use("/admin", adminAuth); 

  

// app.get("/getUserData", (req,res) =>{
//     // logic of DB call and get user data
//     try{
//         throw new Error("abcd");
//         req.send("User Data Sent");
//     }
//     catch(err){
//         res.status(500).send("Something went wrong !!!!");
//     }
// });


// // app.use("/", (err, req, res, next)=>{
// //     if(err){
// //         res.status(500).send("Something went wrong !!!!");
// //     }
// // });


// // app.get("/admin/getAllData", (req,res) =>{
// //     res.send("All Data Sent");
// // })

// // app.get("/admin/deleteUser", (req,res) =>{
// //     res.send("Deleted a User");
// // })

// // app.get("/user/login", (re,res) =>{
// //     res.send("User logged in successfully");
// // })

// // app.get("/user/data", userAuth, (req,res) =>{
// //     res.send("User Data Sent");
// // })

