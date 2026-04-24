const express=require('express');
const connectDB = require("./config/databaseM");
const app=express();
const cookieParser=require("cookie-parser");
const cors=require("cors");
const socket = require("socket.io");
const http = require('http');


app.use(
    cors({
  origin: "http://localhost:5173",
  credentials: true,
})
);
app.use(express.json());
app.use(cookieParser());


const authRouter=require('./routes/auth');
const profileRouter=require('./routes/profile');
const requestRouter=require('./routes/request');
const userRouter=require('./routes/user');
const { createServer } = require('node:http');
const initializeSocket = require('./utils/socket');


app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);


const server = http.createServer(app);
initializeSocket(server);


connectDB()
    .then(()=>{
        console.log("Database connection done");
        server.listen(3000, () => {
            console.log("Server is listening");
        });
    })
    .catch((err)=>{
        console.log("Database is not connected");
    });
