import mongoose from "mongoose"

import products from "../../models/productModel.js"
import productGallery from "../../models/productGallery.js";


const getAllProfiles = async(req,res) => {
  
    var query = {}
    if(req.query.shelter_id !== "0"){
     
       query.shelter_id = mongoose.Types.ObjectId(req.query.shelter_id)

    }

    if(req.query.category_id !== "0"){
     
      query.pet_category_id = mongoose.Types.ObjectId(req.query.category_id)

   }

   if(req.query.breed_id !== "0"){
     
    query.breed_id = mongoose.Types.ObjectId(req.query.breed_id)

 }

 console.log(query)

    try {
     
        let pets = await products.aggregate([
            {$match:query},
            {  $lookup:
                {
                  from: "breeds",
                  localField: "breed_id",
                  foreignField: "_id",
                  as: "breed"
                }
            },
            {  $lookup:
                {
                  from: "characteristics",
                  localField: "characteristics_id",
                  foreignField: "_id",
                  as: "character"
                }
            },
            {  $lookup:
                {
                  from: "shelters",
                  localField: "shelter_id",
                  foreignField: "_id",
                  as: "shelter"
                }
            },
            {  $lookup:
                {
                  from: "users",
                  localField: "volunteer_id",
                  foreignField: "_id",
                  as: "volunteer"
                }
            },
            {  $lookup:
                {
                  from: "petcategories",
                  localField: "pet_category_id",
                  foreignField: "_id",
                  as: "pet_category"
                }
            },
            { $project : {
                "name" : 1 ,
                "created_at" : 1 ,
                "volunteer.name" : 1 ,
                "shelter.name" : 1,
                "character.name":1,
                "breed.name":1,
                "pet_category.name":1,
                "status":1
            }},
            
            { $unwind : "$breed" },
            { $unwind : "$character" },
            { $unwind : "$shelter" },
            { $unwind : "$volunteer" },
            { $unwind : "$pet_category" }
           
           
          ]);
        delete pets.password
        delete pets.token
        return res.json({result:pets})
    } catch (error) {
        return res.json({result:"shelter not found"})
    }
  
}

const getProfile = async(req,res) => {
  
    try {
        let product = await products.aggregate([
            { $match: { _id:mongoose.Types.ObjectId(req.query.recordId)} },
            {  $lookup:
                {
                  from: "breeds",
                  localField: "breed_id",
                  foreignField: "_id",
                  as: "breed"
                }
            },
            {  $lookup:
                {
                  from: "characteristics",
                  localField: "characteristics_id",
                  foreignField: "_id",
                  as: "character"
                }
            },
            {  $lookup:
                {
                  from: "shelters",
                  localField: "shelter_id",
                  foreignField: "_id",
                  as: "shelter"
                }
            },
            {  $lookup:
                {
                  from: "users",
                  localField: "volunteer_id",
                  foreignField: "_id",
                  as: "volunteer"
                }
            },
            {  $lookup:
                {
                  from: "petcategories",
                  localField: "pet_category_id",
                  foreignField: "_id",
                  as: "pet_category"
                }
            },
            {  $lookup:
                {
                  from: "productgalleries",
                  localField: "_id",
                  foreignField: "product_id",
                  as: "gallery"
                }
            },
            { $project : {
                "name" : 1 ,
                "age":1,
                "color":1,
                "height":1,
                "weight":1,
                "description":1,
                "created_at" : 1 ,
                "volunteer.name" : 1 ,
                "shelter.name" : 1,
                "character.name":1,
                "breed.name":1,
                "pet_category.name":1,
                "gallery":1,
                "status":1
            }},
            { $unwind : "$breed" },
            { $unwind : "$character" },
            { $unwind : "$shelter" },
            { $unwind : "$volunteer" },
            { $unwind : "$pet_category" }
           
           
           
          ]);

        
    
        return res.json({result:product})
    } catch (error) {
        return res.json({result:"shelter not found"})
    }
  
}


const deletePet = async(req,res) => {


 
    try {
        let product = await products.updateOne({_id: mongoose.Types.ObjectId(req.body.recordId)},{$set:{status:2}})
        return res.json({result:product})
    } catch (error) {
        return res.json({result:false})
    }
  
}

export default{
  
    getAllProfiles,
    getProfile,
    deletePet
   


}