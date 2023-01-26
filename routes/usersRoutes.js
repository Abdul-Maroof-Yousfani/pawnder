import express from 'express';
import UserController from '../controllers/UserController.js';

const router = express.Router();

router.post('/getProfile', UserController.getProfile);
router.post('/updateProfile', UserController.updateProfile);
router.post('/updatePetPreferences', UserController.updatePetPreferences);
router.post('/updateTermsConditions', UserController.updateTermsConditions);

router.post('/updateUserPassword', UserController.updateUserPassword);
router.post('/logOutUser', UserController.logOutUser);
router.post('/getUserNotifications', UserController.getUserNotifications);
router.post('/UpdateNotificationView', UserController.UpdateNotificationView);
router.post('/updateDeviceToken', UserController.updateDeviceToken);
router.post('/verifyShelter', UserController.verifyShelter);
export default router;