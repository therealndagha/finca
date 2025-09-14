

import express from 'express';
import { getAllLoanProducts } from '../controllers/loan-products-controllers.js';

const router = express.Router();

router.get('/', getAllLoanProducts);

export default router;