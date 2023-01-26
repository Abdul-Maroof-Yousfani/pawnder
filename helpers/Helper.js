import nodemailer from "nodemailer";
import jwt from 'jsonwebtoken'
import User from "../models/UserModel.js";
import FCM from 'fcm-node'
import mongoose from "mongoose"

import Occupation from "../models/Occupation.js";
import Interest from "../models/interest.js";

import { request } from "express";
import fetch from "node-fetch";
import twilio from "twilio";

import Notification from '../models/notificationsModel.js';
import shelterModel from "../models/shelterModel.js";
let fcm = new FCM('AAAAykA17hA:APA91bHxddISCVoKsEYoorYZc1JZ5BF_rOSBJrnfcJ9bzrsj7mnX7swnh3MyWZY7gYqtxfp65eMKiq-eSMqeudSdeJU9W_uf4tluYdOj2G7u_oCOnWdcQ04itBF1plH3NxyfCY8b7aHV');


const sendOtp = async(number,userId) =>
{
 
    var accountSid = "AC126dee9507d28b38bf0201243ce15448";
    var authToken = "95006f065163c2ac275eb5b226d048af";

    try
    {
        const client = twilio(accountSid, authToken);

        const code = Math.floor(Math.random() * 1000000)

        let result = await client.messages
        .create({
        body: `Your Pawndr sign-up verification code is ${code}`,
        from: '+19376063149',
        to: number
        })
        if(result)
        {
            let update = await User.findByIdAndUpdate({_id: mongoose.Types.ObjectId(userId)},{$set:{otpVerification:code}}).lean()
        }

        return result;

        
    }
    catch(error)
    {
        console.log(error);
        return;
    }

    
    

    res.send({message : "Message Sent"});
    
   
}

const isOrganiztion = async (access,organizationCode) =>
{
    let token = access.access_token;
    let result = ''
    console.log(organizationCode);

    var requestOptions = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization  : `Bearer ${token}`
          },
        redirect: 'follow'
      };
      
      const newOrg = await fetch(`https://api.petfinder.com/v2/organizations/${organizationCode}`, requestOptions)
        .then(response => response.json())
        .then(result => result.organization?"true" : "false" )
        .catch(error => console.log('error', error));

        return newOrg == 'true' ? "verified"  : 'invalid organization'

}


const verifyShelter = async (organizationCode) =>
{
        let isVar = "invalid organization code";
      
    

        var urlencoded = new URLSearchParams();
        urlencoded.append("grant_type", "client_credentials");
        urlencoded.append("client_id", "9P8x2EiDH7wCECRY9SvbEAbskkS3xjk7imdTeQ2RBvI609x1qX");
        urlencoded.append("client_secret", "9tuuMeVIDgfA8AGp9rMVLxqCIGEareYEw3DVSzF0");
        
        var requestOptions = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
          },
        body: urlencoded,
        redirect: 'follow'
        };
    
                
        await fetch("https://api.petfinder.com/v2/oauth2/token", requestOptions)
        .then(response => response.json())
        .then(async result => {
            let data = await isOrganiztion(result,organizationCode)
            isVar = data

            
        })
        .catch(error => console.log('error', error));

         return isVar;
        }



const sendNotification = (userToken,sender_id,reciever_id, title, body, data=null,type='',created_at) =>{
    

    Notification.create({
        title:title,
        body:body,
        sender_id:sender_id,
        reciever_id:reciever_id,
        payload:data,
        notificationtype:type,
        createdDate:created_at
    }).then(result => {
        console.log("result" )
        console.log(result._id);
        let message = {
            to: userToken, 
            collapse_key: 'xxxxxx-xxxxxx-xxxxxx',
    
            notification: {
                title: title, 
                body: body,
            },
            data: { ...data, notificationid:result._id}
        };
        
        fcm.send(message, function(err, response){
            if (err) {
                console.log(err);
            } else {
                console.log("Successfully sent with response: ", response);
            }
        });
        
    }).catch(error => console.log(error))
}

