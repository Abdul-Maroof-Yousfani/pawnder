
import mainMenuModel from "../../models/backend/mainMenu.js"
import subMenuModel from "../../models/backend/subMenu.js"
import mongoose from "mongoose"



const getProfile = async(req,res) => {
    try {
        let mainMenu = await mainMenuModel.find().sort( { order: -1 } );
        delete mainMenu.password
        delete mainMenu.token
        return res.json({result:mainMenu})
    } catch (error) {
        return res.json({message:"Menu not found"})
    }
  
  
}

const getSubMenuProfile = async(req,res) => {
    try {
        let subMenu = await subMenuModel.aggregate([

      
            {  $lookup:
                {
                  from: "mainmenus",
                  localField: "menu_id",
                  foreignField: "_id",
                  as: "main_menu"
                }
                
            },
            {$unwind : '$main_menu'},
        
           
           
          ]).sort( { order: -1 } );
        delete subMenu.password
        delete subMenu.token
        return res.json({result:subMenu})
    } catch (error) {
        return res.json({message:"subMenu not found"})
    }
  
  
}
const postProfile = async(req,res) => {

    const newRecord = {

        menu_name : req.body.menu_name,
        menu_type : req.body.menu_type,
        order: req.body.order
  
    
    }


    const newMenu = new mainMenuModel(newRecord);
    newMenu.save().then(async (data)=>{

        let menuData =  await mainMenuModel.find().sort( { created_at: -1 } ).exec();
       
        return res.json({message: "done", menus : menuData})
    }).catch(error=>{
        return res.status(400).json({message: error})
    });


}

const postSubMenuProfile = async(req,res) => {

    const newRecord = {
      

        menu_id: req.body.menu_id,
        sub_menu_name: req.body.sub_menu_name,
        component_name: req.body.component_name,
  
    
    }


    const newsubMenu = new subMenuModel(newRecord);
    newsubMenu.save().then(async (data)=>{

     let menuData = await subMenuModel.aggregate([

      
        {  $lookup:
            {
              from: "mainmenus",
              localField: "menu_id",
              foreignField: "_id",
              as: "main_menu"
            }
        },
        {$unwind : '$main_menu'},
       
      ]).sort( { created_at: -1 } );
       
        return res.json({message: "done", menus : menuData})
    }).catch(error=>{
        return res.status(400).json({message: error})
    });


}


const getMenuData = async(req,res) => {

   
      try {
        let menuData = await mainMenuModel.aggregate([

            { $match: { menu_type:req.query.type} },
            {  $lookup:
                {
                  from: "submenus",
                  localField: "_id",
                  foreignField: "menu_id",
                  as: "sub_menu"
                }
            },
          
           
           
          ]).sort( { order: -1 } );
        delete menuData.password
        delete menuData.token
        return res.json({result:menuData})
    } catch (error) {
        return res.json({message:"MenuData not found"})
    }
  


}


const deleteMenu = async(req,res) => {

   
    try {
       
        let menuData = await mainMenuModel.deleteOne({ _id: req.body.recordId });
        let menuData2 = await subMenuModel.deleteOne({ menu_id: req.body.recordId });

        return res.json({result:true})
    } catch (error) {
        return res.json({result:false})
    }



}


const deleteSubMenu = async(req,res) => {

   
    try {
       
        let menuData2 = await subMenuModel.deleteOne({ _id: req.body.recordId });

        return res.json({result:true})
    } catch (error) {
        return res.json({result:false})
    }



}




export default{
    postProfile,
    getProfile,
    postSubMenuProfile,
    getSubMenuProfile,
    getMenuData,
    deleteMenu,
    deleteSubMenu,

 

 

}