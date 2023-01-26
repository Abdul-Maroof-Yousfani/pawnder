
import Helper from "../helpers/Helper.js";
import mongoose from "mongoose"
import productModel from "../models/productModel.js"
import productGalleryModel from "../models/productGallery.js";
import breedsModel from "../models/breedsModel.js"
import charModel from "../models/characteristicsModel.js"
import favourtiesModel from "../models/favouritesModel.js"
import recentView from "../models/productRecentView.js"
import shelterModel from "../models/shelterModel.js"
import UserModel from "../models/UserModel.js";
import petCategoryModel from "../models/petCategoryModel.js"



const searchProfile = async (req, res) => {
  
  try {

    let shelter = [];

    var query = {}

    if (req.body.range_in_meter > "0" || req.body.latitude || req.body.longitude) {
      

      shelter = await Helper.nearByLocation(req.body.longitude,req.body.latitude,req.body.range_in_meter);


    }

    if(!req.body.latitude || !req.body.longitude)
    {
      let shelters = await shelterModel.find({}).lean();
      shelters.map((e) =>
      {
        shelter.push(e._id);
      })
    }

    // if (req.body.pet_category_id) {

    //   query.pet_category_id = mongoose.Types.ObjectId(req.body.pet_category_id)


    // }

    if ( req.body.pet_category_id) 
     {  
      if ((req.body.pet_category_id).length > 0) {

        let objectIdArray = req.body.pet_category_id.map(s => mongoose.Types.ObjectId(s));
  
        query.pet_category_id = { "$in": objectIdArray };
  
      }
     }


    if ( req.body.breed_id) 
    {
      if((req.body.breed_id).length > 0)
      {
        let objectIdArray = req.body.breed_id.map(s => mongoose.Types.ObjectId(s));

        query.breed_id = { "$in": objectIdArray };
      }
     }
    
    if ( req.body.breed_id) 
     {  
      if ((req.body.characteristics_id).length > 0) {

        let objectIdArray = req.body.characteristics_id.map(s => mongoose.Types.ObjectId(s));
  
        query.characteristics_id = { "$in": objectIdArray };
  
      }
     }

    
    if(req.body.color)
    {
      if ((req.body.color).length > 0) 
      {

        query.color = { "$in": req.body.color };
  
      }
    }
    

    if (req.body.start_weight !== "0" && req.body.end_weight !== "0") {


      query.weight = { "$gte": req.body.start_weight, "$lte": req.body.end_weight }


    }

    if (req.body.start_height !== "0" && req.body.end_height !== "0") {


      query.height = { "$gte": req.body.start_height, "$lte": req.body.end_height }


    }

    if (req.body.start_age !== "0" && req.body.end_age !== "0") {

      query.age = { "$gte": req.body.start_age, "$lte": req.body.end_age }


    }

    let nearByPet = await productModel.aggregate([
      { $match: {shelter_id: {$in: shelter  }  } },

      {
        $lookup:
        {
          from: "productgalleries",
          localField: "_id",
          foreignField: "product_id",
          as: "productGallery"
        },
        
      },
      {
        $lookup:
        {
          from: "favourites",
          localField: "_id",
          foreignField: "product_id",
          as: "favourites"
        },
        
      }



    ]);




    return res.json({ result: nearByPet })


  } catch (error) {

    return res.json({ result: error.message })
  }


}

