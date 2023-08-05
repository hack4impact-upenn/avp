import express from 'express';
import multer from 'multer';
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
  getDuplicates,
  getVictimServicesOutcome,
  getCounsellingServicesOutcome,
  getYouthServicesOutcome,
  createVictimServicesOutcome,
  createCounsellingServicesOutcome,
  createYouthServicesOutcome,
  updateVictimServicesOutcome,
  updateCounsellingServicesOutcome,
  updateYouthServicesOutcome,
  createRefferalPDF,
  getReferralFile,
  createFollowUpPDF,
  getFollowUpFile,
  createOutreachPDF,
  getOutreachFile,
  deleteFollowUpFile,
  deleteReferralFile,
  deleteOutreachFile,
  uploadReferral,
} from '../controllers/referral.controller';

// const createFollowUpPDF = () => {};
// const getFollowUpFile = () => {};

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.post('/create', createReferral);

router.get('/all', getReferrals);

router.get('/duplicates', getDuplicates);

router.get('/:department/all', getDepartmentReferrals);

router.get('/:id', getReferral);

router.put('/:id', updateReferral);

router.get('/:id/communication/all', getCommunicationHistory);

router.post('/:id/communication', addToHistory);

router.put('/:id/communication/:index', updateHistory);

router.delete('/:id/communication/:index', deleteHistory);

router.get('/:referral_id/victimServicesOutcome', getVictimServicesOutcome);

router.post('/:referral_id/victimServicesOutcome', createVictimServicesOutcome);

router.put('/:referral_id/victimServicesOutcome', updateVictimServicesOutcome);

router.get(
  '/:referral_id/counsellingServicesOutcome',
  getCounsellingServicesOutcome,
);

router.post(
  '/:referral_id/counsellingServicesOutcome',
  createCounsellingServicesOutcome,
);

router.put(
  '/:referral_id/counsellingServicesOutcome',
  updateCounsellingServicesOutcome,
);

router.get('/:referral_id/youthServicesOutcome', getYouthServicesOutcome);

router.post('/:referral_id/youthServicesOutcome', createYouthServicesOutcome);

router.put('/:referral_id/youthServicesOutcome', updateYouthServicesOutcome);

router.post(
  '/:referral_id/referralPDF',
  upload.single('file'),
  createRefferalPDF,
);

router.get('/referralPDF/:file_key', getReferralFile);

router.delete('/:id/referralPDF', deleteReferralFile);

router.post(
  '/:referral_id/followUpPDF',
  upload.single('file'),
  createFollowUpPDF,
);

router.get('/followUpPDF/:file_key', getFollowUpFile);

router.delete('/:id/followUpPDF', deleteFollowUpFile);

router.post(
  '/:referral_id/outreachPDF',
  upload.single('file'),
  createOutreachPDF,
);

router.post('/upload', upload.single('file'), uploadReferral);

router.get('/outreachPDF/:file_key', getOutreachFile);

router.delete('/:id/outreachPDF', deleteOutreachFile);

export default router;
