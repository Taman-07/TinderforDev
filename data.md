- order matters if we write the "/" in the first then it completes all the requests
- app.use match all the https call methods to /test
- when we do an api call => it will go line by libe throughout the middle wares, until it reaches the request handlers which has res.send 
- methods of writing route handlers:

 1. app.use("/user", [(req, res, next)=> {
    console.log("Response 1");
    //res.send("Response1 !!!!!");
        next();
        },
   (req,res,next)=>{
         console.log("Response 2");
        //res.send("Response 2!!!!");
         next();
     },],
     (req,res)=>{
         console.log("Response 3");
         res.send("Response 3!!!!");
    })


2. // app.get("/user", (req, res,next)=> {
    //     console.log("First Response");
    //     next();
    // })
    // app.get("/user", (req, res)=> {
    //     console.log("2nd Response");
    //     res.send("2nd Response send!!!!")
    // })



- a middleware is only called for matching / routes not for the another ones
