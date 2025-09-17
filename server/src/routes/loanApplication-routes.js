
import express from 'express';
import { addLoanApplication, getAllLoanApplications } from '../controllers/loan-application-controllers.js';

const router = express.Router();

router.get('/', getAllLoanApplications);
router.post('/', addLoanApplication);




export default router;
