import mongoose from "mongoose"

const stateSchema = mongoose.Schema({
    name:{
        type:String,
        unique: true,
        required:true
    }
});

export default mongoose.model("states",stateSchema);