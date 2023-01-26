import mongoose from "mongoose"

const citySchema = mongoose.Schema({
    name:{
        type:String
    }
});

export default mongoose.model("cities",citySchema);