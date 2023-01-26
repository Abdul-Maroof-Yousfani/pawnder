import express from "express"
import orderController from "../controllers/OrderController.js"

import Helper from "../helpers/Helper.js";
const router = express.Router()

router.post("/postProfile",orderController.postProfile);
router.post("/getProfile",orderController.getProfile);
router.post("/updateStatus",orderController.updateStatus);
router.post("/getUserOrder",orderController.getUserOrder);
router.get("/getMeetingNotifications/:user_id",orderController.getMeetingNotification);

router.post("/getVolunteerOrder",orderController.getVolunteerOrder);
router.post("/updatePayment",orderController.updatePayment);
router.get("/DeleteOrder",orderController.DeleteOrder);


export default router

