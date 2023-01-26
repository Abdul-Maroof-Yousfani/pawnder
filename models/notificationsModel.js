import mongoose from "mongoose";
import moment from 'moment';
const notifySchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
    },
    payload:{},
    sender_id:{
        type:mongoose.Types.ObjectId
    },
    reciever_id:{
        type:mongoose.Types.ObjectId
    },
    viewStatus:{
        type:Boolean,
        default: 0
    },
    notificationtype:{
        type: String,
        default:""
    },
    createdDate:{
        type: String
    }
})
export default mongoose.model("notifications",notifySchema)