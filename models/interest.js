import mongoose from "mongoose"

const interestSchema = mongoose.Schema({
    name:{
        type:String,
        unique: true,
        required:true
    }
});

export default mongoose.model("interests",interestSchema);