const getProfile = async (req, res) => {

  try {
    let products = await productModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(req.body.product_id) } },
      {
        $lookup:
        {
          from: "productgalleries",
          localField: "_id",
          foreignField: "product_id",
          as: "productGallery"
        }
      },
      {
        $lookup:
        {
          from: "characteristics",
          localField: "characteristics_id",
          foreignField: "_id",
          as: "characteristics"
        }
      },
      {
        $lookup:
        {
          from: "shelters",
          localField: "shelter_id",
          foreignField: "_id",
          as: "shelters"
        }
      },
      {
        $lookup:
        {
          from: "petcategories",
          localField: "pet_category_id",
          foreignField: "_id",
          as: "petcategories"
        }
      },
      {
        $lookup:
        {
          from: "breeds",
          localField: "breed_id",
          foreignField: "_id",
          as: "breed"
        }
      },
      {
        $lookup:
        {
          from: "users",
          localField: "volunteer_id",
          foreignField: "_id",
          as: "volunteer"
        }
      },


    ]);



    delete products.password
    delete products.token


    return res.json({ result: products })
  } catch (error) {
    return res.json({ result: "Product not found" })
  }


}




const getFavtPetsForCards = async (req, res) => {

  try {

    let product_query = await favourtiesModel.find({ user_id: req.body.user_id })
    let productArr = [];
    product_query.forEach((value, key) => {
      productArr.push(value.product_id)
    });

    let products = await productModel.aggregate([

      { "$match": { "_id": { "$nin": productArr } } },

      {
        $lookup:
        {
          from: "productgalleries",
          localField: "_id",
          foreignField: "product_id",
          as: "productGallery"
        }
      },



    ]);

    if (products.length === 0) {


      let product_query = await favourtiesModel.find({ type: false })
      let productArr = [];
      product_query.forEach((value, key) => {
        productArr.push(value.product_id)
      });

      let products = await productModel.aggregate([

        { "$match": { "_id": { "$in": productArr } } },

        {
          $lookup:
          {
            from: "productgalleries",
            localField: "_id",
            foreignField: "product_id",
            as: "productGallery"
          }
        },



      ]);
      return res.json({ result: products })
    }

    return res.json({ result: products })
  } catch (error) {
    return res.json({ result: "Product not found" })
  }


}




const getAllProfile = async (req, res) => {

  try {
    let products = await productModel.aggregate([
      { $match: { status: "1" } },
      {
        $lookup:
        {
          from: "productgalleries",
          localField: "_id",
          foreignField: "product_id",
          as: "productGallery"
        }
      },
      {
        $lookup:
        {
          from: "characteristics",
          localField: "characteristics_id",
          foreignField: "_id",
          as: "characteristics"
        }
      },
      {
        $lookup:
        {
          from: "shelters",
          localField: "shelter_id",
          foreignField: "_id",
          as: "shelters"
        }
      },
      {
        $lookup:
        {
          from: "petcategories",
          localField: "pet_category_id",
          foreignField: "_id",
          as: "petcategories"
        }
      },
      {
        $lookup:
        {
          from: "breeds",
          localField: "breed_id",
          foreignField: "_id",
          as: "breed"
        }
      },

    ]);

    var data = await Promise.all(products.map(async (result1) => {

      result1.favourite = await favourtiesModel.count({ product_id: result1._id, user_id: req.body.user_id }).exec()
      return result1

    }));

    return res.json({ result: data })
  } catch (error) {
    return res.json({ result: "Product not found" })
  }


}

