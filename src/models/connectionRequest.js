const mongoose=require('mongoose');

const connectionRequestSchema=new mongoose.Schema({

    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        requied: true,
    },

    toUserId: {
        type: mongoose.Schema.Types.ObjectId,

        // reference to the user table
        ref: "User",
        required: true,
    },

    status: {
        type: String,
        required: true,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: `{VALUE} is not supported`,
        }
    },
},
 {
    timestamps: true,
});


// compound index 
// 1 means ascending

connectionRequestSchema.index({fromUserId : 1, toUserId : 1});


// middleware to check whether the from user id is equals to to user id

connectionRequestSchema.pre("save", async function(){
    const connectionRequest=this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send the connection request to Yourself !");
    }
});



const ConnectionRequestModel=new mongoose.model("Connection Request", connectionRequestSchema);
module.exports=ConnectionRequestModel;