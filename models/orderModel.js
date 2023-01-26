
import mongoose from "mongoose"

const orderSchema = mongoose.Schema({
    
    product_id :    {type:mongoose.Types.ObjectId},
    volunteer_id :  {type:mongoose.Types.ObjectId},
    shelter_id :    {type:mongoose.Types.ObjectId},
    user_id:        {type:mongoose.Types.ObjectId},
    order_date :    {type:Date},
    order_time :    {type:Date},
    order_status :  {type:String,default: "pending"},
    payment_id :    {type:String,default: null},
    status:         {type:String, default: 1},
    created_at :    {type : Date}


});

export default mongoose.model("orders",orderSchema);