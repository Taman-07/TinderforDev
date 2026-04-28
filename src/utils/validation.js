const validator=require('validator');

const validateSignupData = (req) => {
    const {firstName, lastName, emailId, password} = req.body;

    if(!firstName || !lastName){
        throw new Error("User name is not Valid❗");
    }

    else if(firstName.length<4 && firstName.length>50){
        throw new Error("First name should be 4 to 50 characters ❗");
    }

    else if(lastName.length<4 && lastName.length>50){
        throw new Error("Last name should be 4 to 50 characters ❗");
    }

    else if(!validator.isEmail(emailId)){
        throw new Error("Please use a valid email address❗");
    }

    else if(!validator.isStrongPassword(password)){
        throw new Error("Please use a strong password❗");
    }
};

const validateEditProfileData = (req)=>{
    const allowedEditFields=["firstName", "lastName", "age", "gender","about", "skills", "photoUrl"];

    const isEditAllowed=Object.keys(req.body).every(field => allowedEditFields.includes(field));

    return isEditAllowed;
};


module.exports={
    validateSignupData,
    validateEditProfileData,
};