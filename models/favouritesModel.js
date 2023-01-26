import mongoose from "mongoose"

const favouritesSchema = mongoose.Schema({
    product_id: {type:mongoose.Types.ObjectId},
    user_id: {type:mongoose.Types.ObjectId},
    type: {type:String},
    created_at : { type : Date, default: Date.now }
});

export default mongoose.model("favourites",favouritesSchema);