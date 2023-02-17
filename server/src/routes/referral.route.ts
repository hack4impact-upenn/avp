import express from 'express';
import { isAuthenticated } from '../controllers/auth.middleware';
import { createReferral, getDepartmentReferrals, getReferral, getReferrals } from '../controllers/referral.controller';

const router = express.Router();

router.post('/create', createReferral);

router.get('/all', getReferrals);

router.get('/order/:department/all', getDepartmentReferrals);

router.get('/order/:id', getReferral);

export default router;
