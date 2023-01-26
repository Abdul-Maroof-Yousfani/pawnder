import express from "express"
import shelterBController from "../../controllers/backend/shelterBController.js";

const router = express.Router()


// router.post('/postProfile',shelterBController.postProfile)
 router.get('/getAllProfiles',shelterBController.getAllProfiles)
// //router.post('/deleteBreed',shelterBController.deleteBreed)
 router.get('/getProfile',shelterBController.getProfile)
 router.get('/getAllShelterProduct',shelterBController.getAllShelterProduct)

 router.post("/deleteShelter",shelterBController.deleteShelter);


export default router