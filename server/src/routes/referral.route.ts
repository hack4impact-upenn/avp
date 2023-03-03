import express from 'express';
import {
  createReferral,
  getDepartmentReferrals,
  getReferral,
  getReferrals,
  updateReferral,
  getCommunicationHistory,
  addToHistory,
  updateHistory,
  deleteHistory,
} from '../controllers/referral.controller';

const router = express.Router();

router.post('/create', createReferral);

router.get('/all', getReferrals);

router.get('/:department/all', getDepartmentReferrals);

router.get('/:id', getReferral);

router.put('/:id', updateReferral);

router.get('/:id/communication/all', getCommunicationHistory);

router.post('/:id/communication', addToHistory);

router.put('/:id/communication/:index', updateHistory);

router.delete('/:id/communication/:index', deleteHistory);

// router.get('/duplicates', getDuplicates);

export default router;
