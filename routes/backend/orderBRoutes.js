import express from "express"
import orderController from "../../controllers/backend/orderBController.js"

const router = express.Router()

router.post("/postProfile",orderController.postProfile);
router.post("/getProfile",orderController.getProfile);
router.post("/updateStatus",orderController.updateStatus);
router.post("/getUserOrder",orderController.getUserOrder);
router.get("/getAllProfiles",orderController.getAllProfiles);
router.post("/changeStatus",orderController.changeStatus);

export default router

