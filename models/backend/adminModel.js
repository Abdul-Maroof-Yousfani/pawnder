import mongoose from "mongoose"

const adminSchema = mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    status: { type: String, default: '1' },
    created_at : { type : Date, default: Date.now }
});

export default mongoose.model("admins",adminSchema);