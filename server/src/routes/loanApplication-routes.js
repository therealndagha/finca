
import express from 'express';
import { addLoanApplication, getAllLoanApplications } from '../controllers/loan-application-controllers';

const router = express.Router();

router.get('/', getAllLoanApplications);
router.post('/', addLoanApplication);
router.put('/:id', );
router.delete('/:id');



export default router;
