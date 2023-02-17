import express from 'express';
import { isAuthenticated } from '../controllers/auth.middleware';
import { createReferral, getDepartmentReferrals, getReferral, getReferrals, updateReferral } from '../controllers/referral.controller';

const router = express.Router();

router.post('/create', createReferral);

router.get('/all', getReferrals);

router.get('/:department/all', getDepartmentReferrals);

router.get('/:id', getReferral);

router.put('/:id', updateReferral);

export default router;
