
import mongoose from "mongoose"

const productSchema = mongoose.Schema({
    breed_id: {type:mongoose.Types.ObjectId},
    pet_category_id : {type:mongoose.Types.ObjectId},
    characteristics_id:{type:mongoose.Types.ObjectId},
    shelter_id:{type:mongoose.Types.ObjectId},
    volunteer_id:{type:mongoose.Types.ObjectId},
    name:{ type:String},
    description:{ type:String},
    age:{ type:String},
    color:{ type:String},
    gender:{ type:String},
    weight:{ type:String},
    height:{ type:String},
    status: { type: String, default: '1' },
    created_at : { type : Date, default: Date.now }
    
  

});

export default mongoose.model("products",productSchema);