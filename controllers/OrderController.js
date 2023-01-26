
import Helper from "../helpers/Helper.js";
import mongoose from "mongoose"
import OrdersModel from "../models/orderModel.js"
import UserModel from "../models/UserModel.js";
import moment from 'moment';

const getProfile = async(req,res) => {

    
    try {
        let orders = await OrdersModel.aggregate([
            { $match: { _id:mongoose.Types.ObjectId(req.body.order_id)} },
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
                  from: "products",
                  localField: "product_id",
                  foreignField: "_id",
                  as: "products"
                }
             },
             {  $lookup:
                {
                  from: "productgalleries",
                  localField: "products._id",
                  foreignField: "product_id",
                  as: "productGallery"
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
                    from: "users",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "customer"
                }
            },
        // {
        //     $project :{
        //         "_id": 1,
        //         "shelter.name":1
        //     }
        // }
           
          ]);
          
        delete orders.password
        delete orders.token
    
        
        return res.json({result:orders})
    } catch (error) {
        return res.json({result:"order not found"})
    }
  

}


const getUserOrder = async(req,res) => {

    
    try {
        let shelter = await OrdersModel.aggregate([ 
            { $match: {user_id:mongoose.Types.ObjectId(req.body.user_id),status : "1"} },
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
                  from: "products",
                  localField: "product_id",
                  foreignField: "_id",
                  as: "products"
                }
             },
             {  $lookup:
                {
                  from: "productgalleries",
                  localField: "products._id",
                  foreignField: "product_id",
                  as: "productGallery"
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
                    from: "users",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "customer"
                }
            },
        // {
        //     $project :{
        //         "_id": 1,
        //         "shelter.name":1
        //     }
        // }
           
          ]);
          
        delete shelter.password
        delete shelter.token
    
        
        return res.json({result:shelter})
    } catch (error) {
        return res.json({result:"Shelter not found"})
    }
  

}
const getVolunteerOrder = async(req,res) => {

    
    try {
        let shelter = await OrdersModel.aggregate([ 
            { $match: {volunteer_id:mongoose.Types.ObjectId(req.body.volunteer_id),status : "1"} },
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
                  from: "products",
                  localField: "product_id",
                  foreignField: "_id",
                  as: "products"
                }
             },
             {  $lookup:
                {
                  from: "productgalleries",
                  localField: "products._id",
                  foreignField: "product_id",
                  as: "productGallery"
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
                    from: "users",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "customer"
                }
            },
        // {
        //     $project :{
        //         "_id": 1,
        //         "shelter.name":1
        //     }
        // }
           
          ]);
          
        delete shelter.password
        delete shelter.token
    
        
        return res.json({result:shelter})
    } catch (error) {
        return res.json({result:"Shelter not found"})
    }
  

}

const postProfile = async(req,res) => {
    


    if( !req.body.product_id || !req.body.volunteer_id || !req.body.shelter_id || !req.body.user_id || !req.body.order_date || !req.body.order_time){
        return res.json({result : "Fill all fields properly"})
    }

    // let check  = await OrdersModel.find({product_id: req.body.product_id ,  user_id: req.body.user_id}).count();
    // if(check){

    //     return res.json({result : {error:"Order already placed"}})
    // }
  

    const newRecord = {
        product_id  :  req.body.product_id,
        volunteer_id : req.body.volunteer_id,
        shelter_id  :  req.body.shelter_id,
        user_id     :  req.body.user_id,
        order_date  :  req.body.order_date,
        order_time  :  req.body.order_time,
        order_status:  "pending",
        created_at :  req.body.created_at
        
      
    }


    const newOrder = new OrdersModel(newRecord);

    let insertOrder = await newOrder.save()
    var orders = await OrdersModel.aggregate([
        { $match: { _id:mongoose.Types.ObjectId(insertOrder._id)} },
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
              from: "products",
              localField: "product_id",
              foreignField: "_id",
              as: "products"
            }
         },
         {  $lookup:
            {
              from: "productgalleries",
              localField: "products._id",
              foreignField: "product_id",
              as: "productGallery"
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
                from: "users",
                localField: "user_id",
                foreignField: "_id",
                as: "customer"
            }
        },

       
      ]);
     

      
     let senderName = await UserModel.findOne({_id:  req.body.user_id}).select('name').exec();
     let reciever = await UserModel.find({_id: req.body.volunteer_id}).select("name profile_image device_token _id").exec();
    
    Helper.sendNotification(reciever[0].device_token,req.body.user_id,req.body.volunteer_id,"Pawnder", `${senderName.name} wants to meet you `,{ activity:'meeting' , data: orders }, "meeting" ,req.body.created_at)
    
    return res.json({result: insertOrder})

}


const updateStatus = async(req,res) => {
    try
    {   
        let checkUser = await UserModel.findOne({_id:req.body.user_id});
        if(checkUser)
        {
            OrdersModel.updateOne({_id:req.body.order_id},{$set:{order_status : req.body.status}}).then((data)=>{
                res.json({result:data.matchedCount})
            }).catch(error=>{
                return res.status(400).json({result: error})
            });
        }
        
    }
    catch(error)
    {
        res.status(433).json({result:false,message:"Not an Authorized User for this meeting"});
    }
    
  
}

const DeleteOrder = async(req,res) => {

    if(req.query.archive === "" || req.query.archive === undefined){

        OrdersModel.updateOne({_id:req.query.order_id},{$set:{status : "2"}}).then((data)=>{
            res.json({result:data.matchedCount})
        }).catch(error=>{
            return res.status(400).json({result: error})
        });

    }else{

        OrdersModel.updateOne({_id:req.query.order_id},{$set:{status : "3"}}).then((data)=>{
            res.json({result:data.matchedCount})
        }).catch(error=>{
            return res.status(400).json({result: error})
        });
    }
  
  
}

const updatePayment = async(req,res) => {

 
    OrdersModel.updateOne({_id:req.body.order_id},{$set:{payment_id : req.body.payment_id}}).then((data)=>{
        res.json({result:data.matchedCount})
    }).catch(error=>{
        return res.status(400).json({result: error})
    });
  
}



const getMeetingNotification = async(req,res) =>
{
    
    try {
        let user_id = req.params.user_id;
        let status = req.query.status

        let shelter = await OrdersModel.aggregate([ 
            { $match:  status?{user_id:mongoose.Types.ObjectId(user_id),order_status:status}:{user_id:mongoose.Types.ObjectId(user_id)}},
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
                  from: "products",
                  localField: "product_id",
                  foreignField: "_id",
                  as: "products"
                }
             },
             {  $lookup:
                {
                  from: "productgalleries",
                  localField: "products._id",
                  foreignField: "product_id",
                  as: "productGallery"
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
                    from: "users",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "customer"
                }
            },
        // {
        //     $project :{
        //         "_id": 1,
        //         "shelter.name":1
        //     }
        // }
           
          ]);
          
        delete shelter.password
        delete shelter.token
    
        
        return res.json({result:shelter})
    } catch (error) {
        return res.json({result:"Shelter not found"})
    }
}


export default{
   
    postProfile,
    getProfile,
    updateStatus,
    getUserOrder,
    getVolunteerOrder,
    updatePayment,
    DeleteOrder,
    getMeetingNotification

}