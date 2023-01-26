import express from "express"
import UsersBController from "./../../controllers/backend/usersBController.js";

const router = express.Router()

router.get('/getAllUsers',UsersBController.getAllUsers)
router.get('/getAllAdmins',UsersBController.getAllAdmins)
router.post('/deleteUser',UsersBController.deleteUser)
router.post('/deleteAdmin',UsersBController.deleteAdmin)

router.post('/register',UsersBController.register)
router.post('/login',UsersBController.login)

export default router