
import mongoose from "mongoose"

const prodRecentViewSchema = mongoose.Schema({
    product_id: {type:mongoose.Types.ObjectId},
    user_id: {type:mongoose.Types.ObjectId},
    created_at : { type : Date, default: Date.now }
    
  

});

export default mongoose.model("productrecentview",prodRecentViewSchema);