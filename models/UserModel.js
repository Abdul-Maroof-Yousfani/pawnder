import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
    token: {type: String},
    terms_condition: {type: String, default: false},
    device_token:{type: String, default : null},
    provider_id: {type: String},
    user_type:{ type:String},
    occupation: {type: String},
    name:{ type: String,required: true},
    phone:{ type: String},
    email: {type: String,unique: true,required: true},
    password: {type: String,required: true},
    profile_image: { type: String},
    identity_type: { type: String},
    identity_img_path:{
      type: Array,
      default: []
    },
    provider_name: {type: String},
    about:{type: String},
    profile_picture:{type: String},
    dateofbirth: {type: Date},
    age: {type: Number},
    zipcode:{type: String},
    location_name:{type: String},
    latitude:{ type: String},
    longitude:{type: String},
    city:{type: String},
    state:{ype: String},
    country:{type: String},
    status:{type:String,  default: 1},
    occupation: {type: String},
    interest: {type: String},
    onlineStatus: {
        type: String,
        default: "OFFLINE"
      },
      chatFriends: {
        type: Array,
        default: []
      },
    pet_preferences: {
      type: Array,
      default: []
    },
    organizationCode : {
      type:String,
      default  : ""
    },
    verified:{
      type:String,
      default:"false"
    },
    otpVerification:{
      type:Number,
      default : 0
    },
    otpCount : {
      type:Number,
      default : 3
    },
    created_at:{
        type: Date,
        default: () => Date.now()
    }
});
export default mongoose.model('User',usersSchema);