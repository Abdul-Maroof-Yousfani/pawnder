import express from "express"
import VolunteerController from "../controllers/VolunteerController.js"
import Helper from "../helpers/Helper.js";
const router = express.Router()

router.get("/getProfile/:volunteer_id",Helper.verifyToken,VolunteerController.getProfile);
router.put("/postProfile/:user",Helper.verifyToken,VolunteerController.postProfile);
router.get("/getOccupation",Helper.verifyToken,VolunteerController.getOccupation);
router.get("/getState",Helper.verifyToken,VolunteerController.getState);



export default router