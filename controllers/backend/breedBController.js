

import breedsModel from "../../models/breedsModel.js"

const getAllProfiles = async(req,res) => {

    try {
        let breed = await breedsModel.find().sort( { created_at: -1 } );
        delete breed.password
        delete breed.token
        return res.json({result:breed})
    } catch (error) {
        return res.json({result:"breed not found"})
    }
  
}


const getProfile = async(req,res) => {

    try {
        let breed = await breedsModel.find({_id:req.query.recordId});
        delete breed.password
        delete breed.token
        return res.json({result:breed})
    } catch (error) {
        return res.json({result:"breed not found"})
    }
  
}

const postProfile = async(req,res) => { 



    const newRecord = new breedsModel({name:req.body.name});
    newRecord.save().then((data)=>{
        res.json({result: data})

    }).catch(error=>{
        return res.status(400).json({result: error})
    });


}




const updateProfile = async(req,res) => { 


    breedsModel.updateOne({_id:req.body.recordId},{$set:{name:req.body.name}},async(error,response)=>{
        if (error) {return res.status(400).json({message:false})}
        res.json({message:true});
    })


}



const deleteBreed = async(req,res) => { 


    breedsModel.updateOne({_id:req.body.recordId},{$set:{status:2}},async(error,response)=>{
        if (error) {return res.status(400).json({message:false})}
        res.json({message:true});
    })


}

export default{
    getProfile,
    postProfile,
    getAllProfiles,
    deleteBreed,
    updateProfile
   
    

 

}