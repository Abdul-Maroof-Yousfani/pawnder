import mongoose from "mongoose"

const occupationSchema = mongoose.Schema({
    name:{
        type:String,
        unique: true,
        required:true
    }
});

export default mongoose.model("occupations",occupationSchema);