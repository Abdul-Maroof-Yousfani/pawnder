import express from 'express';
import AppContentController from '../../controllers/AppContent.js';

const router = express.Router();

router.post('/postFaqs', AppContentController.postFaqs);
router.get('/getFaqList', AppContentController.getFaqList);
router.post('/deleteFaq', AppContentController.deleteFaq);
router.post('/postTermsCondition', AppContentController.postTermsCondition);
router.get('/getTermsCondition', AppContentController.getTermsCondition);


export default router;