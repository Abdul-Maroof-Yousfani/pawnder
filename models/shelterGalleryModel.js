
import mongoose from "mongoose"

const shelterGallerySchema = mongoose.Schema({
    path:{type:String},
    shelter_id : {type:mongoose.Types.ObjectId},
    created_at : { type : Date, default: Date.now }
});

export default mongoose.model("shelterGallery",shelterGallerySchema);