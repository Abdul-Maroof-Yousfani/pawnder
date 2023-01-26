import mongoose from "mongoose"

import shelterModel from "../../models/shelterModel.js"
import shelterGalleryModel from "../../models/shelterGalleryModel.js";
import UserModel from "../../models/UserModel.js"

const getAllProfiles = async(req,res) => {

    try {
       // let shelter = await shelterModel.find().sort( { created_at: -1 } );


        let shelter = await shelterModel.aggregate([
            {  $lookup:
                {
                  from: "users",
                  localField: "volunteer_id",
                  foreignField: "_id",
                  as: "volunteer"
                }
            }
           
           
          ]);
        delete shelter.password
        delete shelter.token
        return res.json({result:shelter})
    } catch (error) {
        return res.json({result:"shelter not found"})
    }
  
}

const getAllShelterProduct = async(req,res) => {

    try {

        let shelter = await shelterModel.find({},{_id:1,name:1}).sort( { created_at: -1 } )
        
        delete shelter.password
        delete shelter.token
        return res.json({result:shelter})
    } catch (error) {
        return res.json({result:"shelter not found"})
    }
  
}

const getProfile = async(req,res) => {
    
    try {
        let shelter = await shelterModel.aggregate([
            { $match: { _id:mongoose.Types.ObjectId(req.query.recordId)} },
            {  $lookup:
                {
                  from: "sheltergalleries",
                  localField: "_id",
                  foreignField: "shelter_id",
                  as: "gallery"
                }
            }
           
           
           
          ]);

        // let shelter = await shelterModel.find({ _id:mongoose.Types.ObjectId(req.query.recordId)});
         let volunteer = await UserModel.find({ _id:mongoose.Types.ObjectId(shelter[0].volunteer_id)}).select("name");
    
        return res.json({result:shelter,volunteer_name:volunteer[0].name})
    } catch (error) {
        return res.json({result:"shelter not found"})
    }
  
}


const deleteShelter = async(req,res) => {


   console.log(req.body.recordId)
    try {
        let shelter = await shelterModel.updateOne({_id: mongoose.Types.ObjectId(req.body.recordId)},{$set:{status:2}})
        return res.json({result:shelter})
    } catch (error) {
        return res.json({result:false})
    }
  
}

export default{
  
    getAllProfiles,
    getProfile,
    deleteShelter,
    getAllShelterProduct
   


}