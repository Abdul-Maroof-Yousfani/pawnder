

import petCategoryModel from "../../models/petCategoryModel.js"

const getAllProfiles = async(req,res) => {

    try {
        let petCat = await petCategoryModel.find().sort( { created_at: -1 } );
        delete petCat.password
        delete petCat.token
        return res.json({result:petCat})
    } catch (error) {
        return res.json({result:"petCat not found"})
    }
  
}


const getProfile = async(req,res) => {

    try {
        let petCat = await petCategoryModel.find({_id:req.query.recordId});
        delete petCat.password
        delete petCat.token
        return res.json({result:petCat})
    } catch (error) {
        return res.json({result:"petCat not found"})
    }
  
}

const postProfile = async(req,res) => { 

    const newRecord = new petCategoryModel(req.body);
    newRecord.save().then((data)=>{
        res.json({result: data})

    }).catch(error=>{
        return res.status(400).json({result: error})
    });


}




const updateProfile = async(req,res) => { 


    petCategoryModel.updateOne({_id:req.body.recordId},{$set:{name:req.body.name}},async(error,response)=>{
        if (error) {return res.status(400).json({message:false})}
        res.json({message:true});
    })


}



const deletepetCat = async(req,res) => { 


    petCategoryModel.updateOne({_id:req.body.recordId},{$set:{status:2}},async(error,response)=>{
        if (error) {return res.status(400).json({message:false})}
        res.json({message:true});
    })


}

export default{
    getProfile,
    postProfile,
    getAllProfiles,
    deletepetCat,
    updateProfile
   
    

 

}