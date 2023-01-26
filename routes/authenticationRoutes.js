import express from "express"
import AuthenticationController from "../controllers/AuthenticationController.js";

const router = express.Router()

router.post('/register',AuthenticationController.register)
router.post('/login',AuthenticationController.login)
router.post('/resetpassword',AuthenticationController.resetpassword)
router.post('/resendCode',AuthenticationController.resendCode)
router.post('/verifyCode',AuthenticationController.verifyCode)

export default router