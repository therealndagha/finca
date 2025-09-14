

import express from 'express';
import { addBranch, deleteBranch, getAllBranches, updateBranch } from '../controllers/branch-controllers.js';

const router = express.Router();

router.get('/', getAllBranches);
router.post('/', addBranch);
router.put('/:id', updateBranch);
router.delete('/:id', deleteBranch);


export default router;