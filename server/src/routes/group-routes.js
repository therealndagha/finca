

import express from 'express';
import { getAllGroups } from '../controllers/group-controllers.js';

const router = express.Router();

router.get('/', getAllGroups)

export default router;