const getShelterWiseProfile = async (req, res) => {

  try {
    let products = await productModel.aggregate([
      { $match: { shelter_id: mongoose.Types.ObjectId(req.body.shelter_id) } },
      {
        $lookup:
        {
          from: "productgalleries",
          localField: "_id",
          foreignField: "product_id",
          as: "productGallery"
        }
      },
      {
        $lookup:
        {
          from: "characteristics",
          localField: "characteristics_id",
          foreignField: "_id",
          as: "characteristics"
        }
      },
      {
        $lookup:
        {
          from: "shelters",
          localField: "shelter_id",
          foreignField: "_id",
          as: "shelters"
        }
      },
      {
        $lookup:
        {
          from: "petcategories",
          localField: "pet_category_id",
          foreignField: "_id",
          as: "petcategories"
        }
      },
      {
        $lookup:
        {
          from: "breeds",
          localField: "breed_id",
          foreignField: "_id",
          as: "breed"
        }
      },


    ]);

    var data = await Promise.all(products.map(async (result1) => {

      result1.favourite = await favourtiesModel.count({ product_id: result1._id, user_id: req.body.user_id }).exec()
      return result1

    }));



    return res.json({ result: data })
  } catch (error) {
    return res.json({ result: "Product not found" })
  }


}
const postProfile = async (req, res) => {


  let breed_id = "";
  let char_id = "";
  let pet_category_id = "";

  let breedExist = await breedsModel.findOne({ name: Helper.regexSearch(req.body.breed) }).exec();

  if (breedExist === null) {
    let breedAdd = await breedsModel.create({ name: req.body.breed })
    breed_id = breedAdd.id
  } else {
    breed_id = breedExist.id
  }





  let charExist = await charModel.findOne({ name: Helper.regexSearch(req.body.char) }).exec();

  if (charExist === null) {
    let charAdd = await charModel.create({ name: req.body.breed })

    char_id = charAdd.id
  } else {
    char_id = charExist.id
  }

  let petCategoryExist = await petCategoryModel.findOne({ name: Helper.regexSearch(req.body.pet) }).exec();

  if (petCategoryExist === null) {

    let petCategoryAdd = await petCategoryModel.create({ name: req.body.pet })

    pet_category_id = petCategoryAdd.id

  } else {
    pet_category_id = petCategoryExist.id
  }




  //  let fileArr =  req.files.product_gallery;


  //  fileArr.forEach(file => {
  //      let fileName = `public/uploads/productGallery/${Date.now()}-${file.name.replace(/ /g, '-').toLowerCase()}`;
  //      file.mv(fileName,(error)=>{
  //          if (error) { return res.status(400).json({status: "400", result: error.message})}
  //      });
  //      fileName = fileName.replace("public", "");
  //      gallery.push(fileName)
  //  });

  var gallery = [];
  let file = req.files
  if (file != null && file.product_gallery != undefined && file.product_gallery != null) {

    //multi upload
    if ((file.product_gallery).length > 1) {


      let fileArr = file.product_gallery;
      fileArr.forEach(file => {
        let fileName = `public/uploads/productGallery/${Date.now()}-${file.name.replace(/ /g, '-').toLowerCase()}`;
        file.mv(fileName, (error) => {
          if (error) { return res.status(400).json({ status: "400", result: error.message }) }
        });
        fileName = fileName.replace("public", "");
        gallery.push(fileName)
      });


    } else {


      //single upload
      let file2 = req.files
      file2 = file2.product_gallery
      let fileName = `public/uploads/productGallery/${Date.now()}-${file2.name.replace(/ /g, '-').toLowerCase()}`;
      file2.mv(fileName, (error) => {
        if (error) { return res.status(400).json({ result: error.message }) }
      })
      fileName = fileName.replace("public", "");
      gallery.push(fileName)

    }




  }



  const newRecord = {

    breed_id: breed_id,
    characteristics_id: char_id,
    pet_category_id: pet_category_id,
    shelter_id: req.body.shelter_id,
    volunteer_id: req.body.volunteer_id,
    name: req.body.name,
    description: req.body.description,
    age: req.body.age,
    color: req.body.color,
    gender: req.body.gender,
    weight: req.body.weight,
    height: req.body.height,

  }
  console.log(gallery)

  const newProduct = new productModel(newRecord);
  newProduct.save().then((data) => {
    res.json({ result: data })


    gallery.forEach(galleryData => {
      const newProductGallery = new productGalleryModel({ path: galleryData, product_id: data.id });
      newProductGallery.save()
    });

  }).catch(error => {
    return res.status(400).json({ result: error })
  });


}

