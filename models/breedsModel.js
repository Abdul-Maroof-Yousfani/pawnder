import mongoose from "mongoose"

const breedSchema = mongoose.Schema({
    name:{type:String},
 
    status: { type: String, default: '1' },
    created_at : { type : Date, default: Date.now }
});

export default mongoose.model("breeds",breedSchema);