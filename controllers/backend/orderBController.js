
import Helper from "../../helpers/Helper.js";
import mongoose from "mongoose"
import OrdersModel from "../../models/orderModel.js"
import UserModel from "../../models/UserModel.js";
import ShelterModel from "../../models/shelterModel.js"
import ProductModel from "../../models/productModel.js"


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
            { $match: { _id:mongoose.Types.ObjectId(req.body.order_id),user_id:mongoose.Types.ObjectId(req.body.user_id)} },
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
                    from: "users",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "customer"
                }
            },
            {  $lookup:
                {
                  from: "products",
                  localField: "product_id",
                  foreignField: "_id",
                  as: "product"
                }
             },
            {
                $project :{
                    "order_status":     1,
                    "status":1,
                    "shelter.name":     1,
                    "customer.name":    1,
                    "product.name":     1,
                    "volunteer.name":   1,
                    

                }
            }
           
          ]);
          
        delete shelter.password
        delete shelter.token
    
        
        return res.json({result:shelter})
    } catch (error) {
        return res.json({result:"Shelter not found"})
    }
  

}
const getAllProfiles = async(req,res) => {
     //  console.log(req.query.dateFilter)

     
     if (req.query.dateFilter === '0')
     {
        var query = {order_status:req.query.order_status};
       
      
     }
     else
     {


         let start = new Date(req.query.dateFilter).setHours(0, 0, 0, 0),
         end = new Date(req.query.dateFilter).setHours(23, 59, 59, 999);
         var query = {order_status:req.query.order_status,order_date:{$gte: start, $lte:end }};
    
        
     }

         let order = await  OrdersModel.find(query).lean();
     
     
          order =  await Promise.all(order.map(async(result1)=>{

            result1.product_id = await ProductModel.findById(result1.product_id,{name:1}).exec();
            result1.volunteer_id = await UserModel.findById(result1.volunteer_id,{name:1}).exec();
            result1.shelter_id = await ShelterModel.findById(result1.shelter_id,{name:1}).exec();
            result1.user_id = await UserModel.findById(result1.user_id,{name:1}).exec();
            return result1

         }));



         return res.json({result:order})

   
  
  
}
const postProfile = async(req,res) => {

 
    const newRecord = {
        product_id  :  req.body.product_id,
        vounteer_id :  req.body.vounteer_id,
        shelter_id  :  req.body.shelter_id,
        user_id     :  req.body.user_id,
        order_date  :  req.body.order_date,
        order_time  :  req.body.order_time,
        order_status: "pending"
      
    }

    //return res.json(newRecord);
    const newOrder = new OrdersModel(newRecord);
    newOrder.save().then((data)=>{
        res.json({result: data})

    }).catch(error=>{
        return res.status(400).json({result: error})
    });

}


const updateStatus = async(req,res) => {

 
    OrdersModel.updateOne({_id:req.body.order_id},{$set:{order_status : req.body.status}}).then((data)=>{
        res.json({result: "done"})
    }).catch(error=>{
        return res.status(400).json({result: error})
    });
  
}



const changeStatus = async(req,res) => {

 
    OrdersModel.updateOne({_id:req.body._id},{$set:{order_status : req.body.order_status}}).then((data)=>{
        res.json({result: "done"})
    }).catch(error=>{
        return res.status(400).json({result: error})
    });
  
}



export default{
   
    postProfile,
    getProfile,
    updateStatus,
    getUserOrder,
    getAllProfiles,
    changeStatus

}