const updateProfile = async (req, res) => {

  let breed_id = "";
  let char_id = "";
  let pet_category_id = "";

  let breedExist = await breedsModel.findOne({ name: Helper.regexSearch(req.body.breed) }).exec();

  if (breedExist === null) {
    let breedAdd = await breedsModel.create({ name: req.body.breed })
    breed_id = breedAdd.id
  } else {
    breed_id = breedExist.id
  }





  let charExist = await charModel.findOne({ name: Helper.regexSearch(req.body.char) }).exec();

  if (charExist === null) {
    let charAdd = await charModel.create({ name: req.body.breed })

    char_id = charAdd.id
  } else {
    char_id = charExist.id
  }




  let petCategoryExist = await petCategoryModel.findOne({ name: Helper.regexSearch(req.body.pet) }).exec();

  if (petCategoryExist === null) {

    let petCategoryAdd = await petCategoryModel.create({ name: req.body.pet })

    pet_category_id = petCategoryAdd.id

  } else {
    pet_category_id = petCategoryExist.id
  }



  let file = req.files
  var gallery = [];
  if (file != null && file.product_gallery != undefined && file.product_gallery != null) {

    //multi upload
    if ((file.product_gallery).length > 1) {


      let fileArr = file.product_gallery;
      fileArr.forEach(file => {
        let fileName = `public/uploads/productGallery/${Date.now()}-${file.name.replace(/ /g, '-').toLowerCase()}`;
        file.mv(fileName, (error) => {
          if (error) { return res.status(400).json({ status: "400", result: error.message }) }
        });
        fileName = fileName.replace("public", "");
        gallery.push(fileName)
      });


    } else {


      //single upload
      let file2 = req.files
      file2 = file2.product_gallery
      let fileName = `public/uploads/productGallery/${Date.now()}-${file2.name.replace(/ /g, '-').toLowerCase()}`;
      file2.mv(fileName, (error) => {
        if (error) { return res.status(400).json({ result: error.message }) }
      })
      fileName = fileName.replace("public", "");
      gallery.push(fileName)

    }




  }
  //  var gallery = [];
  //  if(file != null && file.product_gallery != undefined && file.product_gallery != null)
  //  {
  //      let fileArr =req.files.product_gallery;

  //      fileArr.forEach(file => {
  //          let fileName = `public/uploads/productGallery/${Date.now()}-${file.name.replace(/ /g, '-').toLowerCase()}`;
  //          file.mv(fileName,(error)=>{
  //              if (error) { return res.status(400).json({status: "400", result: error.message})}
  //          });
  //          fileName = fileName.replace("public", "");
  //          gallery.push(fileName)
  //      });


  //  }


  //  let fileArr =  req.files.product_gallery;
  //  var gallery = [];

  //  fileArr.forEach(file => {
  //      let fileName = `public/uploads/productGallery/${Date.now()}-${file.name.replace(/ /g, '-').toLowerCase()}`;
  //      file.mv(fileName,(error)=>{
  //          if (error) { return res.status(400).json({status: "400", result: error.message})}
  //      });
  //      fileName = fileName.replace("public", "");
  //      gallery.push(fileName)
  //  });



  const newRecord = {

    breed_id: breed_id,
    characteristics_id: char_id,
    pet_category_id: pet_category_id,
    shelter_id: req.body.shelter_id,
    volunteer_id: req.body.volunteer_id,
    name: req.body.name,
    description: req.body.description,
    age: req.body.age,
    color: req.body.color,
    gender: req.body.gender,
    weight: req.body.weight,
    height: req.body.height,

  }



  productModel.updateOne({ _id: req.body.product_id }, { $set: newRecord }, async (error, response) => {

    if (error) { return res.status(400).json({ message: error.message }) }

    if (gallery.length !== 0) {
      console.log(req.body.product_id)

      gallery.forEach(galleryData => {
        const newProductGallery = new productGalleryModel({ path: galleryData, product_id: req.body.product_id });
        newProductGallery.save()
      });


    }

    let products = await productModel.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(req.body.product_id) } },


      {
        $lookup:
        {
          from: "productgalleries",
          localField: "_id",
          foreignField: "product_id",
          as: "productGallery"
        }
      }


    ]);

    res.json({ result: products });


  })


  // const newProduct = new productModel(newRecord);
  // newProduct.save().then((data)=>{
  //     res.json({result: data})


  //   gallery.forEach(galleryData => {
  //         const newProductGallery = new productGalleryModel({path:galleryData,product_id:data.id});
  //         newProductGallery.save()
  //     });

  // }).catch(error=>{
  //     return res.status(400).json({result: error})
  // });


}


