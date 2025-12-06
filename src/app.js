const express=require('express');

const app=express();


app.use("/user", [(req, res, next)=> {
    console.log("Response 1");
    // res.send("Response1 !!!!!");
    next();
},
    (req,res,next)=>{
        console.log("Response 2");
        // res.send("Response 2!!!!");
        next();
    },],
    (req,res)=>{
        console.log("Response 3");
        res.send("Response 3!!!!");
    }
)



// app.get("/user", (req, res)=> {
//     res.send({"firstname":"Tamanjot", "lastname":"Kaur"});
// })


// app.get("/user/:name", (req, res)=> {
//     res.send({"firstname":"Tamanjot", "lastname":"Kaur"});
// })

// app.post("/user", (req, res)=> {
//     res.send("Data successully saved to the database");
// })

// app.delete("/user", (req, res)=> {
//     res.send("Delete user successfully");
// })

// // order matters if we write the "/" in the first then it completes all the requests
// //.use match all the https call methods to /test

// app.use("/test", (req, res) =>{
//     res.send("Hello from the server ");
// })


app.listen(3000, () => {
    console.log("Server is listening");
});

