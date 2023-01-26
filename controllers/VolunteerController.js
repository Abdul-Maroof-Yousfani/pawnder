import User from "../models/UserModel.js"
import Occupation from "../models/Occupation.js"
import State from "../models/State.js"
import Helper from "../helpers/Helper.js";
import interest from "../models/interest.js";

const getProfile = async(req,res) => {
    try {
        let volunteer_id = req.params.volunteer_id

        let user = await User.findOne({_id:volunteer_id}).lean();
        delete user.password
        delete user.token
        return res.json({result:user})
    } catch (error) {
        return res.json({message:"User not found"})
    }
}
const postProfile = async(req,res) => {
    let file = req.files
    // if(file != null && file.profile_picture != undefined && file.profile_picture != null)
    // {
    //     file = file.profile_picture
    //     if (file.mimetype.split("/")[0] == "image") {
    //         let file_name = `public/uploads/profilePictures/${Date.now()}-${file.name.replace(/ /g, '-').toLowerCase()}`;
    //         file.mv(file_name,(error)=>{
    //             if (error) { return res.status(400).json({message: error.message})}
    //         })
    //         file_name = file_name.replace("public", "");
    //         req.body.profile_picture = file_name
    //     }else {
    //         return res.status(400).json({message: "File type must b image.."})
    //     }
    // }
    if (req.body.occupation) {
        req.body.occupation = await Helper.findOrAddOccupation(req.body.occupation);
    }
    if (req.body.interest) {
        req.body.interest = await Helper.findOrAddInterest(req.body.interest);
    }

    if(req.params.user)
    {
        await User.updateOne({_id:req.params.user},{$set:req.body});
    }

    return res.json(req.body)
    User.updateOne({_id:req.params.user},{$set: req.body},(error,update)=>{
        if (update == undefined) {return res.status(400).json({message: "User not found"})}
        if (error) {return res.status(400).json({message: error.message})}
        User.findById(req.params.user).lean().then(user => {
            delete user.token
            delete user.password
            return res.json({user})
        })
    })
}
const getOccupation = (req,res) =>{
    if(req.query.q === "" || req.query.q === undefined){
        Occupation.find().then(result => {
            res.json({ result });
        });
    }else{
        Occupation.find({ name: { $regex: Helper.regexSearch(req.query.q) } }).then(result => {
            res.json({ result });
        });
    }
}
const getInterest = (req,res) =>{
    if(req.query.q === "" || req.query.q === undefined){
        interest.find().then(result => {
            res.json({ result });
        });
    }else{
        interest.find({ name: { $regex: Helper.regexSearch(req.query.q) } }).then(result => {
            res.json({ result });
        });
    }
}
const getState = (req,res) =>{
    if(req.query.q === "" || req.query.q === undefined){
        State.find().then(result => {
            res.json({ result });
        });
    }else{
        State.find({ name: { $regex: Helper.regexSearch(req.query.q) } }).then(result => {
            res.json({ result });
        });
    }
}

export default{
    getProfile,
    postProfile,
    getOccupation,
    getState
}