const getProducts = async (req, res) => {
  if (req.query.q === "" || req.query.q === undefined) {

    let products = await productModel.aggregate([
      { $match: { name: { $regex: Helper.regexSearch(req.query.q) } } },
      {
        $lookup:
        {
          from: "productgalleries",
          localField: "_id",
          foreignField: "product_id",
          as: "productGallery"
        }
      },
      {
        $lookup:
        {
          from: "characteristics",
          localField: "characteristics_id",
          foreignField: "_id",
          as: "characteristics"
        }
      },
      {
        $lookup:
        {
          from: "shelters",
          localField: "shelter_id",
          foreignField: "_id",
          as: "shelters"
        }
      },
      {
        $lookup:
        {
          from: "petcategories",
          localField: "pet_category_id",
          foreignField: "_id",
          as: "petcategories"
        }
      },
      {
        $lookup:
        {
          from: "breeds",
          localField: "breed_id",
          foreignField: "_id",
          as: "breed"
        }
      },


    ]);

    var data3 = await Promise.all(products.map(async (result3) => {

      result3.favourite = await favourtiesModel.count({ product_id: result3._id, user_id: req.query.user_id }).exec()
      return result3

    }));

    res.json({ result: data3 });


  } else {

    let products = await productModel.aggregate([
      { $match: { name: { $regex: Helper.regexSearch(req.query.q) } } },
      {
        $lookup:
        {
          from: "productgalleries",
          localField: "_id",
          foreignField: "product_id",
          as: "productGallery"
        }
      },
      {
        $lookup:
        {
          from: "characteristics",
          localField: "characteristics_id",
          foreignField: "_id",
          as: "characteristics"
        }
      },
      {
        $lookup:
        {
          from: "shelters",
          localField: "shelter_id",
          foreignField: "_id",
          as: "shelters"
        }
      },
      {
        $lookup:
        {
          from: "petcategories",
          localField: "pet_category_id",
          foreignField: "_id",
          as: "petcategories"
        }
      },
      {
        $lookup:
        {
          from: "breeds",
          localField: "breed_id",
          foreignField: "_id",
          as: "breed"
        }
      },


    ]);

    var data3 = await Promise.all(products.map(async (result3) => {

      result3.favourite = await favourtiesModel.count({ product_id: result3._id, user_id: req.query.user_id }).exec()
      return result3

    }));
    res.json({ result: data3 });

  }
}



