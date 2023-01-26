


import adminModel from "../../models/backend/adminModel.js"
import UsersModel from "../../models/UserModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



const getAllUsers = async(req,res) => {

 
    try {
        let User = await UsersModel.find().sort( { created_at: -1 } );
        return res.json({result:User})
    } catch (error) {
        return res.json({result:"admin not found"})
    }
  
}

const getAllAdmins = async(req,res) => {

 
    try {
        let User = await adminModel.find().sort( { created_at: -1 } );
        return res.json({result:User})
    } catch (error) {
        return res.json({result:"admin not found"})
    }
  
}

const deleteUser = async(req,res) => { 

try {
      
    let User = await UsersModel.updateOne({_id: req.body.recordId},{$set:{status:req.body.user_status}})
       
        return res.json({result:true})
    } catch (error) {
        return res.json({result:false})
    }
}

const deleteAdmin = async(req,res) => { 

    try {
          
        let User = await adminModel.updateOne({_id: req.body.recordId},{$set:{status:req.body.user_status}})
           
            return res.json({result:true})
        } catch (error) {
            return res.json({result:false})
        }
    }
    

const register = async(req,res) =>{

    let password = await bcrypt.hash(req.body.password,10)
    let record = {
        "name" : req.body.name,
        "email" : req.body.email,
        "password" : password,
       
    }
    
    adminModel.findOne({email:req.body.email}).exec((error,result)=>{
        if (error) {return res.status(400).json({result:error.message})} 
        if (result) {return res.json({result:"Email already exist"})}
        else{
            adminModel.create(record).then(result =>{
                result.password = "";
                return res.json({result:result})
            }).catch(error => {return res.status(400).json({message:error.message})})
        }
    })
}


const login = (req,res) =>{
    let {email, password} = req.body
    if (!email || !password) {return res.status(400).json({message:"fields are required"})}

    adminModel.findOne({email:email,status:1},async(error,result)=>{


        if (error) {return res.status(400).json({message:error.message})}
        if (!result) {return res.status(400).json({message:"Invalid Email & Password"})}


        else{
          
            let passwordCheck = await bcrypt.compare(password,result.password)
                
            if (!passwordCheck) {return res.status(400).json({message:"Invalid Email & Password"})}

            else{
                const token = jwt.sign(req.body,process.env.JWT_SECRET)

                adminModel.findOneAndUpdate({_id:result._id},{$set:{token:token}},async(error,result)=>{

                    if (error) {return res.status(400).json({message:error.message})}

                    result.password = ""
                    result.token = token
                    
                    res.json({result});
                })
            }
        }

    })
}


export default{
    getAllUsers,
    deleteUser,
    register,
    login,
    getAllAdmins,
    deleteAdmin
    

 

}