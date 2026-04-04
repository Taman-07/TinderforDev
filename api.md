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



### Flow for the signup ###

- 1. Validating 
- 2. Encrypting Password 
- 3. Saving user to our database



### Schema validations ####

# Validate function -> 

- validators run automatically when a new user is created.

- validators do not work at the time of patch/update the user data.
- we have to enable it to work properly using runValidators: true.


# api validators ->


- this only allowed api not to update all the data instead of these fields.

- const data=req.body;
- const ALLOWED_UPDATES=["photoUrl", "about", "skills"];
- const isAllowed=Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));

# it checks every field/keys given by the user is allowed to update or present in the ALLOWED_UPDATES array.
- if not present it will not allow the user to update. So, this validator works at the api level.




# Encrypting Passwords ->
- we use bcrypt hash function for this (password, salt rounds); -> generally they are 10 for good practice.
- once you encrypt the password it cannot be decrypted except the user if he/she remembers.


# JWT AND TOKENS AND COOKIES 

## JWT ->
- we use TCP/IP protocol to make a connection

- Whenever user login, server validates data of that user, it validates emailId, password or username and make a JWT token inside cookie.
- Server send cookie to the user it is unique for all and browser stores it. 
- Now, when user calls/hits an api call then at the time cookie is validated by the server and send the response to the user if it is valid.
- Everytime a request is made by the user, this cookie is validated and appropiate response is given to the user.


# When will Cookie not work ->
- Cookies has a expiry session depends upon the websites like some for (10s, 1 min, 10 min, hours, lifetime).
- Suppose a user sends a request and cookie gets expired. At that time, the user will redirect to the login page again because validation fails.



### JWT TOKENS ->
- We will have 3 things in the token 

- 1. Header -> secret data hide inside this
- 2. Payload 
- 3. Signature -> uses to check JWT actual or not 


## this keyword doesn't work with => functions so we always use = functions 



### API LIST->


# authRouter 
- POST/ signup 
- POST/ login
- POST/ logout

# profileRouter
- GET/   profile/view
- PATCH/ profile/edit
- PATCH/ profile/password

# connectionRouter
status -> ignore(pass) or like, accepted or rejected

- POST/ request/send/:status/:userId
- POST/ request/review/:status/:requestId


# userRouter
- GET/ user/requests
- GET/ user/connections 
- GET/ user/feed -> gets you the profiles of other users on the platform and keep changing get number of users like 28 or 30 





# INDEXES ->

- In our connection DB, if one user is sending request or rejecting or do anything with the requests. It will stored in the DB. 
- Imagine if there are 100 users and everybody is sending connection request to everyone. This makes our DB very costly to manage cause it has a lot of data.

# That's why we need indexes to make our API'S much faster to find any user.
- index: true or unique: true 
- unique is much faster.

# Compound Indexes ->
- fromUser <=> toUser 
- it works in both 




# POST API'S -> thought process
- User is trying to enter the db
- Attackers can be send some random data into api and make our db spoil.
- So, validations are soo sooo important.


# GET API'S -> thought process
- We are sure that data is correct and we are sending only allowed data to the correct user.




# Pagination ->

- /feed?page=1&limit=10 => you want first 1-10 users => .skip(0) & .limit(10) 

- /feed?page=2&limit=10 => you want 11-20 users => .skip(10) & .limit(20) 


# there are functions for this ->
- 1 .skip() -> means how many users did you skip from the first

- 2 .limit() -> means how many users did you need means only 10 users you want to show or 20 and so on...
 

skip = (page-1) * limit;

# http://localhost:3000/feed?page=1&limit=2 checks using this api 