const postFavourites = async (req, res) => {
  let checkFav = false
  let txt = '';
  try
  {
    let productInformation  = await productModel.findOne({_id : mongoose.Types.ObjectId(req.body.product_id)}).lean()
    let productGallery  = await productGalleryModel.findOne({product_id : mongoose.Types.ObjectId(productInformation._id)}).lean()

    if(req.body.post_type == "remove")
    {
      let checkFavourite = await favourtiesModel.findOneAndDelete({ product_id: req.body.product_id,user_id:req.body.user_id }).lean()
      if(!checkFavourite) return res.send({message:"Already Removed",result:checkFavourite})
      
        checkFavourite.type = "remove";

        checkFav = false;
  
        return res.send({
          message:"Successfully Removed",
          result:checkFavourite,
        })
      
    }
    else
    {
      let checkFavourite = await favourtiesModel.findOne({ product_id: req.body.product_id,user_id:req.body.user_id }).lean()
      if(!checkFavourite)
        {
          checkFav = true;
          const newRecord = {
            product_id: req.body.product_id,
            user_id: req.body.user_id,
            type: req.body.post_type,
          }
        
          const favt = new favourtiesModel(newRecord);
          favt.save().then((data) => {
            data.type = "add";
            return res.status(200).json({ result: favt })
          }).catch(error => {
            return res.status(400).json({ result: error })
          });

        
        }
        else
        {
          res.send({
            message:"Product already added to Favourates",
            result: checkFavourite
          })
        }

    }

    // FCM Notifications

    if(checkFav)
    {
      let senderName = await UserModel.findOne({_id:  req.body.user_id}).select('name').exec();
      let shelter = await productModel.findOne({_id:  req.body.product_id}).select('volunteer_id').lean();
      
      if(shelter)
      {
        let reciever = await UserModel.findOne({_id:  shelter.volunteer_id}).select('name device_token').lean();
 
        txt += req.body.post_type == 'add'? " Adds in his favourates" : "removes from his favourates";
        
        let res = Helper.sendNotification(reciever.device_token,req.body.user_id,senderName._id,"Pawnder", `${senderName.name} ${txt} `,{ activity:'Notification' , data: productGallery }, "Favourite", req.body.created_at)
      }
      
      
    }

   
  }

  catch(error)
  {
    console.log(error)
  }

  


}
// const postFavourites = async(req,res) => {

//   let favourites = "";
//   if(req.body.post_type === "add"){


//         let favouriteExist = await favourtiesModel.findOne({ product_id: req.body.product_id,user_id:req.body.user_id }).exec();

//         if (favouriteExist === null) {
//             let favtAdd = await favourtiesModel.create({ product_id: req.body.product_id,user_id:req.body.user_id })
//             favourites = favtAdd 
//         }else{
//             favourites = favouriteExist
//         }
//         return res.json({ result:favourites });    

//     }
//     else{

//         let favourites = await favourtiesModel.deleteOne({ product_id: req.body.product_id,user_id:req.body.user_id })
//         return res.json({  result:favourites  });    
//     }
// }

const getFavouriteProducts = async (req, res) => {

  try {


    let product_query = await favourtiesModel.find({ user_id: req.body.user_id })
    let productArr = [];
    product_query.forEach((value, key) => {
      productArr.push(value.product_id)
    });




    let products = await productModel.aggregate([
      {
        "$match": {
          "_id": { "$in": productArr },

        }
      },
      {
        $lookup:
        {
          from: "productgalleries",
          localField: "_id",
          foreignField: "product_id",
          as: "productGallery"
        }
      },
      {
        $lookup:
        {
          from: "characteristics",
          localField: "characteristics_id",
          foreignField: "_id",
          as: "characteristics"
        }
      },
      {
        $lookup:
        {
          from: "shelters",
          localField: "shelter_id",
          foreignField: "_id",
          as: "shelters"
        }
      },
      {
        $lookup:
        {
          from: "petcategories",
          localField: "pet_category_id",
          foreignField: "_id",
          as: "petcategories"
        }
      },
      {
        $lookup:
        {
          from: "breeds",
          localField: "breed_id",
          foreignField: "_id",
          as: "breed"
        }
      },


    ]);


    return res.json({ result: products })

  } catch (error) {
    return res.json({ result: "Favt not found" })
  }
}



