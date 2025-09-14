import express from 'express';
import { getAllStaffMembers } from '../controllers/staff-controllers.js';


const router = express.Router();

router.get('/', getAllStaffMembers)

export default router;