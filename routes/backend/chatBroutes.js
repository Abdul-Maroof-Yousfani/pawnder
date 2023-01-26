import express from "express"
import ChatController from "../../controllers/backend/chatBController.js";

const router = express.Router()

router.get('/getAllChatUsers',ChatController.getAllChatUsers)
router.get('/getUserChat',ChatController.getUserChat)
router.get('/getSingleUserChat',ChatController.getSingleUserChat)



export default router