const addRecentProductView = async (req, res) => {


  await recentView.deleteOne({ product_id: req.body.product_id, user_id: req.body.user_id })

  const newRecord = new recentView({ product_id: req.body.product_id, user_id: req.body.user_id });
  newRecord.save().then((data) => {
    res.json({ result: data })

  }).catch(error => {
    return res.status(400).json({ result: error })
  });

}
const recentProductView = async (req, res) => {



  try {



    let product_query = await recentView.find({ user_id: req.body.user_id }, { product_id: 1 })
    let productArr = [];
    product_query.forEach((value, key) => {
      productArr.push(value.product_id)
    });



    let products = await productModel.aggregate([
      {
        "$match": {
          "_id": { "$in": productArr },

        }
      },
      {
        $lookup:
        {
          from: "productgalleries",
          localField: "_id",
          foreignField: "product_id",
          as: "productGallery"
        }
      },
      {
        $lookup:
        {
          from: "characteristics",
          localField: "characteristics_id",
          foreignField: "_id",
          as: "characteristics"
        }
      },
      {
        $lookup:
        {
          from: "shelters",
          localField: "shelter_id",
          foreignField: "_id",
          as: "shelters"
        }
      },
      {
        $lookup:
        {
          from: "petcategories",
          localField: "pet_category_id",
          foreignField: "_id",
          as: "petcategories"
        }
      },
      {
        $lookup:
        {
          from: "breeds",
          localField: "breed_id",
          foreignField: "_id",
          as: "breed"
        }
      },


    ]);




    return res.json({ result: products })
  } catch (error) {
    return res.json({ result: "Product not found" })
  }

}


const nearByPets = async (req, res) => {


  try {
    let shelter = await shelterModel.find({}, { _id: 1, latitude: 1, longitude: 1 });
    let nearByShelters = Helper.nearByCordinates(req.body.latitude, req.body.longitude, req.body.range_in_meter, shelter);


    let nearByPet = await productModel.aggregate([
      {
        "$match": {
          "shelter_id": { "$in": nearByShelters },

        }
      },
      {
        $lookup:
        {
          from: "productgalleries",
          localField: "_id",
          foreignField: "product_id",
          as: "productGallery"
        }
      },



    ]);


    var data = await Promise.all(nearByPet.map(async (result1) => {

      result1.favourite = await favourtiesModel.count({ product_id: result1._id, user_id: req.body.user_id }).exec()
      return result1

    }));
    return res.json({ result: data })

  } catch (error) {
    return res.json({ result: "Product not found" })
  }



}


const getVolunteerList = async (req, res) => {
  try {
    let products = await productModel.aggregate([
      { $match: { volunteer_id: mongoose.Types.ObjectId(req.params.id) } },
      {
        $lookup:
        {
          from: "users",
          localField: "volunteer_id",
          foreignField: "_id",
          as: "volunteer"
        }
      },
      { $unwind: "$volunteer" },
      // {$project:{"volunteer.name":1,"volunteer._id":1,"_id":0}}
    ]);
    delete products.password
    delete products.token
    return res.json({ result: products })
  } catch (error) {
    return res.json({ result: "Product not found" })
  }

}


const deleteProduct = async (req, res) => {

  try {


    let product = await productModel.updateOne({ _id: req.body.product_id }, { $set: { status: 2 } })

    return res.json({ result: product.matchedCount })

  } catch (error) {
    return res.json({ result: "false" })
  }



}



const getProductsByVolunteer = async (req, res) => {


  try {
    let products = await productModel.aggregate([
      { $match: { volunteer_id: mongoose.Types.ObjectId(req.body.volunteer_id) } },
      {
        $lookup:
        {
          from: "productgalleries",
          localField: "_id",
          foreignField: "product_id",
          as: "productGallery"
        }
      },
      { $sort: { created_at: -1 } }



    ]);

    var data = await Promise.all(products.map(async (result1) => {

      result1.favourite = await favourtiesModel.count({ product_id: result1._id, user_id: req.body.user_id }).exec()
      return result1

    }));



    return res.json({ result: data })
  } catch (error) {
    return res.json({ result: "Product not found" })
  }

}

export default {
  getProfile,
  postProfile,
  getProducts,
  getAllProfile,
  postFavourites,
  recentProductView,
  addRecentProductView,
  getShelterWiseProfile,
  nearByPets,
  getFavouriteProducts,
  updateProfile,
  deleteProduct,
  searchProfile,
  getVolunteerList,
  getProductsByVolunteer,
  getFavtPetsForCards,







}