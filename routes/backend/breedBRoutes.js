import express from "express"
import BreedsBController from "../../controllers/backend/breedBController.js";

const router = express.Router()


router.post('/postProfile',BreedsBController.postProfile)
router.get('/getAllProfiles',BreedsBController.getAllProfiles)
router.post('/deleteBreed',BreedsBController.deleteBreed)
router.get('/getProfile',BreedsBController.getProfile)
router.post('/updateProfile',BreedsBController.updateProfile)




export default router