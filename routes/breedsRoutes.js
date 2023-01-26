import express from "express"
import breedsController from "../controllers/breedsController.js"

import Helper from "../helpers/Helper.js";
const router = express.Router()


router.get("/",breedsController.breeds);
router.post("/postProfile",breedsController.postProfile);
router.get("/getProfile",breedsController.getProfile);

router.get("/getRegisteredBreeds",breedsController.getRegisteredBreeds);
router.get("/getBreedColors",breedsController.getBreedColors);
router.get("/getBreeds",breedsController.getBreeds);
router.get("/getCharacteristics",breedsController.getCharacteristics);
router.get("/getColors",breedsController.getColors);

export default router