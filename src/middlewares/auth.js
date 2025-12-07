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

const userAuth = (req,res,next) =>{
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

module.exports={
    adminAuth,
    userAuth,
}