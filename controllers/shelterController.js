
import Helper from "../helpers/Helper.js";
import mongoose from "mongoose"

import fileUpload  from "express-fileupload";
import path from "path"
import ShelterModel from "../models/shelterModel.js"
import shelterGalleryModel from "../models/shelterGalleryModel.js";
import ShelterRating from "../models/shelterRating.js"
import favourtiesModel from "../models/favouriteShelter.js"
import UserModel from "../models/UserModel.js";
import { type } from "os";





const getProfile = async(req,res) => {

    
    
    try {

        let shelter = await ShelterModel.aggregate([
            { $match: { _id:mongoose.Types.ObjectId(req.body.shelter_id)} },
            {  $lookup:
                {
                  from: "sheltergalleries",
                  localField: "_id",
                  foreignField: "shelter_id",
                  as: "shelterGallery"
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

       
          if(shelter.length !== 0){


           
            let satisfied_clients = await ShelterRating.find({rating:{$gt:3},shelter_id:mongoose.Types.ObjectId(req.body.shelter_id)}).count()
            shelter[0].satisfied_clients =  satisfied_clients

            let rating = await ShelterRating.find({shelter_id:mongoose.Types.ObjectId(req.body.shelter_id)}).select("rating")

            let rating_1 =0;
            let rating_2 =0;
            let rating_3 =0;
            let rating_4 =0;
            let rating_5 =0;
  
            rating.forEach((value, key) => {
         
              switch(value.rating) {
                  
                  case 1:
                       rating_1+=value.rating
                  break;
  
                  case 2:
                      rating_2+=value.rating
                  break;
  
                  case 3:
                      rating_3+=value.rating
                  break;
  
                  case 4:
                      rating_4+=value.rating
                  break;
  
                  case 5:
                      rating_5+=value.rating
                  break;
  
  
                  default:
                     
                }
                
              
            });
            let av_rating =  ((5*rating_5 + 4*rating_4 + 3*rating_3 + 2*rating_2 + 1*rating_1) / (rating_1+rating_2+rating_3+rating_4+rating_5))

            let result =  ((av_rating).toFixed(2));
            if(isNaN(result)){
                shelter[0].rating="0.00"
            }
            else{
                shelter[0].rating=result
            }
          
          


            
          }
      
      
     
        return res.json({result:shelter})
       
    } catch (error) {
        return res.json({result:"Shelter not found"})
    }
  
}


const getAllProfile = async(req,res) => {

    try {
        let shelter = await ShelterModel.aggregate([
        
            {  $lookup:
                {
                  from: "sheltergalleries",
                  localField: "_id",
                  foreignField: "shelter_id",
                  as: "shelterGallery"
                } },

                {  $lookup:
                    {
                      from: "users",
                      localField: "volunteer_id",
                      foreignField: "_id",
                      as: "volunteer"
                    }
                 },
 

          ]);
          
      
        var data =  await Promise.all(shelter.map(async(result1,key)=>{
        
            let satisfied_clients = await ShelterRating.find({rating:{$gt:3},shelter_id:mongoose.Types.ObjectId(result1._id)}).count()
            shelter[key].satisfied_clients =  satisfied_clients
           
            let rating = await ShelterRating.find({shelter_id:mongoose.Types.ObjectId(result1._id)}).select("rating")

            let rating_1 =0;
            let rating_2 =0;
            let rating_3 =0;
            let rating_4 =0;
            let rating_5 =0;
  
            rating.forEach((value, key) => {
         
              switch(value.rating) {
                  
                  case 1:
                       rating_1+=value.rating
                  break;
  
                  case 2:
                      rating_2+=value.rating
                  break;
  
                  case 3:
                      rating_3+=value.rating
                  break;
  
                  case 4:
                      rating_4+=value.rating
                  break;
  
                  case 5:
                      rating_5+=value.rating
                  break;
  
  
                  default:
                     
                }
                
              
            });
            let av_rating =  ((5*rating_5 + 4*rating_4 + 3*rating_3 + 2*rating_2 + 1*rating_1) / (rating_1+rating_2+rating_3+rating_4+rating_5))
            let result =  ((av_rating).toFixed(2));

             
            if(isNaN(result)){
                result1.rating ="0.00"
            }
            else{
                result1.rating =result
            }
         
            return result1

        }));
        
        return res.json({result:data})
    } catch (error) {
        return res.json({result:"Shelter not found"})
    }
  
}

const getShelterByVolunteer = async(req,res) => {

    try {
        let shelter = await ShelterModel.aggregate([

            { $match: { volunteer_id:mongoose.Types.ObjectId(req.body.volunteer_id)} },
        
            {  $lookup:
                {
                  from: "sheltergalleries",
                  localField: "_id",
                  foreignField: "shelter_id",
                  as: "shelterGallery"
                } },

                {  $lookup:
                    {
                      from: "users",
                      localField: "volunteer_id",
                      foreignField: "_id",
                      as: "volunteer"
                    }
                 },
 

          ]);
          
      
        var data =  await Promise.all(shelter.map(async(result1,key)=>{
        
            let satisfied_clients = await ShelterRating.find({rating:{$gt:3},shelter_id:mongoose.Types.ObjectId(result1._id)}).count()
            shelter[key].satisfied_clients =  satisfied_clients
           
            let rating = await ShelterRating.find({shelter_id:mongoose.Types.ObjectId(result1._id)}).select("rating")

            let rating_1 =0;
            let rating_2 =0;
            let rating_3 =0;
            let rating_4 =0;
            let rating_5 =0;
  
            rating.forEach((value, key) => {
         
              switch(value.rating) {
                  
                  case 1:
                       rating_1+=value.rating
                  break;
  
                  case 2:
                      rating_2+=value.rating
                  break;
  
                  case 3:
                      rating_3+=value.rating
                  break;
  
                  case 4:
                      rating_4+=value.rating
                  break;
  
                  case 5:
                      rating_5+=value.rating
                  break;
  
  
                  default:
                     
                }
                
              
            });
            let av_rating =  ((5*rating_5 + 4*rating_4 + 3*rating_3 + 2*rating_2 + 1*rating_1) / (rating_1+rating_2+rating_3+rating_4+rating_5))
            let result =  ((av_rating).toFixed(2));

             
            if(isNaN(result)){
                result1.rating ="0.00"
            }
            else{
                result1.rating =result
            }
         
            return result1

        }));
        
        return res.json({result:data})
    } catch (error) {
        return res.json({result:"Shelter not found"})
    }
  
}



const getMassiveShelters = async(req,res) => {

    try {
        let shelter = await ShelterModel.aggregate([
        
            {  $lookup:
                {
                  from: "sheltergalleries",
                  localField: "_id",
                  foreignField: "shelter_id",
                  as: "shelterGallery"
                }
             },

             
            {  $lookup:
                {
                  from: "products",
                  localField: "_id",
                  foreignField: "shelter_id",
                  as: "products"
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

             {
                $project: {
                
                   shelterProducts: { $cond: { if: { $isArray: "$products" }, then: { $size: "$products" }, else: "0"} },
                   name :1,
                   shelterGallery:1,
                   volunteer:1

                }
             },
             { $sort : { shelterProducts : -1 } }
 
              

          ]);

          var data =  await Promise.all(shelter.map(async(result1,key)=>{
         
            let satisfied_clients = await ShelterRating.find({rating:{$gt:3},shelter_id:mongoose.Types.ObjectId(result1._id)}).count()
            shelter[key].satisfied_clients =  satisfied_clients
       
            let rating = await ShelterRating.find({shelter_id:mongoose.Types.ObjectId(result1._id)}).select("rating")

            let rating_1 =0;
            let rating_2 =0;
            let rating_3 =0;
            let rating_4 =0;
            let rating_5 =0;
  
            rating.forEach((value, key) => {
         
              switch(value.rating) {
                  
                  case 1:
                       rating_1+=value.rating
                  break;
  
                  case 2:
                      rating_2+=value.rating
                  break;
  
                  case 3:
                      rating_3+=value.rating
                  break;
  
                  case 4:
                      rating_4+=value.rating
                  break;
  
                  case 5:
                      rating_5+=value.rating
                  break;
  
  
                  default:
                     
                }
                
              
            });
            let av_rating =  ((5*rating_5 + 4*rating_4 + 3*rating_3 + 2*rating_2 + 1*rating_1) / (rating_1+rating_2+rating_3+rating_4+rating_5))
            let result =  ((av_rating).toFixed(2));
            if(isNaN(result)){
                result1.rating ="0.00"
            }
            else{
                result1.rating =result
            }
         
            return result1

        }));
          
        delete shelter.password
        delete shelter.token
    
        
        return res.json({result:data})
    } catch (error) {
        return res.json({result:"Shelter not found"})
    }
  
}


const postProfile = async(req,res) => {

    
    try
    {
        let check = await ShelterModel.find( { $or: [{name: req.body.name}, {latitude: req.body.latitude,longitude:req.body.longitude} ] }).count();

    let location = {
        type: "Point",
        coordinates : [req.body.longitude,req.body.latitude]
    }


  
    var gallery = [];
    let file = req.files
    if(file != null && file.shelter_gallery != undefined && file.shelter_gallery != null){

     //multi upload
    if((file.shelter_gallery).length > 1){
        
  
     let fileArr =  file.shelter_gallery;
     fileArr.forEach(file => {
         let fileName = `public/uploads/shelterGallery/${Date.now()}-${file.name.replace(/ /g, '-').toLowerCase()}`;
         file.mv(fileName,(error)=>{
             if (error) { return res.status(400).json({status: "400", result: error.message})}
         });
         fileName = fileName.replace("public", "");
         gallery.push(fileName)
     });
   

    }else{


   //single upload
     let file2 = req.files
     file2 = file2.shelter_gallery
     let fileName = `public/uploads/shelterGallery/${Date.now()}-${file2.name.replace(/ /g, '-').toLowerCase()}`;
         file2.mv(fileName,(error)=>{
             if (error) { return res.status(400).json({result: error.message})}
         })
         fileName = fileName.replace("public", "");
         gallery.push(fileName)

    }
}




   //  return res.json(req.body.gallery);
    if(file != null && file.profile_image != undefined && file.profile_image != null)
    {
        file = file.profile_image
        var profile_image_path = `public/uploads/shelterGallery/${Date.now()}-${file.name.replace(/ /g, '-').toLowerCase()}`;
            file.mv(profile_image_path,(error)=>{
                if (error) { return res.status(400).json({result: error.message})}
            })
            profile_image_path = profile_image_path.replace("public", "");
            req.body.profile_image = profile_image_path
    }

    const newRecord = {
        name : req.body.name,
        description : req.body.description,
        profile_image : profile_image_path,
        phone : req.body.phone,
        volunteer_id : req.body.volunteer_id,
        zip_code : req.body.zip_code,
        city : req.body.city,
        state : req.body.state,
        country : req.body.country,
        latitude : req.body.latitude,
        longitude : req.body.longitude,
        area_capacity : req.body.area_capacity,
        location
    
    }


   
    const newShelter = new ShelterModel(newRecord);
    newShelter.save().then((data)=>{
        res.json({result: data})

        gallery.forEach(galleryData => {
            const newShelterGallery = new shelterGalleryModel({path:galleryData,shelter_id:data.id});
            newShelterGallery.save()
        });

    }).catch(error=>{
        return res.status(400).json({result: error})
    });
    }

    catch(error)
    {
        console.log(error);
        res.json({result:error.message})
    }

    


}



const updateProfile = async(req,res) => {
  

    let newRecord= {};
    let file = req.files;
  
    var gallery = [];

    if(file != null && file.shelter_gallery != undefined && file.shelter_gallery != null){

     //multi upload
    if((file.shelter_gallery).length > 1){
        
  
     let fileArr =  file.shelter_gallery;
     fileArr.forEach(file => {
         let fileName = `public/uploads/shelterGallery/${Date.now()}-${file.name.replace(/ /g, '-').toLowerCase()}`;
         file.mv(fileName,(error)=>{
             if (error) { return res.status(400).json({status: "400", result: error.message})}
         });
         fileName = fileName.replace("public", "");
         gallery.push(fileName)
     });
   

    }else{


   //single upload
     let file2 = req.files
     file2 = file2.shelter_gallery
     let fileName = `public/uploads/shelterGallery/${Date.now()}-${file2.name.replace(/ /g, '-').toLowerCase()}`;
         file2.mv(fileName,(error)=>{
             if (error) { return res.status(400).json({result: error.message})}
         })
         fileName = fileName.replace("public", "");
         gallery.push(fileName)

    }
}


   //  return res.json(req.body.gallery);
    if(file != null && file.profile_image != undefined && file.profile_image != null)
    {
        file = file.profile_image
        if (file.mimetype.split("/")[0] == "image") {
            var profile_image_path = `public/uploads/shelterGallery/${Date.now()}-${file.name.replace(/ /g, '-').toLowerCase()}`;
            file.mv(profile_image_path,(error)=>{
                if (error) { return res.status(400).json({result: error.message})}
            })
            profile_image_path = profile_image_path.replace("public", "");
          //  req.body.profile_image = profile_image_path
            newRecord.profile_image = profile_image_path

        }else {
            return res.status(400).json({result: "File type must b image.."})
        }
    }

   
   
  
     newRecord = {
        name : req.body.name,
        description : req.body.description,
        phone : req.body.phone,
        volunteer_id : req.body.volunteer_id,
        zip_code : req.body.zip_code,
        city : req.body.city,
        state : req.body.state,
        country : req.body.country,
        latitude : req.body.latitude,
        longitude : req.body.longitude,
        area_capacity : req.body.area_capacity

    
    }
   
    ShelterModel.updateOne({_id:req.body.shelter_id},{$set:newRecord},async(error,response)=>{
        
        if (error) {return res.status(400).json({message:error.message})}

        if(gallery.length !== 0 ){

            gallery.forEach(galleryData => {
                const newShelterGallery = new shelterGalleryModel({path:galleryData,shelter_id:req.body.shelter_id});
                newShelterGallery.save()
            });

        }

        let shelter = await ShelterModel.aggregate([
            { $match: { _id:mongoose.Types.ObjectId(req.body.shelter_id)} },
            {  $lookup:
                {
                  from: "sheltergalleries",
                  localField: "_id",
                  foreignField: "shelter_id",
                  as: "shelterGallery"
                }
             },

           
          ]);

        res.json({result:shelter});
     

    })
 
}


const getShelter = async(req,res) => {
    if(req.query.q === "" || req.query.q === undefined){
       var condition ={}
    }else{

        var condition = {  name: { $regex: Helper.regexSearch(req.query.q) } }
     
    }

    
    let shelter = await ShelterModel.aggregate([
          
        { $match:  condition},
    
        {  $lookup:
            {
              from: "sheltergalleries",
              localField: "_id",
              foreignField: "shelter_id",
              as: "shelterGallery"
            } },

            {  $lookup:
                {
                  from: "users",
                  localField: "volunteer_id",
                  foreignField: "_id",
                  as: "volunteer"
                }
             },


      ]);
      
  
    var data =  await Promise.all(shelter.map(async(result1,key)=>{
    
        let satisfied_clients = await ShelterRating.find({rating:{$gt:3},shelter_id:mongoose.Types.ObjectId(result1._id)}).count()
        shelter[key].satisfied_clients =  satisfied_clients
       
        let rating = await ShelterRating.find({shelter_id:mongoose.Types.ObjectId(result1._id)}).select("rating")

        let rating_1 =0;
        let rating_2 =0;
        let rating_3 =0;
        let rating_4 =0;
        let rating_5 =0;

        rating.forEach((value, key) => {
     
          switch(value.rating) {
              
              case 1:
                   rating_1+=value.rating
              break;

              case 2:
                  rating_2+=value.rating
              break;

              case 3:
                  rating_3+=value.rating
              break;

              case 4:
                  rating_4+=value.rating
              break;

              case 5:
                  rating_5+=value.rating
              break;


              default:
                 
            }
            
          
        });
        let av_rating =  ((5*rating_5 + 4*rating_4 + 3*rating_3 + 2*rating_2 + 1*rating_1) / (rating_1+rating_2+rating_3+rating_4+rating_5))
        let result =  ((av_rating).toFixed(2));

         
        if(isNaN(result)){
            result1.rating ="0.00"
        }
        else{
            result1.rating =result
        }
     
        return result1

    }));

    return res.json({result:data})
}



const nearByShelters = async(req,res) => {

    try {
        // let shelter = await ShelterModel.find();
        // let nearByShelters = Helper.nearByCordinates(req.body.latitude,req.body.longitude,req.body.range_in_meter,shelter);
        let nearByShelters = await Helper.nearByLocation(req.body.latitude,req.body.longitude,req.body.range_in_meter)

        let nearBy = await ShelterModel.aggregate([
            { "$match": { 
                "_id": { "$in": nearByShelters },
            
            } }, 
            {  $lookup:
                {
                from: "sheltergalleries",
                localField: "_id",
                foreignField: "shelter_id",
                as: "sheltergallery"
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


        return res.json({result:nearBy})
     
    } catch (error) {
 
        return res.status(433).json({result:error.message})
    }


}


const addShelterRating = async(req,res) => {


    const newRecord = {
        shelter_id  :  req.body.shelter_id,
        rating :  req.body.rating,
    }

    //return res.json(newRecord);
    const newRating = new ShelterRating(newRecord);
    newRating.save().then((data)=>{
        res.json({result: data})

    }).catch(error=>{
        return res.status(400).json({result: error})
    });

}
const postFavourites = async(req,res) => {
  
    let favourites = "";
    let txt = "";


    let shelterInformation  = await ShelterModel.findOne({_id : mongoose.Types.ObjectId(req.body.shelter_id)}).lean()

   
    if(req.body.post_type === "add"){
  


          let favouriteExist = await favourtiesModel.findOne({ shelter_id: req.body.shelter_id,user_id:req.body.user_id }).exec();
        
          if (favouriteExist === null) {
              let favtAdd = await favourtiesModel.create({ shelter_id: req.body.shelter_id,user_id:req.body.user_id })
              favourites = favtAdd 
              txt +="Adds in his favourates";
          }else{
              favourites = favouriteExist
              
              txt += "Already in Favourates";
          }
             
          
      }
      else{
  
                favourites = await favourtiesModel.deleteOne({ product_id: req.body.product_id,user_id:req.body.user_id })
                txt += 'removes from his favourates'
      }
      //  Send Notifications

     let senderName = await UserModel.findOne({_id:  req.body.user_id}).select('name').exec();
     let shelter = await ShelterModel.findOne({_id:  req.body.shelter_id}).select('volunteer_id').lean();
     let reciever = await UserModel.findOne({_id:  shelter.volunteer_id}).select('name device_token').lean();


     let resultData = Helper.sendNotification(reciever.device_token,req.body.user_id,req.body.volunteer_id,"Pawnder", `${senderName.name} ${txt} `,{ activity:'Notification' , data: shelterInformation }, 'Favourite' , req.body.created_at)
     return res.send({
        message:txt,
        result: favourites
      })
  }


  const getFavouriteShelters = async(req,res) => {
  
    try {
      
   
      let shelter_query = await favourtiesModel.find({user_id:req.body.user_id})
     
      let shelterArr =[];
      shelter_query.forEach((value, key) => {
        shelterArr.push(value.shelter_id)
      });

     
    
      let shelter = await ShelterModel.aggregate([
          { "$match": { 
              "_id": { "$in": shelterArr },
             
          } }, 
          {  $lookup:
              {
                from: "sheltergalleries",
                localField: "_id",
                foreignField: "shelter_id",
                as: "sheltergalleries"
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

        var data =  await Promise.all(shelter.map(async(result1)=>{
           
            let rating = await ShelterRating.find({shelter_id:mongoose.Types.ObjectId(result1._id)}).select("rating")

            let rating_1 =0;
            let rating_2 =0;
            let rating_3 =0;
            let rating_4 =0;
            let rating_5 =0;
  
            rating.forEach((value, key) => {
         
              switch(value.rating) {
                  
                  case 1:
                       rating_1+=value.rating
                  break;
  
                  case 2:
                      rating_2+=value.rating
                  break;
  
                  case 3:
                      rating_3+=value.rating
                  break;
  
                  case 4:
                      rating_4+=value.rating
                  break;
  
                  case 5:
                      rating_5+=value.rating
                  break;
  
  
                  default:
                     
                }
                
              
            });
            let av_rating =  ((5*rating_5 + 4*rating_4 + 3*rating_3 + 2*rating_2 + 1*rating_1) / (rating_1+rating_2+rating_3+rating_4+rating_5))
            let result =  parseFloat((av_rating).toFixed(2));
            result1.rating =result
            return result1

        }));
        
      return res.json({result:data})

  } catch (error) {
      return res.json({result:"shelter not found"})
  }
}


export default{
    getProfile,
    postProfile,
    getShelter,
    getAllProfile,
    updateProfile,
    nearByShelters,
    addShelterRating,
    postFavourites,
    getMassiveShelters,
    getFavouriteShelters,
    getShelterByVolunteer
    

}