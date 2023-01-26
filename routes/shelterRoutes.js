import express from "express"
import shelterController from "../controllers/shelterController.js"


const router = express.Router()

router.post("/getAllProfile",shelterController.getAllProfile);
router.post("/postProfile",shelterController.postProfile);
router.post("/getProfile",shelterController.getProfile);
router.post("/updateProfile",shelterController.updateProfile);
router.post("/nearByShelters",shelterController.nearByShelters);

router.post("/addShelterRating",shelterController.addShelterRating);
router.post("/postFavourites",shelterController.postFavourites);
router.post("/getFavouriteShelters",shelterController.getFavouriteShelters);
router.get("/getMassiveShelters",shelterController.getAllProfile);
router.get("/getShelter",shelterController.getShelter);
router.post("/getShelterByVolunteer",shelterController.getShelterByVolunteer);


export default router