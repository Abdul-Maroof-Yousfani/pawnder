
import mongoose from "mongoose"

const petCategorySchema = mongoose.Schema({
    name:{
        type:String
    
    },
    status:{
        type: String,
        default:1
    },
    breed:[{
        type:mongoose.Types.ObjectId,
        ref:"breeds",
        default:[]
    }],
    characteristic:[{
        type:mongoose.Types.ObjectId,
        ref:"characteristics",
        default:[]
    }],
    created_at:{
        type: Date,
        default: () => Date.now()
    }
});

export default mongoose.model("petCategory",petCategorySchema);