import mongoose from "mongoose"

const shelterSchema = mongoose.Schema({
    volunteer_id : {type:mongoose.Types.ObjectId},
    name:{type:String},
    description:{type:String},
    profile_image:{type:String},
    phone:{type:String},
    zip_code:{type:String},
    city:{type:String},
    state:{type:String},
    country:{type:String},
    latitude:{type:String},
    longitude:{type:String},
    location:{
        type:{
            type:String,
            enum:['Point'],
            default:"Point"
        },
        coordinates:{
            type:[Number],
            required:true
        },
    },
    area_capacity :{type:String},
    status:{type:String,default:1},
    created_at : { type : Date, default: Date.now }
    
});

shelterSchema.index({location:"2dsphere"});

export default mongoose.model("shelter",shelterSchema);

