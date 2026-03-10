const mongoose=require("mongoose");
const validator=require("validator");

// const { userAuth } = require("../middlewares/auth");
const { timeStamp } = require("node:console");

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
        index: true,
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
        validate(value){
            if(!["male", "female", "others"].includes(value)){
                throw new Error("Gender data is not Valid ❗");
            }
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

const User=mongoose.model("User", userSchema);

module.exports=User;

