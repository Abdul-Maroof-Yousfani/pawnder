import FaqModel from "../models/backend/faqModel.js"
import termsConditionModel from "../models/backend/termsConditionModel.js";
import Helper from "../helpers/Helper.js";

const getProfile = async(req,res) => {
    try {
        let user = await User.findOne({_id:req.body.user}).lean();
        delete user.password
        delete user.token
        return res.json({result:user})
    } catch (error) {
        return res.json({message:"User not found"})
    }
}


const getFaqList = async(req,res) => {
    try {
        let faqs = await FaqModel.find();
       
        return res.json({result:faqs})
    } catch (error) {
        return res.json({result:"faqs not found"})
    }
}

const postFaqs = async(req,res) => {

    const newRecord = {
        question : req.body.question,
        answer : req.body.answer,

    }

    const newFaq = new FaqModel(newRecord);
    newFaq.save().then((data)=>{
        res.json({result: data})
    }).catch(error=>{
        return res.status(400).json({result: error})
    });


}



const deleteFaq = async(req,res) => {
    try {
        let faqs = await FaqModel.deleteOne({_id:req.body.recordId});
       
        return res.json({result:true})
    } catch (error) {
        return res.json({result:"not found"})
    }
}




const getTermsCondition = async(req,res) => {

    try {
        let terms = await termsConditionModel.find({_id:"61dfec2be92cf8019dc097dc"});
       
        return res.json({result:terms})
    } catch (error) {
        return res.json({result:"terms not found"})
    }

}
const postTermsCondition = async(req,res) => {

   await termsConditionModel.deleteOne({_id:"61dfec2be92cf8019dc097dc"})

    const newRecord = {

        terms_condition : req.body.terms_condition,

    }

    const newTerms = new termsConditionModel(newRecord);
    newTerms.save().then((data)=>{
        res.json({result: data})
    }).catch(error=>{
        return res.status(400).json({result: error})
    });


}




export default{
    getProfile,
    postFaqs,
    getFaqList,
    deleteFaq,
    postTermsCondition,
    getTermsCondition
 
}