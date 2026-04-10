const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcrypt");

// const { userAuth } = require("../middlewares/auth");
const { timeStamp } = require("node:console");
const jwt = require("jsonwebtoken");

const userSchema=mongoose.Schema({
    firstName: {
        type: String,
        required:true,
        minLength: 4,
        maxLength: 50
    },
    lastName: {
        type: String,
        minLength: 2,
        maxLength: 50
    },
    emailId: {
        type: String,
        lowercase: true,
        trim: true,
        // index: true, or
        unique: true,
        required: true,
        minLength: 5,
        maxLength: 30,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Please use a valid email address❗");
            }
        },
    },
    password: {
        type: String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Please use Strong Password❗");
            }
        },
    },
    age: {
        type: Number,
        default: 18,
        min: 18,
    },
    gender: {
        type: String,
        enum: {
            values: ["Male", "Female", "Other"],
            message :`{VALUE} is not a valid gender type`,
        },
    },
    dateOfBirth: {
        type: Date,
        validate(value){
            if(value > new Date()){
                throw new Error("Date cannot be written for the future");
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/512/219/219969.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Enter a valid Photo URL❗");
            }
        },
    },
    about: {
        type: String,
        default: "This is default description!"
    },
    skills: {
        type: [String],
        validate(value){
            if(value.length>20){
                throw new Error("Too many Skills❗")
            }
        }
    },
}, 
{
    timestamps: true,
});


userSchema.methods.getJWT=async function() {
    const user=this;
    const token=await jwt.sign({_id : user._id}, "DEV@Tinder$790", {expiresIn : "1d"});
    return token;
};


userSchema.methods.validatePassword=async function(passwordInputByUser){
    const user=this;
    const passwordHash=user.password;
    const isPasswordValid=await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
};


const User=mongoose.model("User", userSchema);

module.exports=User;

