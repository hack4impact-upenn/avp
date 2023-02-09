import express from 'express';
import { createReferral } from '../controllers/referral.controller';

const router = express.Router();

router.post('/create', createReferral);

export default router;
