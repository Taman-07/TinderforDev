const jwt=require("jsonwebtoken");
const User =require("../models/user");

const adminAuth = (req,res,next) =>{
    // logic for the authorization
    console.log("Admin auth is getting checked !");
    
    const token="xyz";
    const isAdminAuthorized=token=="xyz";
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized Access");
    }
    else{
        next();
    }
};

// const userAuth = (req,res,next) =>{
//     // logic for the authorization
//     console.log("Admin auth is getting checked !");
    
//     const token="xyz";
//     const isAdminAuthorized=token=="xyz";
//     if(!isAdminAuthorized){
//         res.status(401).send("Unauthorized Access");
//     }
//     else{
//         next();
//     }
// };



// const userAuth = async (req,res,next) =>  {
//     // read token from the request cookies 
//     // validate token
//     // find the user


//     try{
//         const cookies=req.cookies;
//         const { token }=req.cookies;

//         if(!token){
//             throw new Error("Token is not valid ❗");
//         }
//         const decodedObj=await jwt.verify(token, "DEV@Tinder$790");

//         const { _id }=decodedObj;

//         const user=await User.findById(_id);

//         if(!user){
//             throw new Error("User not found❗");
//         }
//         req.user=user;
//         next();
//     }
//     catch(err){
//         res.status(404).send("Error❗"+ err.message);
//     }
// };

const userAuth = async (req,res,next) => {

    try{

        const { token } = req.cookies;

        if(!token){
            return res.status(401).send("Please Login!");
        }

        const decodedObj = jwt.verify(token, "DEV@Tinder$790");

        const { _id } = decodedObj;

        const user = await User.findById(_id);

        if(!user){
            throw new Error("User not found ❗");
        }

        req.user = user;

        next();

    }
    catch(err){
        res.status(401).send("Error ❗ " + err.message);
    }
};

module.exports={
    adminAuth,
    userAuth,
}