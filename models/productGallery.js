
import mongoose from "mongoose"

const productGallerySchema = mongoose.Schema({
    path:{type:String},
    product_id :  {type:mongoose.Types.ObjectId},
    created_at : { type : Date, default: Date.now }
});

export default mongoose.model("productGallery",productGallerySchema);