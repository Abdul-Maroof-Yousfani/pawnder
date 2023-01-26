import express from "express"
import PetCatBController from "../../controllers/backend/petCatBController.js";

const router = express.Router()


router.post('/postProfile',PetCatBController.postProfile)
router.get('/getAllProfiles',PetCatBController.getAllProfiles)
router.post('/deletepetCat',PetCatBController.deletepetCat)
router.get('/getProfile',PetCatBController.getProfile)
router.post('/updateProfile',PetCatBController.updateProfile)




export default router