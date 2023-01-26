import mongoose from "mongoose"

const characteristicsSchema = mongoose.Schema({
    name:{type:String}
});

export default mongoose.model("characteristics",characteristicsSchema);