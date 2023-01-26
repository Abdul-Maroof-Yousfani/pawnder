
import mongoose from "mongoose"

const shelterRatingSchema = mongoose.Schema({

    shelter_id :  {type:mongoose.Types.ObjectId},
    rating :      {type:Number},
    status:       {type:Number, default: 1},
    created_at : { type : Date, default: Date.now }
 
});

export default mongoose.model("shelter_rating",shelterRatingSchema);