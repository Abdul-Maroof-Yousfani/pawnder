
import Helper from "../helpers/Helper.js";
import productModel from "../models/productModel.js"
import breedsModel from "../models/breedsModel.js"
import characterticsModel from "../models/characteristicsModel.js"



const getProfile = async(req,res) => {
    
    try {
        let breeds = await breedsModel.findOne({_id:req.body.breed_id}).lean();
        delete breeds.password
        delete breeds.token
        return res.json({result:breeds})
    } catch (error) {
        return res.json({result:"breed not found"})
    }
  
}



const getRegisteredBreeds = async(req,res) => {
    let {name} = req.query
    try {
            let breeds = await breedsModel.aggregate([
            {$match : { name : Helper.regexSearch(name) }},
            {  
                $lookup:
                {
                  from: "products",
                  localField: "_id",
                  foreignField: "breed_id",
                  as: "breeds"
                }
             },
             
             
             { $unwind: "$breeds" },
             { $project: {_id:1,name:1} },
             { $group : { _id : "$name" } }
             

           
          ])
          let breedsArr =[];
          breeds.forEach((value, key) => {
            breedsArr.push(value._id)
          });
        delete breeds.password
        delete breeds.token
        return res.json({result:breedsArr})
    } catch (error) {
        return res.json({result:"breed not found"})
    }
  
}


const getBreedColors = async(req,res) => {

    try {
       
        let colors = await productModel.find({breed_id:req.query.breed_id},{color:1}).distinct("color");

        delete colors.password
        delete colors.token
        return res.json({result:colors})
    } catch (error) {
        return res.json({result:"colors not found"})
    }
  
}

const postProfile = async(req,res) => {

    const newRecord = {
        name : req.body.name,
  
    
    }
    try
    {
        const newBreeds = new breedsModel(newRecord);
        newBreeds.save().then((data)=>{
            res.json({result: data})
        }).catch(error=>{
            return res.status(400).json({result: error})
        });
    }
    catch(error)
    {
        return res.json({error:error.message})
    }

    


}


const getBreeds = async(req,res) => {
    try
    {
        if(req.query.q || req.breedsModel.q === undefined){
            let breeds = await breedsModel.find({}).distinct("name")
            return res.json({ result:breeds });
        }else{
    
            let breeds = await breedsModel.find({ name: { $regex: Helper.regexSearch(req.query.q) } }).distinct("name")
            return res.json({ result:breeds });
        }
    }
    catch(error)
    {
        res.json({error:error.messsage})
    }
    
   
}

const getCharacteristics = async(req,res) => {
    if(req.query.q === "" || req.query.q === undefined){

        let char = await characterticsModel.find({}).lean()
        return res.json({ result:char });
       
    }else{

        let char = await characterticsModel.find({ name: { $regex: Helper.regexSearch(req.query.q) }}).distinct("name")
        return res.json({ result:char });
      
    }
   
}

const getColors = async(req,res) => {
    if(req.query.q === "" || req.query.q === undefined){
        let color = await productModel.find({},{'color':1}).distinct("color")
        return res.json({ result:color });
    }else{

        let color = await productModel.find({ color: { $regex: Helper.regexSearch(req.query.q) } },{'color':1}).distinct("color")
        return res.json({ result:color });
    }
   
}

const breeds = async(req,res) =>
{
    try
    {
        let breeds = await breedsModel.find({}).lean();
        return res.json({message:"Successfully Recieved" , breeds })

    }
    catch(error)
    {
        return res.json({error:error.message })
    }
}





// const findOrAddBreed = async(breed) => {
//     let breedExist = await breedsModel.findOne({ name: Helper.regexSearch(breed) }).exec();
//    // return occupationExist
//     if (breedExist === null) {
//         let breedAdd = await breedsModel.create({ name: breed })
//         breed = breedAdd.id 
//     }else{
//         breed = breedExist.id 
//     }
//     return breed;
// }


export default{
    getProfile,
    postProfile,
    getBreeds,
    getRegisteredBreeds,
    getBreedColors,
    getCharacteristics,
    getColors,
    breeds

 

}