const randomnumber = (length) =>{
    return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1))
}
const sendResetPasswordMail = (code,email,callback) => {
    let transportor = nodemailer.createTransport({
        host: "pawndrrescue.com",
        port: 465,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWAORD
        }
    })
    let mailOption = {
        from: process.env.MAIL_USERNAME,
        to: email,
        subject: "code for reset password",
        text: `${code}`
    }
    return transportor.sendMail(mailOption,callback)
}
const verifyToken = (req,res,next) =>{
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== "undefined") {
        const bearerToken = bearerHeader.split(" ");
        req.token = bearerToken[1];
        jwt.verify(req.token,process.env.JWT_SECRET,(error,authData)=>{
            if (error) { return res.status(401).json({message:error.message}) }
            next()
        })
    } else {
        return res.status(401).json({ message: "please Insert Jwt" });
    }
}
const authorizeUser = (req, res, next) =>{
    if (req.body.tokenid == undefined || req.body.tokenid == null) {return res.status(401).json({message:"Request is not authorized"}) }
    User.findById(req.body.tokenid).exec().then(data=>{
        if (data.token !== req.token) { return res.status(401).json({message:"Request is not authorized"}) }
        else{next()}
    }).catch(error=>{return res.status(401).json({message:"Request is not authorized"})})
}
const regexSearch = (query) => {
    let search = '.*' + query + '.*';
    let value = new RegExp(["^", search, "$"].join(""), "i");
    return value;
}
const findOrAddOccupation = async(occupation) => {
    let occupationExist = await Occupation.findOne({ name: regexSearch(occupation) }).exec();
   // return occupationExist
    if (occupationExist === null) {
        let occupationAdd = await Occupation.create({ name: occupation })
        occupation = occupationAdd.id 
    }else{
        occupation = occupationExist.id 
    }
    return occupation;
}
const findOrAddInterest = async(interest) => {
    
    let interestExist = await Interest.findOne({ name: regexSearch(interest) }).exec();
   // return occupationExist
    if (interestExist === null) {
        let interestAdd = await Interest.create({ name: interest })
        interest = interestAdd.id 
    }else{
        interest = interestExist.id 
    }
    return interest;
}

 function distance(lat1, lon1, lat2, lon2, unit)  {

    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
        dist = 1;
    }
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist
   
}


const nearByLocation = async(long,lat, distance) =>
{
    let totalDistance = distance
 
    let result = await shelterModel.find({
        location:{
            $near:{
                $geometry:{
                    type:"Point",
                    coordinates:[
                        long,
                        lat
                    ],
                },
                $maxDistance: totalDistance
            }
        }
    },{ _id: 1}).lean();
    let value = []
    result.map((e) =>
    {
        value.push(e._id);
    })
    return  value;
}   

const nearByCordinates = (poslat,poslng,range_in_meter,data) => {


    var cord =[];

    for (var i = 0; i < data.length; i++) {
      
        if (distance(poslat, poslng, data[i].latitude, data[i].longitude, "K") <= range_in_meter) {
            cord.push(data[i]._id);
        }
     
        }

        return cord;
   
}


const isoDate = (date) => {

    var datetime = date
    var start = new Date(datetime),
    dateParts = datetime.split('-'),
    y = parseInt(dateParts[0], 10),
    m = parseInt(dateParts[1], 10),
    d = parseInt(dateParts[2], 10),
    date  = start.toISOString()
    console.log(date)
    return date; // "2015-04-14T00:00:00.000Z "
    

}




export default{
    verifyToken,
    randomnumber,
    sendResetPasswordMail,
    authorizeUser,
    regexSearch,
    findOrAddOccupation,
    isoDate,
    nearByCordinates,
    sendNotification,
    findOrAddInterest,
    nearByLocation,
    verifyShelter,
    isOrganiztion,
    sendOtp
  
}



