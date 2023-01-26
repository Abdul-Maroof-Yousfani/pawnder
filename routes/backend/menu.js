import express from "express"
import MainMenuController from "../../controllers/backend/menuController.js";

const router = express.Router()

router.post('/postProfile',MainMenuController.postProfile)
router.get('/getProfile',MainMenuController.getProfile)
router.post('/postSubMenuProfile',MainMenuController.postSubMenuProfile)
router.get('/getSubMenuProfile',MainMenuController.getSubMenuProfile)
router.get('/getMenuData',MainMenuController.getMenuData)
router.post('/deleteMenu',MainMenuController.deleteMenu)
router.post('/deleteSubMenu',MainMenuController.deleteSubMenu)





export default router