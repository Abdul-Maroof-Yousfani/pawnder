import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/UserModel.js';
import Helper from "../helpers/Helper.js"
import mongoose from "mongoose"


const register = async(req,res) =>{
    let { name, user_type, phone, email, password , organizationCode} = req.body;
    
    if (!user_type) {return res.status(400).json({message:"Must b select User type"})}
    req.body.verified = "true"

    if(user_type == 'volunteer')
    {
  
        let checkShelter  = await Helper.verifyShelter(organizationCode);
        if(checkShelter != 'verified') return res.json({message:"Shelter no Verified"})
    }

    let checkIfShelterExists = await User.findOne({organizationCode: organizationCode}).lean();
    
    if(checkIfShelterExists) return res.json({message:"Shelter Already Exists"})

  


    if (!name || !phone || !email || !password) {return res.status(400).json({message:"All Fields required"})}
    req.body.password = await bcrypt.hash(password,10);
    User.findOne({email:email}).exec((error,result)=>{
        if (error) {return res.status(400).json({message:error.message})} 
        if (result) {return res.status(400).json({message:"Email already exist"})}
        else{
            User.create(req.body).then(result =>{
                result.password = "";
                const token = jwt.sign(req.body,process.env.JWT_SECRET)
                User.updateOne({_id:result._id},{$set:{token:token}},async(error,response)=>{
                    if (error) {return res.status(400).json({message:error.message})}
                    res.json({result:await User.findById(result._id).exec()});
                })
                Helper.sendOtp(phone)

            }).catch(error => {return res.status(400).json({message:error.message})})
        }
    })
}

const verifyCode = async(req,res) =>
{
     let {otpVerification,userId} = req.body;
     if(!otpVerification)
     {
        return res.status(433).json({
            message : "Please fill the Required field",
            data : {}
        })
     }
     try
     {
        let verifyUser = await User.findOne({_id:mongoose.Types.ObjectId(userId), otpVerification}).lean();
        return verifyUser?res.send({message : "User Verified Successfully", data : verifyUser }) : res.status(403).send({message : "Invalid Code, please try again", data : {} })
     }
     catch(error)
     {
        return res.status(500).json({
            message : error.message,
            data : {}
        })  
     }
}

const resendCode = async(req,res) =>
{
    let {phone,userId} = req.body;
     try
     {
        let verifyUser = await User.findOne({_id:mongoose.Types.ObjectId(userId), phone}).lean();
        if(!verifyUser) return res.status(404).json({message : "invalid User", data :  {}})
        if(verifyUser.otpCount > 3) return res.status(433).send({message : "Verification Limit crossed, you can request only 3 times a day", data : verifyUser })
        
        let result = await Helper.sendOtp("+"+phone,userId);
        return res.json({
            message :  `Verification code sent to ${phone} `,
            data : {}
        })

        
     }
     catch(error)
     {
        return res.status(404).json({
            message : error.message,
            data : {}
        })
     }
}

const login = (req,res) =>{
    let {email, password} = req.body
    if (!email || !password) {return res.status(400).json({message:"fields are required"})}

    User.findOne({email:email,status:"1"},async(error,result)=>{

       
        if (error) {return res.status(400).json({message:error.message})}
        if (!result) {return res.status(400).json({message:"Invalid Email & Password"})}


        else{
          
            let passwordCheck = await bcrypt.compare(password,result.password)
                
            if (!passwordCheck) {return res.status(400).json({message:"Invalid Email & Password"})}

            else{
                const token = jwt.sign(req.body,process.env.JWT_SECRET)

                User.findOneAndUpdate({_id:result._id},{$set:{token:token}},async(error,result)=>{

                    if (error) {return res.status(400).json({message:error.message})}

                    result.password = ""
                    result.token = token
                    
                    res.json({result});
                })
            }
        }

    })
}

const resetpassword = (req,res) => {
    let {email} = req.body
    if (!email) {return res.status(400).json({message:"Email are required"})}
    User.findOne({email:email},async(error,result) => {
        if (error) {return res.status(400).json({message:error.message})}
        if (!result) {return res.status(400).json({message:"Invalid Email"})}
        else{
            let code = Helper.randomnumber(6);
            Helper.sendResetPasswordMail(code , result.email,(error,response) => {
                if (error) {return res.status(400).json({message:error.message})}
                result = {
                    _id: result._id,
                    email:result.email,
                    code: code
                }
                return res.json({result})
            });
        }
    })
}

export default {
    register,
    login,
    resetpassword,
    verifyCode,
    resendCode
}