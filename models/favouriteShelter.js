import mongoose from "mongoose"

const favouritesShelterSchema = mongoose.Schema({
    shelter_id: {type:mongoose.Types.ObjectId},
    user_id: {type:mongoose.Types.ObjectId},
    created_at : { type : Date, default: Date.now }
});

export default mongoose.model("favourites_shelters",favouritesShelterSchema);