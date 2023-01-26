import productModel from "../models/productModel.js";
import orderModel from "../models/orderModel.js";
import favourtiesModel from "../models/favouritesModel.js"
import petCategory from "../models/petCategoryModel.js"
import characteristicsModel from "../models/characteristicsModel.js";
import BreedModel from "../models/breedsModel.js"
import mongoose from "mongoose"
import Helper from "../helpers/Helper.js";


const getTopBreeds = async(req,res) => {


  let arr = [];
  let counts = [] ;
  let resultProd = []
  var data1 =[]
 
 
  let products = await orderModel.aggregate([
      {  $lookup:
          {
            from: "products",
            localField: "product_id",
            foreignField: "_id",
            as: "breeds"
          }
       },
       {
          $project: {
              "breeds.breed_id": 1,
              "product_id": 1,
          }
       }
      
     
    ]);
 
    products.forEach(dd => {
      dd.breeds.forEach(dd2 => { arr.push({'breed_id':dd2.breed_id,"product_id":dd.product_id})});
  });


  //sum of total sold out breeds
  arr.forEach(function (x) {counts[x.breed_id] = (counts[x.breed_id] || 0) + 1;});

  // getting breeds data
  for (let [key, value] of Object.entries(counts)) {
  
     // let topBreeds =  await productModel.findOne({ breed_id:key }).exec();

      
        let topBreeds = await productModel.aggregate([
          { $match: { breed_id:mongoose.Types.ObjectId(key)} },


          {  $lookup:
            {
              from: "productgalleries",
              localField: "_id",
              foreignField: "product_id",
              as: "productGallery"
            }
            
        },

        {  $lookup:
          {
            from: "characteristics",
            localField: "characteristics_id",
            foreignField: "_id",
            as: "characteristics"
          }
      },
      {  $lookup:
          {
            from: "shelters",
            localField: "shelter_id",
            foreignField: "_id",
            as: "shelters"
          }
      },
      {  $lookup:
          {
            from: "petcategories",
            localField: "pet_category_id",
            foreignField: "_id",
            as: "petcategories"
          }
      },
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
          from: "users",
          localField: "volunteer_id",
          foreignField: "_id",
          as: "volunteer"
        }
    },

      ]);

      resultProd.push(topBreeds)
    }


 let cats = await productModel.aggregate([
       { $match: { pet_category_id:mongoose.Types.ObjectId("61adf3ee19e895db54b71e67")} },


       {  $lookup:
        {
          from: "productgalleries",
          localField: "_id",
          foreignField: "product_id",
          as: "productGallery"
        }
     },

  ]);

    
    let dogs = await productModel.aggregate([

    { $match: { pet_category_id:mongoose.Types.ObjectId("61adf3ee19e895db54b71e67")} },

    {  $lookup:
    {
      from: "productgalleries",
      localField: "_id",
      foreignField: "product_id",
      as: "productGallery"
    }
  },

]);


  if(resultProd.length > "0"){
        
    var data1 =  await Promise.all(resultProd[0].map(async(result1)=>{

      result1.favourite = await favourtiesModel.count({product_id:result1._id,user_id:req.body.user_id}).exec()
      return result1

    }));
  }

  if(cats.length > "0"){

    var data2 =  await Promise.all(cats.map(async(result2)=>{

      result2.favourite = await favourtiesModel.count({product_id:result2._id,user_id:req.body.user_id}).exec()
      return result2

    }));


  }
  if(dogs.length > "0"){
    var data3 =  await Promise.all(dogs.map(async(result3)=>{

      result3.favourite = await favourtiesModel.count({product_id:result3._id,user_id:req.body.user_id}).exec()
      return result3

    }));


  }


    return res.json({result:{"topBreeds":data1,"cats":data2,"dogs":data3}})

 try{
 
   
    } catch(err){

        return res.json({result:"Breeds not found"})

    }
  

}


const getPetColors = async(req,res) => {

  try {
     
      let colors = await productModel.find({},{color:1}).distinct("color");

      return res.json({result:colors})
  } catch (error) {
      return res.json({result:"colors not found"})
  }

}



const getCharacteristicsList = async(req,res) => {
  let {q} = req.query

  try {

      let char_ids = req.query.q ? await productModel.find({name : Helper.regexSearch(q)}).select("characteristics_id").distinct("characteristics_id") :  await productModel.find().select("characteristics_id").distinct("characteristics_id")

      let char = await characteristicsModel.find( { _id: { $in:char_ids } });

      return res.json({result:char})
  } catch (error) {
      return res.json({result:"char not found"})
  }

}


const getBreedList = async(req,res) => {

  let breeds = ''
  try {

  if(req.query.name)
  {
      breeds = await BreedModel.findOne({ name: Helper.regexSearch(req.query.name) }).lean();
  }
  else
  {
      let breed_ids = await productModel.find(req.query.pet_category_id?{pet_category_id:mongoose.Types.ObjectId(req.query.pet_category_id)}:{}).distinct("breed_id")
      breeds = await BreedModel.find( { _id: { $in:breed_ids } })
  }
  return res.json({result:breeds})
    
  } catch (error) {
      return res.json({result:"breeds not found"})
  }

}

const getPetCategoryList = async(req,res) => {

  try {
     
      let result = {}
      let pet = await petCategory.aggregate([
        {
          $match : { status: 1  }
        },
        
        {  $lookup:
          {
            from: "breeds",
            localField: "breed",
            foreignField: "_id",
            as: "breedDetails"
          }
        }

    
      ])

      let characteristics = await characteristicsModel.find({}).lean()
      
      return res.json({result:pet,characteristics})
  } catch (error) {
      return res.json({result:error.message})
  }

}




export default{
    getTopBreeds,
    getPetColors,
    getPetCategoryList,
    getBreedList,
    getCharacteristicsList
 
}