import mongoose from "mongoose";

const chatsSchema = new mongoose.Schema({
        senderId:{type:mongoose.Types.ObjectId},
        receiverId:{type:mongoose.Types.ObjectId},
        message:{type:String},
        type:{type:String},
        createdDate:String,
   

})
export default mongoose.model("chats", chatsSchema)


