
import Helper from "../helpers/Helper.js";
import UserModel from "../models/UserModel.js"
import NotificationsModel from "../models/notificationsModel.js";
import mongoose from "mongoose"

import bcrypt from 'bcrypt'
const getProfile = async(req,res) => {

    try {
        let user = await UserModel.findOne({_id:req.body.user_id}).lean();
        delete user.password
        delete user.token
        return res.json({result:user})
    } catch (error) {
        return res.json({message:"user not found"})
    }
  
}
const updateProfile = async(req,res) => {


     let updateRecord = {}
     let file = req.files
    
  
    
     if(file != null && file.indentity != undefined && file.indentity != null){

        //multi upload
       if((file.indentity).length > 1){
           
        var identities = [];
        let fileArr =  file.indentity;
        fileArr.forEach(file => {
            let fileName = `public/uploads/profileIdentity/${Date.now()}-${file.name.replace(/ /g, '-').toLowerCase()}`;
            file.mv(fileName,(error)=>{
                if (error) { return res.status(400).json({status: "400", result: error.message})}
            });
            fileName = fileName.replace("public", "");
            identities.push(fileName)
        });
        updateRecord.identity_img_path = identities
        updateRecord.identity_type = req.body.indentity_type

       }else{


      //single upload
        let file2 = req.files
        file2 = file2.indentity
       
        let fileName = `public/uploads/profileIdentity/${Date.now()}-${file2.name.replace(/ /g, '-').toLowerCase()}`;
        file2.mv(fileName,(error)=>{
            if (error) { return res.status(400).json({result: error.message})}
        })
        fileName = fileName.replace("public", "");
        updateRecord.identity_img_path = fileName

       }
       
       
       

}





   //profile image
   let file3 = req.files
    if(file3 != null && file3.profile_image != undefined && file3.profile_image != null)
    {
        console.log(2)
        file3 = file3.profile_image
       
        if (true) {
            var profile_image_path = `public/uploads/profilePictures/${Date.now()}-${file3.name.replace(/ /g, '-').toLowerCase()}`;
            file3.mv(profile_image_path,(error)=>{
                if (error) { return res.status(400).json({result: error.message})}
            })
            profile_image_path = profile_image_path.replace("public", "");
           // req.body.profile_image = profile_image_path
            console.log(profile_image_path)
            updateRecord.profile_image = profile_image_path
        }else {
            return res.status(400).json({result: "File type must b image.."})
        }

       
    }

    updateRecord.name = req.body.name,
    updateRecord.location_name = req.body.location_name,
    updateRecord.phone = req.body.phone,
    updateRecord.latitude = req.body.latitude,
    updateRecord.longitude = req.body.longitude,
    updateRecord.dateofbirth = req.body.dateofbirth,
    updateRecord.zipcode = req.body.zipcode,
    updateRecord.about = req.body.about,
    updateRecord.interest = req.body.interest,
    updateRecord.occupation = req.body.occupation,




   
    UserModel.updateOne({_id:req.body.user_id},{$set:updateRecord},async(error,response)=>{
        if (error) {return res.status(400).json({result:false})}
        res.json({result:await UserModel.findById(req.body.user_id).exec()});
    })
  
    // UserModel.updateOne({_id:req.body.user_id},{$set:updateRecord}).then((data)=>{
     
    //     res.json({result:await UserModel.findById(req.body.user_id).exec()});
    // }).catch(error=>{
    //     return res.status(400).json({result: false})
    // });
  
}


const updatePetPreferences = async(req,res) => {

 

    const pet_data = {
            pet_preferences :{
                age : req.body.age,
                color : req.body.color,
                breed : req.body.breed,
                activity:req.body.activity?req.body.activity:""
            
            }
          }
   

    UserModel.updateOne({_id:req.body.user_id},{$set:pet_data}).then((data)=>{
        res.json({result: true})
    }).catch(error=>{
        return res.status(400).json({result: false})
    });

}

const updateTermsConditions = async(req,res) => {


    UserModel.updateOne({_id:req.body.user_id},{$set:{

        terms_condition :true,
      
    }}).then((data)=>{
        res.json({result: true})
    }).catch(error=>{
        return res.status(400).json({result: false})
    });

}



const updateDeviceToken = async(req,res) => {


    UserModel.updateOne({_id:req.body.user_id},{$set:{

        device_token :req.body.device_token,
      
    }}).then((data)=>{
        res.json({result: true})
    }).catch(error=>{
        return res.status(400).json({result: false})
    });

}




const updateUserPassword = async(req,res) => {

    let newPassword = await bcrypt.hash(req.body.password,10);
    UserModel.updateOne({_id:req.body.user_id},{$set:{

        password :newPassword
      
    }}).then((data)=>{
        res.json({result: true})
    }).catch(error=>{
        return res.status(400).json({result: false})
    });

}




const logOutUser = async(req,res) => {


    UserModel.updateOne({_id:req.body.user_id},{$set:{

        device_token :"null"
      
    }}).then((data)=>{
        res.json({result: true})
    }).catch(error=>{
        return res.status(400).json({result: false})
    });

}


const getUserNotifications = async(req,res) => {

    try {

        let notif = await NotificationsModel.aggregate([
            { $match: { reciever_id :mongoose.Types.ObjectId(req.body.reciever_id)} },
            {  $lookup:
                {
                  from: "users",
                  localField: "sender_id",
                  foreignField: "_id",
                  as: "sender"
                }
             },

             {  $lookup:
                {
                  from: "users",
                  localField: "reciever_id",
                  foreignField: "_id",
                  as: "reciever"
                }
             },

           
          ]);
        return res.json({result:notif})
    } catch (error) {
        return res.json({result:"Notif not found"})
    }

}



const UpdateNotificationView = async(req,res) => {

    let updateRecord = { viewStatus : req.body.status , notificationtype : "Meeting" }
    NotificationsModel.updateOne({_id:req.body.notif_id},{$set:updateRecord},async(error,response)=>{
    if (error) {return res.status(400).json({result:false})}
    res.json({result:true});

})


}

const verifyShelter = async(req,res) =>
{
    const result = await Helper.verifyShelter(req)
    
    
}


export default{
    getProfile,
    updateProfile,
    updatePetPreferences,
    updateTermsConditions,
    updateDeviceToken,
    updateUserPassword,
    logOutUser,
    getUserNotifications,
    UpdateNotificationView,
    verifyShelter
}