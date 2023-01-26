import chatModel from "../../models/chatModel.js"
import mongoose from "mongoose"
import UserModel from "../../models/UserModel.js";
const getAllChatUsers = async(req,res) => {

    try {
        let userData = await chatModel.aggregate([

            {  $lookup:
                {
                  from: "users",
                  localField: "senderId",
                  foreignField: "_id",
                  as: "users"
                }
            },
            { $unwind : "$users" },
            { $group : { _id : "$users" } }
           
          ]).sort( { created_at: -1 } );
        delete userData.password
        delete userData.token
        return res.json({result:userData})
    } catch (error) {
        return res.json({message:"userData not found"})
    }
  
}




const getUserChat = async(req,res) => {
//console.log( req.query.senderId)
    try {        
        let chat = await chatModel.aggregate([
            {$match : { senderId : mongoose.Types.ObjectId(req.query.senderId) }},

          
            {  $lookup:
                {
                  from: "users",
                  localField: "receiverId",
                  foreignField: "_id",
                  as: "receiver"
                }
            },
            {$group : {_id:"$receiver"}},
            
                      // { $project: { "senderId": 1, "receiverId": 1, "sender.name":1,"receiver.name":1,'message':1} }
           
          ]).sort( { created_at: -1 } );
         // let chat = await chatModel.find({senderId:req.query.senderId});
        delete chat.password
        delete chat.token
        return res.json({result: chat})
    } catch (error) {
        return res.json({message:"Chat not found"})
    }
  
}

const getSingleUserChat = async(req,res) => {
    //console.log( req.query.senderId)
        try {
            let chat = await chatModel.aggregate([
                {
                    $match: {$or: [{'senderId':  mongoose.Types.ObjectId(req.query.senderId),'receiverId': mongoose.Types.ObjectId(req.query.recieverId)},
                    {'senderId': mongoose.Types.ObjectId(req.query.recieverId),'receiverId':  mongoose.Types.ObjectId(req.query.senderId)}]}
                   
                      
            },
    
        
                {  $lookup:
                    {
                      from: "users",
                      localField: "receiverId",
                      foreignField: "_id",
                      as: "receiver"
                    }
                },

                
                {  $lookup:
                    {
                      from: "users",
                      localField: "senderId",
                      foreignField: "_id",
                      as: "sender"
                    }
                },
                
               
                           { $project: {"createdDate":1, "senderId": 1, "receiverId": 1, "sender.name":1,"receiver.name":1,'message':1} }
               
              ]).sort( { created_at: -1 } );
          // let chat = await chatModel.find( { "senderId" : mongoose.Types.ObjectId(req.query.senderId),"receiverId":mongoose.Types.ObjectId(req.query.recieverId) });
            delete chat.password
            delete chat.token
            return res.json({result: chat})
        } catch (error) {
            return res.json({message:"Chat not found"})
        }
      
    }






export default{
  getAllChatUsers,
  getUserChat,
  getSingleUserChat

    

 

}