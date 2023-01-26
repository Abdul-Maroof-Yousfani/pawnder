import express from "express"
import productBController from "../../controllers/backend/productBController.js";

const router = express.Router()



 router.get('/getAllProfiles',productBController.getAllProfiles)
 router.get('/getProfile',productBController.getProfile)
 router.post("/deletePet",productBController.deletePet);


export default router