'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const multer_1 = __importDefault(require('multer'));
const referral_controller_1 = require('../controllers/referral.controller');
// const createFollowUpPDF = () => {};
// const getFollowUpFile = () => {};
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
const csvUpload = (0, multer_1.default)({ dest: 'uploads/' });
const router = express_1.default.Router();
router.post('/create', referral_controller_1.createReferral);
router.get('/all', referral_controller_1.getReferrals);
router.get('/duplicates', referral_controller_1.getDuplicates);
router.get('/:department/all', referral_controller_1.getDepartmentReferrals);
router.get('/:id', referral_controller_1.getReferral);
router.put('/:id', referral_controller_1.updateReferral);
router.get(
  '/:id/communication/all',
  referral_controller_1.getCommunicationHistory,
);
router.post('/:id/communication', referral_controller_1.addToHistory);
router.put('/:id/communication/:index', referral_controller_1.updateHistory);
router.delete('/:id/communication/:index', referral_controller_1.deleteHistory);
router.get(
  '/:referral_id/victimServicesOutcome',
  referral_controller_1.getVictimServicesOutcome,
);
router.post(
  '/:referral_id/victimServicesOutcome',
  referral_controller_1.createVictimServicesOutcome,
);
router.put(
  '/:referral_id/victimServicesOutcome',
  referral_controller_1.updateVictimServicesOutcome,
);
router.get(
  '/:referral_id/counsellingServicesOutcome',
  referral_controller_1.getCounsellingServicesOutcome,
);
router.post(
  '/:referral_id/counsellingServicesOutcome',
  referral_controller_1.createCounsellingServicesOutcome,
);
router.put(
  '/:referral_id/counsellingServicesOutcome',
  referral_controller_1.updateCounsellingServicesOutcome,
);
router.get(
  '/:referral_id/youthServicesOutcome',
  referral_controller_1.getYouthServicesOutcome,
);
router.post(
  '/:referral_id/youthServicesOutcome',
  referral_controller_1.createYouthServicesOutcome,
);
router.put(
  '/:referral_id/youthServicesOutcome',
  referral_controller_1.updateYouthServicesOutcome,
);
router.post(
  '/:referral_id/referralPDF',
  upload.single('file'),
  referral_controller_1.createRefferalPDF,
);
router.get('/referralPDF/:file_key', referral_controller_1.getReferralFile);
router.delete('/:id/referralPDF', referral_controller_1.deleteReferralFile);
router.post(
  '/:referral_id/followUpPDF',
  upload.single('file'),
  referral_controller_1.createFollowUpPDF,
);
router.get('/followUpPDF/:file_key', referral_controller_1.getFollowUpFile);
router.delete('/:id/followUpPDF', referral_controller_1.deleteFollowUpFile);
router.post(
  '/:referral_id/outreachPDF',
  upload.single('file'),
  referral_controller_1.createOutreachPDF,
);
router.post(
  '/upload',
  csvUpload.single('file'),
  referral_controller_1.uploadReferral,
);
router.get('/outreachPDF/:file_key', referral_controller_1.getOutreachFile);
router.delete('/:id/outreachPDF', referral_controller_1.deleteOutreachFile);
exports.default = router;
//# sourceMappingURL=referral.route.js.map
