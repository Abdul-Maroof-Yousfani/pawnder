import express from 'express';
import homeController from '../controllers/homeController.js';

const router = express.Router();

router.post('/getProfile', homeController.getTopBreeds);
router.get('/getPetColors', homeController.getPetColors);

router.get('/getCharacteristicsList', homeController.getCharacteristicsList);
router.get('/getBreedList', homeController.getBreedList);
router.get('/getPetCategoryList', homeController.getPetCategoryList);



export default router;