import express from "express"
import productController from "../controllers/productController.js"

import Helper from "../helpers/Helper.js";
const router = express.Router()

router.post("/postProfile",productController.postProfile);
router.post("/updateProfile",productController.updateProfile);
router.post("/getProfile",productController.getProfile);
router.post("/getAllProfile",productController.getAllProfile);
router.post("/getFavtPetsForCards",productController.getFavtPetsForCards);

router.post("/getFavtPetsForCards",productController.getFavtPetsForCards);
router.post("/postFavourites",productController.postFavourites);
router.post("/getFavouriteProducts",productController.getFavouriteProducts);
router.post("/addRecentProductView",productController.addRecentProductView);
router.post("/recentProductView",productController.recentProductView);
router.post("/getShelterWiseProfile",productController.getShelterWiseProfile);
router.post("/nearByPets",productController.nearByPets);
router.post("/deleteProduct",productController.deleteProduct);
router.post("/searchProfile",productController.searchProfile);
router.get("/getVolunteerList/:id",productController.getVolunteerList);
router.post("/getProductsByVolunteer",productController.getProductsByVolunteer);
router.get("/getProducts",productController.getProducts);

export default router